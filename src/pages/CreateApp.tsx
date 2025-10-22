import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { BrainstormingPhase } from "@/components/appwizard/BrainstormingPhase";
import { MarketingPhase } from "@/components/appwizard/MarketingPhase";
import { InceptionPhase } from "@/components/appwizard/InceptionPhase";
import { PhaseNavigation } from "@/components/appwizard/PhaseNavigation";

export default function CreateApp() {
  const navigate = useNavigate();
  const [currentPhase, setCurrentPhase] = useState<"brainstorming" | "marketing" | "inception">("brainstorming");
  const [currentStep, setCurrentStep] = useState(1);
  
  // Phase completion tracking
  const [phaseCompletion, setPhaseCompletion] = useState({
    brainstorming: false,
    marketing: false,
    inception: false,
  });
  
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

  // Phase definitions
  const phases = [
    {
      id: "brainstorming",
      title: "🧠 Brainstorming",
      description: "Idea incubation and planning. Define your concept, features, and requirements.",
      icon: "🧠",
      color: "bg-blue-500",
      status: phaseCompletion.brainstorming ? "completed" : currentPhase === "brainstorming" ? "active" : "locked",
      stepRange: [1, 9],
    },
    {
      id: "marketing",
      title: "📈 Marketing",
      description: "Market validation and positioning. Research competitors and define your strategy.",
      icon: "📈",
      color: "bg-green-500",
      status: !phaseCompletion.brainstorming 
        ? "locked" 
        : phaseCompletion.marketing 
        ? "completed" 
        : currentPhase === "marketing" 
        ? "active" 
        : "locked",
      stepRange: [10, 18],
    },
    {
      id: "inception",
      title: "⚙️ Inception",
      description: "Build and deploy your app. Create infrastructure, configure environments, and launch.",
      icon: "⚙️",
      color: "bg-purple-500",
      status: !phaseCompletion.marketing 
        ? "locked" 
        : phaseCompletion.inception 
        ? "completed" 
        : currentPhase === "inception" 
        ? "active" 
        : "locked",
      stepRange: [19, 29],
    },
  ];

  const currentPhaseData = phases.find((p) => p.id === currentPhase);
  const minStep = currentPhaseData?.stepRange[0] || 1;
  const maxStep = currentPhaseData?.stepRange[1] || 9;

  const handleNext = () => {
    if (currentStep < maxStep) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === maxStep) {
      // Complete current phase and move to next
      if (currentPhase === "brainstorming") {
        setPhaseCompletion({ ...phaseCompletion, brainstorming: true });
        setCurrentPhase("marketing");
        setCurrentStep(10);
      } else if (currentPhase === "marketing") {
        setPhaseCompletion({ ...phaseCompletion, marketing: true });
        setCurrentPhase("inception");
        setCurrentStep(19);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > minStep) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === minStep && currentPhase !== "brainstorming") {
      // Go back to previous phase
      if (currentPhase === "marketing") {
        setCurrentPhase("brainstorming");
        setCurrentStep(9);
      } else if (currentPhase === "inception") {
        setCurrentPhase("marketing");
        setCurrentStep(18);
      }
    }
  };

  const handlePhaseChange = (phaseId: string) => {
    const phase = phases.find((p) => p.id === phaseId);
    if (phase && phase.status !== "locked") {
      setCurrentPhase(phaseId as "brainstorming" | "marketing" | "inception");
      setCurrentStep(phase.stepRange[0]);
    }
  };

  const handleComplete = () => {
    setPhaseCompletion({ ...phaseCompletion, inception: true });
    console.log("All data:", { brainstormingData, marketingData, inceptionData });
    navigate("/apps");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/apps")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Create New App</h1>
            <p className="text-muted-foreground">
              Progressive workflow: Brainstorm → Validate → Build → Deploy
            </p>
          </div>
        </div>
      </div>

      {/* Phase Navigation Cards */}
      <PhaseNavigation 
        phases={phases as any}
        currentPhase={currentPhase}
        onPhaseChange={handlePhaseChange}
      />

      {/* Workspace Area */}

      <Card className="border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl flex items-center gap-3">
              <span className="text-3xl">{currentPhaseData?.icon}</span>
              {currentPhaseData?.title}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Step {currentStep - minStep + 1} of {maxStep - minStep + 1}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {currentPhase === "brainstorming" && (
            <BrainstormingPhase
              step={currentStep}
              data={brainstormingData}
              onDataChange={(data) =>
                setBrainstormingData({ ...brainstormingData, ...data })
              }
            />
          )}

          {currentPhase === "marketing" && (
            <MarketingPhase
              step={currentStep}
              data={marketingData}
              onDataChange={(data) =>
                setMarketingData({ ...marketingData, ...data })
              }
            />
          )}

          {currentPhase === "inception" && (
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

      {/* Navigation Controls */}
      <div className="flex justify-between items-center py-4 border-t">
        <Button 
          variant="outline" 
          onClick={handleBack} 
          disabled={currentStep === 1 && currentPhase === "brainstorming"}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="text-sm text-muted-foreground">
            {currentPhaseData?.title}
          </div>
          <div className="text-sm font-medium">
            {currentStep - minStep + 1} / {maxStep - minStep + 1}
          </div>
        </div>

        {currentStep < maxStep ? (
          <Button onClick={handleNext}>
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : currentStep === maxStep && currentPhase !== "inception" ? (
          <Button onClick={handleNext}>
            Complete Phase & Continue
            <Check className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleComplete} className="bg-gradient-to-r from-purple-500 to-blue-500">
            <Check className="h-4 w-4 mr-2" />
            Complete & Create App
          </Button>
        )}
      </div>
    </div>
  );
}
