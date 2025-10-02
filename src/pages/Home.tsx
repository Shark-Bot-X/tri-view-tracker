import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CSVUploader } from "@/components/CSVUploader";
import { FeedbackCard } from "@/components/FeedbackCard";
import { useFeedback } from "@/contexts/FeedbackContext";

const Home = () => {
  const { feedbackData } = useFeedback();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = feedbackData.filter(item =>
    item.feedback_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feedback Overview</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all feedback items
          </p>
        </div>
        <CSVUploader />
      </div>

      {feedbackData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No feedback data</h2>
          <p className="text-muted-foreground mb-6">
            Upload a CSV file to get started
          </p>
        </div>
      ) : (
        <>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by feedback ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((feedback) => (
              <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
            ))}
          </div>

          {filteredData.length === 0 && searchQuery && (
            <div className="text-center py-10 text-muted-foreground">
              No feedback found matching "{searchQuery}"
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
