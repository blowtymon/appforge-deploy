import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const steps = [
  { id: 1, title: "Basic Info", description: "App name and description" },
  { id: 2, title: "Features", description: "Select app features" },
  { id: 3, title: "Environment", description: "Choose environment" },
  { id: 4, title: "Review", description: "Confirm and create" },
];

const features = [
  { id: "login", label: "User Login & Authentication" },
  { id: "header", label: "Navigation Header" },
  { id: "sidebar", label: "Sidebar Navigation" },
  { id: "router", label: "Multi-page Router" },
  { id: "api", label: "API Integration" },
  { id: "database", label: "Database Connection" },
];

export default function CreateApp() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    features: [] as string[],
    environment: "",
    domain: "",
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreate = () => {
    // Here would be the API call to create the app
    navigate("/apps");
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

      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep > step.id
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step.id
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
              </div>
              <div className="text-center mt-2">
                <p className="text-sm font-medium">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-4 transition-colors ${
                  currentStep > step.id ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">App Name</Label>
                <Input
                  id="name"
                  placeholder="My Awesome App"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="A brief description of your application..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select the features you want to include in your app
              </p>
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature.id}
                    checked={formData.features.includes(feature.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({
                          ...formData,
                          features: [...formData.features, feature.id],
                        });
                      } else {
                        setFormData({
                          ...formData,
                          features: formData.features.filter((f) => f !== feature.id),
                        });
                      }
                    }}
                  />
                  <Label htmlFor={feature.id} className="font-normal cursor-pointer">
                    {feature.label}
                  </Label>
                </div>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="environment">Environment</Label>
                <Select
                  value={formData.environment}
                  onValueChange={(value) => setFormData({ ...formData, environment: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dev">Development</SelectItem>
                    <SelectItem value="qa">QA</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="prod">Production</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="domain">Base Domain (Optional)</Label>
                <Input
                  id="domain"
                  placeholder="example.com"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                />
              </div>
            </>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">App Name</h4>
                <p className="text-sm text-muted-foreground">{formData.name}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground">{formData.description}</p>
              </div>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((featureId) => {
                    const feature = features.find((f) => f.id === featureId);
                    return (
                      <span key={featureId} className="text-xs bg-background px-2 py-1 rounded">
                        {feature?.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h4 className="font-semibold">Environment</h4>
                <p className="text-sm text-muted-foreground">{formData.environment.toUpperCase()}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        {currentStep < steps.length ? (
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
