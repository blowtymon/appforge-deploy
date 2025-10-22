import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BrainstormingPhase } from "@/components/appwizard/BrainstormingPhase";
import { MarketingPhase } from "@/components/appwizard/MarketingPhase";
import { InceptionPhase } from "@/components/appwizard/InceptionPhase";

// Define all steps across three phases
const allSteps = [
  // Phase 1: Brainstorming (1-9)
  { id: 1, phase: "Brainstorming", title: "Description", description: "Project overview" },
  { id: 2, phase: "Brainstorming", title: "Keywords/Tags", description: "Categorize your app" },
  { id: 3, phase: "Brainstorming", title: "Intersections", description: "Technology connections" },
  { id: 4, phase: "Brainstorming", title: "Use Cases", description: "Define scenarios" },
  { id: 5, phase: "Brainstorming", title: "Brain Map", description: "Visualize concepts" },
  { id: 6, phase: "Brainstorming", title: "User Stories", description: "User requirements" },
  { id: 7, phase: "Brainstorming", title: "Feature List", description: "Core features" },
  { id: 8, phase: "Brainstorming", title: "Requirements", description: "Technical specs" },
  { id: 9, phase: "Brainstorming", title: "Kanban", description: "Task organization" },
  
  // Phase 2: Marketing (10-18)
  { id: 10, phase: "Marketing", title: "Market Research", description: "Analyze market" },
  { id: 11, phase: "Marketing", title: "Competitors", description: "Competition analysis" },
  { id: 12, phase: "Marketing", title: "SWOT", description: "Strategic analysis" },
  { id: 13, phase: "Marketing", title: "Pricing Model", description: "Revenue strategy" },
  { id: 14, phase: "Marketing", title: "Platforms", description: "Target platforms" },
  { id: 15, phase: "Marketing", title: "Channels", description: "Distribution" },
  { id: 16, phase: "Marketing", title: "Business Plan", description: "Business strategy" },
  { id: 17, phase: "Marketing", title: "Marketing Plan", description: "Marketing strategy" },
  { id: 18, phase: "Marketing", title: "Advertising Plan", description: "Ad strategy" },
  
  // Phase 3: Inception (19-29)
  { id: 19, phase: "Inception", title: "App Creation", description: "Basic setup" },
  { id: 20, phase: "Inception", title: "Domain Name", description: "Secure domain" },
  { id: 21, phase: "Inception", title: "Features", description: "Select features" },
  { id: 22, phase: "Inception", title: "Page Generation", description: "Generate pages" },
  { id: 23, phase: "Inception", title: "Content Mgmt", description: "CMS setup" },
  { id: 24, phase: "Inception", title: "Cloud Infra", description: "AWS accounts" },
  { id: 25, phase: "Inception", title: "Environments", description: "Dev/QA/Prod" },
  { id: 26, phase: "Inception", title: "Repo/Branches", description: "GitHub setup" },
  { id: 27, phase: "Inception", title: "Versions", description: "Version control" },
  { id: 28, phase: "Inception", title: "Release", description: "Release notes" },
  { id: 29, phase: "Inception", title: "Deployments", description: "Deploy config" },
];

