import { createContext, useContext, useState, ReactNode } from "react";
import { FeedbackItem } from "@/types/feedback";

interface FeedbackContextType {
  feedbackData: FeedbackItem[];
  setFeedbackData: (data: FeedbackItem[]) => void;
  updateFeedback: (id: string, updates: Partial<FeedbackItem>) => void;
  updateMultipleFeedback: (ids: string[], updates: Partial<FeedbackItem>) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>([]);

  const updateFeedback = (id: string, updates: Partial<FeedbackItem>) => {
    setFeedbackData(prev =>
      prev.map(item =>
        item.feedback_id === id ? { ...item, ...updates } : item
      )
    );
  };

  const updateMultipleFeedback = (ids: string[], updates: Partial<FeedbackItem>) => {
    setFeedbackData(prev =>
      prev.map(item =>
        ids.includes(item.feedback_id) ? { ...item, ...updates } : item
      )
    );
  };

  return (
    <FeedbackContext.Provider
      value={{ feedbackData, setFeedbackData, updateFeedback, updateMultipleFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within FeedbackProvider");
  }
  return context;
};
