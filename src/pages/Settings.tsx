import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Github, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const [isGithubConnected, setIsGithubConnected] = useState(false);
  const [githubUsername, setGithubUsername] = useState("john-doe");
  const { toast } = useToast();

  const handleGithubConnect = () => {
    // Simulate GitHub OAuth flow
    setIsGithubConnected(true);
    toast({
      title: "GitHub Connected",
      description: "Successfully connected to GitHub account",
    });
  };

  const handleGithubDisconnect = () => {
    setIsGithubConnected(false);
    toast({
      title: "GitHub Disconnected",
      description: "Successfully disconnected from GitHub",
    });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and application preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>Update your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" />
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>AWS Configuration</CardTitle>
          <CardDescription>Manage AWS account credentials</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessKey">Access Key ID</Label>
            <Input id="accessKey" placeholder="AKIA..." type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secretKey">Secret Access Key</Label>
            <Input id="secretKey" placeholder="Enter secret key" type="password" />
          </div>
          <Button variant="outline">Test Connection</Button>
          <Button>Save Credentials</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            GitHub Integration
          </CardTitle>
          <CardDescription>Connect your GitHub account for repository management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">GitHub Account</p>
                  {isGithubConnected ? (
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Not Connected
                    </Badge>
                  )}
                </div>
                {isGithubConnected && (
                  <p className="text-sm text-muted-foreground">@{githubUsername}</p>
                )}
              </div>
            </div>
            {isGithubConnected ? (
              <Button variant="outline" onClick={handleGithubDisconnect}>
                Disconnect
              </Button>
            ) : (
              <Button onClick={handleGithubConnect}>
                Connect GitHub
              </Button>
            )}
          </div>
          
          {isGithubConnected && (
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Automatic sync enabled</p>
              <p>✓ Repository access granted</p>
              <p>✓ Webhook integration active</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deployment Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts when deployments complete
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Build Failures</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when builds fail
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Domain Verification</Label>
              <p className="text-sm text-muted-foreground">
                Alerts for domain verification status
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
