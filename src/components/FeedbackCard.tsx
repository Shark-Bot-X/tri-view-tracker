import { FeedbackItem } from "@/types/feedback";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TaskStatusSelect } from "./TaskStatusSelect";
import { cn } from "@/lib/utils";

interface FeedbackCardProps {
  feedback: FeedbackItem;
  compact?: boolean;
}

export const FeedbackCard = ({ feedback, compact = false }: FeedbackCardProps) => {
  const isUrgent = feedback.URGENCY.toLowerCase() === "high";
  
  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      isUrgent && "border-urgent-border bg-urgent-bg"
    )}>
      <CardHeader className={compact ? "pb-3" : ""}>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-base font-semibold">
              {feedback.feedback_id}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {feedback.FEEDBACK_SUMMARY}
            </p>
          </div>
          <Badge variant="outline">{feedback.CATEGORY}</Badge>
        </div>
      </CardHeader>
      
      {!compact && (
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Urgency:</span>
              <span className={cn(
                "ml-2 font-medium",
                isUrgent && "text-accent"
              )}>
                {feedback.URGENCY}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground">Impact:</span>
              <span className="ml-2 font-medium">{feedback.IMPACT}</span>
            </div>
          </div>
          
          {feedback.ROOT_CAUSE && (
            <div className="text-sm">
              <span className="text-muted-foreground">Root Cause:</span>
              <p className="mt-1">{feedback.ROOT_CAUSE}</p>
            </div>
          )}
          
          <TaskStatusSelect feedbackId={feedback.feedback_id} currentStatus={feedback.task} />
        </CardContent>
      )}
    </Card>
  );
};
