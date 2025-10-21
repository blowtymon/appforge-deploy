import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Server, TestTube, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateEnvironment() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    awsAccessKey: "",
    awsSecretKey: "",
    awsRegion: "us-east-1",
    amplifyAppId: "",
  });

  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);

  const handleTestConnection = async () => {
    if (!formData.awsAccessKey || !formData.awsSecretKey) {
      toast({
        title: "Error",
        description: "Please provide AWS credentials",
        variant: "destructive",
      });
      return;
    }

    setIsTestingConnection(true);
    // Simulate API call
    setTimeout(() => {
      setIsTestingConnection(false);
      setConnectionTested(true);
      toast({
        title: "Connection Successful",
        description: "AWS credentials validated successfully",
      });
    }, 2000);
  };

  const handleCreate = () => {
    if (!formData.name || !formData.type) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (!connectionTested) {
      toast({
        title: "Error",
        description: "Please test AWS connection before creating environment",
        variant: "destructive",
      });
      return;
    }

    // API call would go here
    toast({
      title: "Environment Created",
      description: `Successfully created ${formData.type} environment: ${formData.name}`,
    });
    navigate("/environments");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/environments")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Environment</h1>
          <p className="text-muted-foreground mt-2">
            Set up a deployment environment with AWS configuration
          </p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        {[1, 2].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                  currentStep > step
                    ? "bg-primary border-primary text-primary-foreground"
                    : currentStep === step
                    ? "border-primary text-primary"
                    : "border-border text-muted-foreground"
                }`}
              >
                {currentStep > step ? <Check className="h-5 w-5" /> : step}
              </div>
              <div className="text-center mt-2">
                <p className="text-sm font-medium">
                  {step === 1 ? "Basic Info" : "AWS Configuration"}
                </p>
              </div>
            </div>
            {step < 2 && (
              <div
                className={`h-0.5 flex-1 mx-4 transition-colors ${
                  currentStep > step ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Environment Details
            </CardTitle>
            <CardDescription>Define your environment configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">
                Environment Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="My Development Environment"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">
                Environment Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select environment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DEV">Development</SelectItem>
                  <SelectItem value="QA">QA</SelectItem>
                  <SelectItem value="STAGING">Staging</SelectItem>
                  <SelectItem value="PROD">Production</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="A brief description of this environment..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>AWS Configuration</CardTitle>
            <CardDescription>Configure AWS credentials and Amplify settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="accessKey">
                AWS Access Key ID <span className="text-destructive">*</span>
              </Label>
              <Input
                id="accessKey"
                type="password"
                placeholder="AKIAIOSFODNN7EXAMPLE"
                value={formData.awsAccessKey}
                onChange={(e) => setFormData({ ...formData, awsAccessKey: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secretKey">
                AWS Secret Access Key <span className="text-destructive">*</span>
              </Label>
              <Input
                id="secretKey"
                type="password"
                placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                value={formData.awsSecretKey}
                onChange={(e) => setFormData({ ...formData, awsSecretKey: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">AWS Region</Label>
              <Select
                value={formData.awsRegion}
                onValueChange={(value) => setFormData({ ...formData, awsRegion: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                  <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                  <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                  <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amplifyAppId">Amplify App ID (Optional)</Label>
              <Input
                id="amplifyAppId"
                placeholder="d1a2b3c4d5"
                value={formData.amplifyAppId}
                onChange={(e) => setFormData({ ...formData, amplifyAppId: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to create a new Amplify app
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t">
              <Button
                variant="outline"
                onClick={handleTestConnection}
                disabled={isTestingConnection}
              >
                <TestTube className="h-4 w-4 mr-2" />
                {isTestingConnection ? "Testing..." : "Test Connection"}
              </Button>
              {connectionTested && (
                <div className="flex items-center gap-2 text-success">
                  <Check className="h-4 w-4" />
                  <span className="text-sm">Connection successful</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-between">
        {currentStep === 1 ? (
          <Button variant="outline" onClick={() => navigate("/environments")}>
            Cancel
          </Button>
        ) : (
          <Button variant="outline" onClick={() => setCurrentStep(1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        )}

        {currentStep === 1 ? (
          <Button onClick={() => setCurrentStep(2)}>
            Next
          </Button>
        ) : (
          <Button onClick={handleCreate} disabled={!connectionTested}>
            <Server className="h-4 w-4 mr-2" />
            Create Environment
          </Button>
        )}
      </div>
    </div>
  );
}
