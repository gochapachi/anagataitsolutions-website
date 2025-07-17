import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ResourceData {
  title: string
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

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    const url = new URL(req.url)
    const method = req.method
    const resourceId = url.searchParams.get('id')

    console.log(`${method} request to resources-api`, { resourceId, url: url.pathname })

    switch (method) {
      case 'GET':
        if (resourceId) {
          // Get single resource
          const { data, error } = await supabase
            .from('resources')
            .select('*')
            .eq('id', resourceId)
            .single()

          if (error) {
            console.error('Error fetching resource:', error)
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          return new Response(
            JSON.stringify({ success: true, data }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } else {
          // Get all resources
          const { data, error } = await supabase
            .from('resources')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) {
            console.error('Error fetching resources:', error)
            return new Response(
              JSON.stringify({ error: error.message }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          return new Response(
            JSON.stringify({ success: true, data, count: data.length }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'POST':
        // Create new resource
        const createData: ResourceData = await req.json()
        
        if (!createData.title) {
          return new Response(
            JSON.stringify({ error: 'Title is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        // Auto-generate slug if not provided
        if (!createData.slug && createData.title) {
          createData.slug = createData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }

        // Set default values
        const resourceToCreate = {
          title: createData.title,
          content: createData.content || '',
          category: createData.category || '',
          author: createData.author || '',
          published_date: createData.published_date || new Date().toISOString().split('T')[0],
          is_published: createData.is_published ?? true,
          meta_description: createData.meta_description || '',
          slug: createData.slug,
          image_url: createData.image_url || '',
          file_url: createData.file_url || ''
        }

        const { data: newResource, error: createError } = await supabase
          .from('resources')
          .insert(resourceToCreate)
          .select()
          .single()

        if (createError) {
          console.error('Error creating resource:', createError)
          return new Response(
            JSON.stringify({ error: createError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        console.log('Resource created successfully:', newResource.id)
        return new Response(
          JSON.stringify({ success: true, data: newResource, message: 'Resource created successfully' }),
          { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'PUT':
        // Update resource
        if (!resourceId) {
          return new Response(
            JSON.stringify({ error: 'Resource ID is required for updates' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const updateData: Partial<ResourceData> = await req.json()
        
        // Auto-generate slug if title is being updated but slug is not provided
        if (updateData.title && !updateData.slug) {
          updateData.slug = updateData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        }

        const { data: updatedResource, error: updateError } = await supabase
          .from('resources')
          .update(updateData)
          .eq('id', resourceId)
          .select()
          .single()

        if (updateError) {
          console.error('Error updating resource:', updateError)
          return new Response(
            JSON.stringify({ error: updateError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        console.log('Resource updated successfully:', resourceId)
        return new Response(
          JSON.stringify({ success: true, data: updatedResource, message: 'Resource updated successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      case 'DELETE':
        // Delete resource
        if (!resourceId) {
          return new Response(
            JSON.stringify({ error: 'Resource ID is required for deletion' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        const { error: deleteError } = await supabase
          .from('resources')
          .delete()
          .eq('id', resourceId)

        if (deleteError) {
          console.error('Error deleting resource:', deleteError)
          return new Response(
            JSON.stringify({ error: deleteError.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        console.log('Resource deleted successfully:', resourceId)
        return new Response(
          JSON.stringify({ success: true, message: 'Resource deleted successfully' }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

      default:
        return new Response(
          JSON.stringify({ error: 'Method not allowed' }),
          { status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Unexpected error in resources-api:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})