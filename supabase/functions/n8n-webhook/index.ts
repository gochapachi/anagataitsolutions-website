import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface N8nResourcePayload {
  action: 'create' | 'update' | 'delete' | 'list'
  resource_id?: string
  data?: {
    title?: string
    content?: string
    category?: string
    author?: string
    published_date?: string
    is_published?: boolean
    meta_description?: string
    slug?: string
    image_url?: string
    file_url?: string
  }
  filters?: {
    category?: string
    is_published?: boolean
    limit?: number
  }
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Only POST method is allowed' }),
      { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const payload: N8nResourcePayload = await req.json()
    
    console.log('N8N webhook received:', payload.action, payload.resource_id || 'no-id')

    switch (payload.action) {
      case 'create':
        if (!payload.data?.title) {
          return new Response(
            JSON.stringify({ error: 'Title is required for resource creation' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Auto-generate slug if not provided
        const slug = payload.data.slug || payload.data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

        const resourceToCreate = {
          title: payload.data.title,
          content: payload.data.content || '',
          category: payload.data.category || '',
          author: payload.data.author || 'N8N Automation',
          published_date: payload.data.published_date || new Date().toISOString().split('T')[0],
          is_published: payload.data.is_published ?? true,
          meta_description: payload.data.meta_description || '',
          slug,
          image_url: payload.data.image_url || '',
          file_url: payload.data.file_url || ''
        }

        const { data: newResource, error: createError } = await supabase
          .from('resources')
          .insert(resourceToCreate)
          .select()
          .single()

        if (createError) {
          console.error('Error creating resource via N8N:', createError)
          return new Response(
            JSON.stringify({ error: createError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            action: 'create',
            data: newResource,
            message: 'Resource created successfully via N8N' 
          }),
          { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'update':
        if (!payload.resource_id) {
          return new Response(
            JSON.stringify({ error: 'Resource ID is required for updates' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (!payload.data) {
          return new Response(
            JSON.stringify({ error: 'Data is required for updates' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Auto-generate slug if title is being updated
        if (payload.data.title && !payload.data.slug) {
          payload.data.slug = payload.data.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }

        const { data: updatedResource, error: updateError } = await supabase
          .from('resources')
          .update(payload.data)
          .eq('id', payload.resource_id)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating resource via N8N:', updateError)
          return new Response(
            JSON.stringify({ error: updateError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            action: 'update',
            data: updatedResource,
            message: 'Resource updated successfully via N8N' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'delete':
        if (!payload.resource_id) {
          return new Response(
            JSON.stringify({ error: 'Resource ID is required for deletion' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const { error: deleteError } = await supabase
          .from('resources')
          .delete()
          .eq('id', payload.resource_id)

        if (deleteError) {
          console.error('Error deleting resource via N8N:', deleteError)
          return new Response(
            JSON.stringify({ error: deleteError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            action: 'delete',
            message: 'Resource deleted successfully via N8N' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'list':
        let query = supabase.from('resources').select('*')

        // Apply filters if provided
        if (payload.filters) {
          if (payload.filters.category) {
            query = query.eq('category', payload.filters.category)
          }
          if (payload.filters.is_published !== undefined) {
            query = query.eq('is_published', payload.filters.is_published)
          }
        }

        // Apply limit
        const limit = payload.filters?.limit || 50
        query = query.order('created_at', { ascending: false }).limit(limit)

        const { data: resources, error: listError } = await query

        if (listError) {
          console.error('Error listing resources via N8N:', listError)
          return new Response(
            JSON.stringify({ error: listError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        return new Response(
          JSON.stringify({ 
            success: true, 
            action: 'list',
            data: resources,
            count: resources.length,
            message: 'Resources retrieved successfully via N8N' 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action. Supported actions: create, update, delete, list' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('Unexpected error in N8N webhook:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})