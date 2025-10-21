import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";

export interface BuildLog {
  id: string;
  timestamp: string;
  type: "info" | "success" | "error";
  message: string;
}

interface BuildLogsProps {
  logs: BuildLog[];
}

export function BuildLogs({ logs }: BuildLogsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-success" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Info className="h-4 w-4 text-info" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b">
        <h3 className="font-semibold text-sm">Build Logs</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1 font-mono text-xs">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 py-1">
              {getIcon(log.type)}
              <span className="text-muted-foreground">[{log.timestamp}]</span>
              <span className="flex-1">{log.message}</span>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-muted-foreground text-center py-4">
              No build logs yet. Start chatting to generate components.
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
