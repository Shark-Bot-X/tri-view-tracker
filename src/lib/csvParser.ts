import { FeedbackItem } from "@/types/feedback";

export const parseCSV = (csvText: string): FeedbackItem[] => {
  const lines = csvText.split("\n").filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map(h => h.trim());
  const data: FeedbackItem[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map(v => v.trim());
    if (values.length === headers.length) {
      data.push({
        feedback_id: values[0],
        CATEGORY: values[1] as FeedbackItem["CATEGORY"],
        FEEDBACK_SUMMARY: values[2],
        ROOT_CAUSE: values[3],
        URGENCY: values[4],
        IMPACT: values[5],
        NOTES: values[6],
        task: values[7] as FeedbackItem["task"],
      });
    }
  }

  return data;
};

export const exportToCSV = (data: FeedbackItem[]): string => {
  const headers = [
    "feedback_id",
    "CATEGORY",
    "FEEDBACK_SUMMARY",
    "ROOT_CAUSE",
    "URGENCY",
    "IMPACT",
    "NOTES",
    "task",
  ];

  const rows = data.map(item => [
    item.feedback_id,
    item.CATEGORY,
    item.FEEDBACK_SUMMARY,
    item.ROOT_CAUSE,
    item.URGENCY,
    item.IMPACT,
    item.NOTES,
    item.task,
  ]);

  return [headers, ...rows].map(row => row.join(",")).join("\n");
};
