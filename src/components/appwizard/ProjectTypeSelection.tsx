import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Server, Cloud, Package, Terminal, Box, Layers } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

export type ProjectType = "frontend" | "backend" | "cloudformation" | "cdk" | "terraform" | "wasm" | "cli";

interface ProjectTypeSelectionProps {
  selectedTypes: ProjectType[];
  onSelect: (types: ProjectType[]) => void;
}

const projectTypes = [
  {
    id: "frontend" as ProjectType,
    title: "Frontend App",
    description: "React, Vue, Angular, or static websites",
    icon: Globe,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    details: "Deploy static sites or SPAs with automatic CDN distribution",
    requiresAnalysis: true,
  },
  {
    id: "backend" as ProjectType,
    title: "Backend / API",
    description: "REST APIs, GraphQL, or microservices",
    icon: Server,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    details: "Supports Lambda, containers (ECS/EKS), or EC2 deployments",
    requiresAnalysis: true,
  },
  {
    id: "cloudformation" as ProjectType,
    title: "CloudFormation",
    description: "AWS infrastructure as code templates",
    icon: Cloud,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    details: "Deploy and manage AWS resources using CloudFormation stacks",
    requiresAnalysis: true,
  },
  {
    id: "cdk" as ProjectType,
    title: "AWS CDK",
    description: "Cloud Development Kit applications",
    icon: Layers,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    details: "TypeScript, Python, or Java CDK applications",
    requiresAnalysis: true,
  },
  {
    id: "terraform" as ProjectType,
    title: "Terraform",
    description: "Multi-cloud infrastructure as code",
    icon: Box,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    details: "Deploy and manage infrastructure across multiple cloud providers",
    requiresAnalysis: true,
  },
  {
    id: "wasm" as ProjectType,
    title: "WebAssembly",
    description: "High-performance web applications",
    icon: Package,
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    details: "Deploy WebAssembly modules with optimal performance",
    requiresAnalysis: true,
  },
  {
    id: "cli" as ProjectType,
    title: "CLI Tool",
    description: "Command-line interface applications",
    icon: Terminal,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    details: "Package and distribute CLI tools across platforms",
    requiresAnalysis: true,
  },
];

export function ProjectTypeSelection({ selectedTypes, onSelect }: ProjectTypeSelectionProps) {
  const toggleType = (typeId: ProjectType) => {
    if (selectedTypes.includes(typeId)) {
      onSelect(selectedTypes.filter(t => t !== typeId));
    } else {
      onSelect([...selectedTypes, typeId]);
    }
  };

  const hasFrontendAndBackend = selectedTypes.includes("frontend") && selectedTypes.includes("backend");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Select Project Type(s)</h2>
        <p className="text-muted-foreground">Choose one or more types for your deployment. Each will have its own repository.</p>
      </div>

      {hasFrontendAndBackend && (
        <Alert>
          <AlertDescription>
            <strong>Separate Repositories:</strong> Frontend and backend will be deployed as separate repositories 
            with independent deployment pipelines.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projectTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedTypes.includes(type.id);
          
          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "border-primary ring-2 ring-primary" : ""
              }`}
              onClick={() => toggleType(type.id)}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className={`h-10 w-10 rounded-lg ${type.bgColor} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${type.color}`} />
                  </div>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => toggleType(type.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    {type.title}
                    {type.requiresAnalysis && (
                      <Badge variant="secondary" className="text-xs">
                        Auto-analysis
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {type.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  {type.details}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {selectedTypes.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h3 className="font-semibold text-sm">Selected Project Types:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map((typeId) => {
              const type = projectTypes.find(t => t.id === typeId);
              if (!type) return null;
              const Icon = type.icon;
              return (
                <Badge key={typeId} variant="secondary" className="gap-2">
                  <Icon className="h-3 w-3" />
                  {type.title}
                </Badge>
              );
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {selectedTypes.length} {selectedTypes.length === 1 ? "repository" : "repositories"} will be created
          </p>
        </div>
      )}
    </div>
  );
}
