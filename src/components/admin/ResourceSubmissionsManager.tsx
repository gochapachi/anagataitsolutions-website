import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Download, Mail, Phone, Building, User, Calendar, CheckCircle2, Clock } from "lucide-react";

interface ResourceSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  resource_title: string;
  source: string;
  created_at: string;
  processed: boolean;
  processed_at: string | null;
  processed_by: string | null;
}

export const ResourceSubmissionsManager = () => {
  const [submissions, setSubmissions] = useState<ResourceSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('resource_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching resource submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch resource submissions",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsProcessed = async (id: string) => {
    try {
      const { error } = await supabase
        .from('resource_submissions')
        .update({
          processed: true,
          processed_at: new Date().toISOString(),
          processed_by: 'admin' // In a real app, this would be the current user
        })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Submission marked as processed",
      });

      fetchSubmissions();
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Resource Download Submissions
          </CardTitle>
          <CardDescription>
            Manage and track resource download requests from potential leads
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Resource Requested</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{submission.name}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          <span>{submission.email}</span>
                        </div>
                        {submission.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{submission.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {submission.company && (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{submission.company}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-primary">
                        {submission.resource_title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {format(new Date(submission.created_at), 'MMM dd, yyyy HH:mm')}
                      </div>
                      <Badge variant="secondary" className="mt-1">
                        {submission.source}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {submission.processed ? (
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-700">Processed</span>
                          {submission.processed_at && (
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(submission.processed_at), 'MMM dd')}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="text-sm text-orange-700">Pending</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {!submission.processed && (
                        <Button
                          size="sm"
                          onClick={() => markAsProcessed(submission.id)}
                        >
                          Mark Processed
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {submissions.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No resource submissions found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};