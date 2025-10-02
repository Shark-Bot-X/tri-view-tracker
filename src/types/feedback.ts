export type FeedbackCategory = 
  | "Feature_Request"
  | "Bug"
  | "User_experience"
  | "Performance"
  | "Pricing"
  | "Positive";

export type TaskStatus = "completed" | "not_completed" | "ongoing";

export interface FeedbackItem {
  feedback_id: string;
  CATEGORY: FeedbackCategory;
  FEEDBACK_SUMMARY: string;
  ROOT_CAUSE: string;
  URGENCY: string;
  IMPACT: string;
  NOTES: string;
  task: TaskStatus;
}
