import { Check, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Phase {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: "completed" | "active" | "locked";
}

interface PhaseNavigationProps {
  phases: Phase[];
  currentPhase: string;
  onPhaseChange: (phaseId: string) => void;
}

export function PhaseNavigation({ phases, currentPhase, onPhaseChange }: PhaseNavigationProps) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">
      {phases.map((phase, index) => {
        const isActive = currentPhase === phase.id;
        const isCompleted = phase.status === "completed";
        const isLocked = phase.status === "locked";

        return (
          <Card
            key={phase.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              isActive
                ? `border-2 ${phase.color.replace("bg-", "border-")} shadow-md`
                : isCompleted
                ? "border-primary"
                : "border-border"
            } ${isLocked ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => !isLocked && onPhaseChange(phase.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${
                      isActive ? phase.color : isCompleted ? "bg-primary/20" : "bg-muted"
                    }`}
                  >
                    {phase.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{phase.title}</h3>
                      {isCompleted && (
                        <Check className="h-5 w-5 text-primary" />
                      )}
                      {isLocked && (
                        <Lock className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Phase {index + 1}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{phase.description}</p>
              {isLocked && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Complete previous phases to unlock
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
