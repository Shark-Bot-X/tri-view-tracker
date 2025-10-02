import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFeedback } from "@/contexts/FeedbackContext";
import { parseCSV } from "@/lib/csvParser";
import { useToast } from "@/hooks/use-toast";

export const CSVUploader = () => {
  const { setFeedbackData } = useFeedback();
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const csvText = event.target?.result as string;
      const parsedData = parseCSV(csvText);
      
      if (parsedData.length > 0) {
        setFeedbackData(parsedData);
        toast({
          title: "CSV uploaded successfully",
          description: `Loaded ${parsedData.length} feedback items`,
        });
      } else {
        toast({
          title: "Upload failed",
          description: "No valid data found in CSV",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="hidden"
        id="csv-upload"
      />
      <label htmlFor="csv-upload">
        <Button asChild variant="outline">
          <span className="cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Upload CSV
          </span>
        </Button>
      </label>
    </div>
  );
};