export default function CreateApp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  
  // Brainstorming data
  const [brainstormingData, setBrainstormingData] = useState({
    description: "",
    keywords: [] as string[],
    intersections: "",
    useCases: [] as string[],
    brainMap: [] as { node: string; connections: string[] }[],
    userStories: [] as { role: string; action: string; benefit: string }[],
    featureList: [] as string[],
    requirements: [] as { id: string; requirement: string; priority: string }[],
    kanbanColumns: [] as { name: string; tasks: string[] }[],
  });

  // Marketing data
  const [marketingData, setMarketingData] = useState({
    marketResearch: "",
    competitors: [] as { name: string; strengths: string; weaknesses: string }[],
    swag: { strengths: "", weaknesses: "", opportunities: "", threats: "" },
    pricingModel: "",
    pricing: [] as { tier: string; price: string; features: string[] }[],
    platforms: [] as string[],
    channels: [] as string[],
    businessPlan: "",
    marketingPlan: "",
    advertisingPlan: "",
  });

  // Inception data
  const [inceptionData, setInceptionData] = useState({
    appName: "",
    appDescription: "",
    domainName: "",
    domainSecured: false,
    repoOption: "new" as "new" | "existing",
    existingRepo: "",
    newRepoName: "",
    features: [] as string[],
    environment: "",
    awsAccountId: "",
    region: "",
    branch: "main",
    version: "1.0.0",
    releaseNotes: "",
    deploymentTarget: "",
  });

  const currentPhase = allSteps[currentStep - 1]?.phase || "";

  const handleNext = () => {
    if (currentStep < allSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    // Here would be the API call to create the app with all collected data
    console.log("Brainstorming:", brainstormingData);
    console.log("Marketing:", marketingData);
    console.log("Inception:", inceptionData);
    navigate("/apps");
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Brainstorming":
        return "text-blue-500 border-blue-500 bg-blue-500";
      case "Marketing":
        return "text-green-500 border-green-500 bg-green-500";
      case "Inception":
        return "text-purple-500 border-purple-500 bg-purple-500";
      default:
        return "text-muted-foreground border-border bg-muted";
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/apps")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New App</h1>
          <p className="text-muted-foreground">Set up your application in a few simple steps</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-6">
          {["Brainstorming", "Marketing", "Inception"].map((phase, phaseIndex) => {
            const phaseSteps = allSteps.filter((s) => s.phase === phase);
            const firstStepId = phaseSteps[0]?.id || 0;
            const lastStepId = phaseSteps[phaseSteps.length - 1]?.id || 0;
            const isActive = currentStep >= firstStepId && currentStep <= lastStepId;
            const isCompleted = currentStep > lastStepId;

            return (
              <div
                key={phase}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  isActive
                    ? getPhaseColor(phase).replace("bg-", "bg-opacity-10 ")
                    : isCompleted
                    ? "border-primary bg-primary/10"
                    : "border-border bg-muted/30"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : isActive
                      ? getPhaseColor(phase).split(" ")[2]
                      : "bg-muted"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : phaseIndex + 1}
                </div>
                <span
                  className={`text-sm font-semibold ${
                    isActive || isCompleted ? "" : "text-muted-foreground"
                  }`}
                >
                  {phase}
                </span>
              </div>
            );
          })}
        </div>

        <div className="overflow-x-auto">
          <div className="flex gap-2 pb-2 min-w-max">
            {allSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors text-xs ${
                      currentStep > step.id
                        ? "bg-primary border-primary text-primary-foreground"
                        : currentStep === step.id
                        ? getPhaseColor(step.phase).replace("bg-", "border-")
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="h-3 w-3" /> : step.id}
                  </div>
                  <div className="text-center mt-1 w-20">
                    <p className="text-xs font-medium truncate">{step.title}</p>
                  </div>
                </div>
                {index < allSteps.length - 1 && (
                  <div
                    className={`h-0.5 w-4 mx-1 transition-colors ${
                      currentStep > step.id ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded text-xs font-semibold ${getPhaseColor(currentPhase)}`}>
              {currentPhase}
            </div>
            <div>
              <CardTitle>{allSteps[currentStep - 1].title}</CardTitle>
              <CardDescription>{allSteps[currentStep - 1].description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep >= 1 && currentStep <= 9 && (
            <BrainstormingPhase
              step={currentStep}
              data={brainstormingData}
              onDataChange={(data) =>
                setBrainstormingData({ ...brainstormingData, ...data })
              }
            />
          )}

          {currentStep >= 10 && currentStep <= 18 && (
            <MarketingPhase
              step={currentStep}
              data={marketingData}
              onDataChange={(data) =>
                setMarketingData({ ...marketingData, ...data })
              }
            />
          )}

          {currentStep >= 19 && currentStep <= 29 && (
            <InceptionPhase
              step={currentStep}
              data={inceptionData}
              onDataChange={(data) =>
                setInceptionData({ ...inceptionData, ...data })
              }
            />
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="text-sm text-muted-foreground">
          Step {currentStep} of {allSteps.length}
        </div>
        {currentStep < allSteps.length ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleCreate}>
            <Check className="h-4 w-4 mr-2" />
            Create App
          </Button>
        )}
      </div>
    </div>
  );
}
