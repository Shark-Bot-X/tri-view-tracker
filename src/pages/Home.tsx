import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FeedbackCard } from "@/components/FeedbackCard";
import { useFeedback } from "@/contexts/FeedbackContext";

const Home = () => {
  const { feedbackData } = useFeedback();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = feedbackData.filter(item =>
    item.feedback_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const completedFeedback = filteredData.filter(item => item.task === "completed");
  const notCompletedFeedback = filteredData.filter(item => item.task === "not_completed");
  const ongoingFeedback = filteredData.filter(item => item.task === "ongoing");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feedback Overview</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all feedback items
          </p>
        </div>
      </div>

      {feedbackData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No feedback data</h2>
          <p className="text-muted-foreground mb-6">
            Connect your backend to load feedback data
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

          {filteredData.length === 0 && searchQuery ? (
            <div className="text-center py-10 text-muted-foreground">
              No feedback found matching "{searchQuery}"
            </div>
          ) : (
            <div className="space-y-8">
              {/* Not Completed Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-destructive"></div>
                  <h2 className="text-xl font-semibold">Not Completed ({notCompletedFeedback.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {notCompletedFeedback.map((feedback) => (
                    <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
                  ))}
                </div>
                {notCompletedFeedback.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No not completed items</p>
                )}
              </div>

              {/* Ongoing Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-accent"></div>
                  <h2 className="text-xl font-semibold">Ongoing ({ongoingFeedback.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ongoingFeedback.map((feedback) => (
                    <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
                  ))}
                </div>
                {ongoingFeedback.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No ongoing items</p>
                )}
              </div>

              {/* Completed Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <h2 className="text-xl font-semibold">Completed ({completedFeedback.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedFeedback.map((feedback) => (
                    <FeedbackCard key={feedback.feedback_id} feedback={feedback} />
                  ))}
                </div>
                {completedFeedback.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">No completed items</p>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
