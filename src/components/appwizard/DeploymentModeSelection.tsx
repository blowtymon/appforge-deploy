import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, Upload, Sparkles, Github } from "lucide-react";

interface DeploymentModeSelectionProps {
  selectedMode: "create" | "import" | null;
  onSelect: (mode: "create" | "import") => void;
}

export function DeploymentModeSelection({ selectedMode, onSelect }: DeploymentModeSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">How would you like to deploy?</h2>
        <p className="text-muted-foreground">Choose whether to create a new app or import an existing repository</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedMode === "create" ? "border-primary ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelect("create")}
        >
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="flex items-center gap-2">
              Create New App
            </CardTitle>
            <CardDescription>
              Start from scratch with AI-assisted setup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <span>Choose from multiple project types</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <span>Guided setup with best practices</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <span>Automatic repository creation</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5" />
                <span>Deploy frontend and backend separately</span>
              </div>
            </div>
            {selectedMode === "create" && (
              <Button className="w-full mt-4" size="sm">
                <GitBranch className="h-4 w-4 mr-2" />
                Selected
              </Button>
            )}
          </CardContent>
        </Card>

        <Card 
          className={`cursor-pointer transition-all hover:shadow-lg ${
            selectedMode === "import" ? "border-primary ring-2 ring-primary" : ""
          }`}
          onClick={() => onSelect("import")}
        >
          <CardHeader>
            <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Upload className="h-6 w-6 text-secondary" />
            </div>
            <CardTitle className="flex items-center gap-2">
              Import Existing Repo
            </CardTitle>
            <CardDescription>
              Connect and deploy from an existing repository
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5" />
                <span>Connect GitHub, GitLab, or Bitbucket</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5" />
                <span>Automatic project type detection</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5" />
                <span>Analyze existing infrastructure</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-secondary mt-1.5" />
                <span>One-click deployment setup</span>
              </div>
            </div>
            {selectedMode === "import" && (
              <Button className="w-full mt-4" size="sm" variant="secondary">
                <Github className="h-4 w-4 mr-2" />
                Selected
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
