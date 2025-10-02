import { AlertTriangle } from "lucide-react";
import { useFeedback } from "@/contexts/FeedbackContext";
import { FeedbackCard } from "@/components/FeedbackCard";
import { Badge } from "@/components/ui/badge";

const UrgentIssues = () => {
  const { feedbackData } = useFeedback();
  
  const urgentFeedback = feedbackData.filter(
    item => item.URGENCY.toLowerCase() === "high"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-accent" />
            Urgent Issues
          </h1>
          <p className="text-muted-foreground mt-1">
            High priority items requiring immediate attention
          </p>
        </div>
        <Badge variant="destructive" className="text-lg px-4 py-2">
          {urgentFeedback.length} Urgent
        </Badge>
      </div>

      {urgentFeedback.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-success" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No urgent issues</h2>
          <p className="text-muted-foreground">
            All high-priority items have been addressed
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {urgentFeedback.map((feedback) => (
            <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UrgentIssues;
