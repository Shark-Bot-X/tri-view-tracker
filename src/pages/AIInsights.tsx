import { useState } from "react";
import { Sparkles, Brain, StickyNote } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useToast } from "@/hooks/use-toast";

const AIInsights = () => {
  const [globalNotes, setGlobalNotes] = useState("");
  const { feedbackData } = useFeedback();
  const { toast } = useToast();

  const handleSaveNotes = () => {
    toast({
      title: "Notes saved",
      description: "Your notes have been saved successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Insights</h1>
        <p className="text-muted-foreground mt-1">
          Get intelligent recommendations and assistance
        </p>
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">
            <Brain className="h-4 w-4 mr-2" />
            Summary
          </TabsTrigger>
          <TabsTrigger value="help">
            <Sparkles className="h-4 w-4 mr-2" />
            AI Help
          </TabsTrigger>
          <TabsTrigger value="notes">
            <StickyNote className="h-4 w-4 mr-2" />
            Notes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Overall Progress</h3>
                <p className="text-sm text-muted-foreground">
                  {feedbackData.length} total feedback items • {" "}
                  {feedbackData.filter(f => f.task === "completed").length} completed • {" "}
                  {feedbackData.filter(f => f.task === "ongoing").length} ongoing
                </p>
              </div>

              <div className="p-4 bg-accent/10 border border-accent rounded-lg">
                <h3 className="font-semibold mb-2 text-accent">Top Priority Areas</h3>
                <ul className="text-sm space-y-1">
                  <li>• High urgency items requiring immediate attention</li>
                  <li>• Performance issues affecting user experience</li>
                  <li>• Critical bugs impacting core functionality</li>
                </ul>
              </div>

              <div className="p-4 bg-success/10 border border-success rounded-lg">
                <h3 className="font-semibold mb-2 text-success">Recommendations</h3>
                <ul className="text-sm space-y-1">
                  <li>• Focus on completing high-impact urgent issues first</li>
                  <li>• Consider dedicating resources to performance optimization</li>
                  <li>• Schedule regular reviews of positive feedback for insights</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="justify-start">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Weekly Summary
                </Button>
                <Button variant="outline" className="justify-start">
                  <Brain className="h-4 w-4 mr-2" />
                  Suggest Priority Order
                </Button>
                <Button variant="outline" className="justify-start">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Draft Response Templates
                </Button>
              </div>

              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  AI assistance features coming soon.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Notes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Add notes, observations, or action items..."
                value={globalNotes}
                onChange={(e) => setGlobalNotes(e.target.value)}
                rows={10}
              />
              <Button onClick={handleSaveNotes}>Save Notes</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIInsights;
