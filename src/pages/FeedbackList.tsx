import { useState } from "react";
import { Filter } from "lucide-react";
import { useFeedback } from "@/contexts/FeedbackContext";
import { FeedbackCard } from "@/components/FeedbackCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FeedbackList = () => {
  const { feedbackData } = useFeedback();
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [urgencyFilter, setUrgencyFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredData = feedbackData.filter(item => {
    const matchesCategory = categoryFilter === "all" || item.CATEGORY === categoryFilter;
    const matchesUrgency = urgencyFilter === "all" || item.URGENCY === urgencyFilter;
    const matchesStatus = statusFilter === "all" || item.task === statusFilter;
    return matchesCategory && matchesUrgency && matchesStatus;
  });

  const categories = Array.from(new Set(feedbackData.map(f => f.CATEGORY)));
  const urgencyLevels = Array.from(new Set(feedbackData.map(f => f.URGENCY)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Filter className="h-8 w-8" />
          Feedback List
        </h1>
        <p className="text-muted-foreground mt-1">
          Filter and explore all feedback items
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-card border rounded-lg">
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Urgency</Label>
          <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Urgency Levels</SelectItem>
              {urgencyLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="ongoing">Ongoing</SelectItem>
              <SelectItem value="not_completed">Not Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredData.length} of {feedbackData.length} items
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No feedback matches the selected filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredData.map((feedback) => (
            <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackList;
