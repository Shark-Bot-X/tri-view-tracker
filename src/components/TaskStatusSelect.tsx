import { TaskStatus } from "@/types/feedback";
import { useFeedback } from "@/contexts/FeedbackContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface TaskStatusSelectProps {
  feedbackId: string;
  currentStatus: TaskStatus;
}

const statusConfig = {
  completed: { label: "Completed", icon: CheckCircle2, color: "text-success" },
  not_completed: { label: "Not Completed", icon: Circle, color: "text-muted-foreground" },
  ongoing: { label: "Ongoing", icon: Clock, color: "text-primary" },
};

export const TaskStatusSelect = ({ feedbackId, currentStatus }: TaskStatusSelectProps) => {
  const { updateFeedback } = useFeedback();

  const handleStatusChange = (newStatus: TaskStatus) => {
    updateFeedback(feedbackId, { task: newStatus });
  };

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange}>
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(statusConfig).map(([value, config]) => {
          const Icon = config.icon;
          return (
            <SelectItem key={value} value={value}>
              <div className="flex items-center gap-2">
                <Icon className={cn("h-4 w-4", config.color)} />
                <span>{config.label}</span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
