import { Calendar, TrendingUp } from "lucide-react";
import { useFeedback } from "@/contexts/FeedbackContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const WeeklyReport = () => {
  const { feedbackData } = useFeedback();

  // Mock weekly data - in a real app, this would be filtered by date
  const weeklyTrend = [
    { day: "Mon", count: 12 },
    { day: "Tue", count: 19 },
    { day: "Wed", count: 15 },
    { day: "Thu", count: 22 },
    { day: "Fri", count: 18 },
    { day: "Sat", count: 8 },
    { day: "Sun", count: 5 },
  ];

  const urgentIssues = feedbackData.filter(f => f.URGENCY.toLowerCase() === "high");
  const topPriority = feedbackData
    .filter(f => f.URGENCY.toLowerCase() === "high" && f.task !== "completed")
    .slice(0, 5);

  const categoryBreakdown = Object.entries(
    feedbackData.reduce((acc, item) => {
      acc[item.CATEGORY] = (acc[item.CATEGORY] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, count]) => ({ name, count }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calendar className="h-8 w-8 text-primary" />
          Weekly Report
        </h1>
        <p className="text-muted-foreground mt-1">
          Insights and trends from the past week
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{feedbackData.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Urgent Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-accent">{urgentIssues.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              {feedbackData.filter(f => f.task === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully resolved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {feedbackData.filter(f => f.task === "ongoing").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently being worked on
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Feedback Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrend}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="hsl(239, 84%, 67%)" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryBreakdown}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(239, 84%, 67%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Priority Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topPriority.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">
                No urgent issues pending
              </p>
            ) : (
              topPriority.map((item) => (
                <div
                  key={item.feedback_id}
                  className="flex items-start justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{item.feedback_id}</span>
                      <Badge variant="outline">{item.CATEGORY}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.FEEDBACK_SUMMARY}
                    </p>
                  </div>
                  <Badge variant="destructive">High</Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyReport;
