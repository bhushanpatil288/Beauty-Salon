import { FileText } from "lucide-react";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function NotesField({ value, onChange }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2">
        <FileText className="w-4 h-4 text-primary" />
        Additional Notes (Optional)
      </label>
      <textarea
        name="notes"
        value={value}
        onChange={onChange}
        placeholder="Tell us about any special requests or skin conditions..."
        className="flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 backdrop-blur-sm px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      />
    </div>
  );
}
