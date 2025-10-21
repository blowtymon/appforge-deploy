import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, GitBranch, Github, Lock, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CreateRepo() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    visibility: "private" as "private" | "public",
    initReadme: true,
    gitignore: "Node",
    license: "MIT",
    defaultBranch: "main",
  });

  const handleCreate = () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Repository name is required",
        variant: "destructive",
      });
      return;
    }

    // API call would go here
    toast({
      title: "Repository Created",
      description: `Successfully created repository: ${formData.name}`,
    });
    navigate("/repository");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/repository")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Create New Repository</h1>
          <p className="text-muted-foreground mt-2">
            Set up a new GitHub repository for your application
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            Repository Configuration
          </CardTitle>
          <CardDescription>Configure your new GitHub repository settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">
              Repository Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              placeholder="my-awesome-app"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Use lowercase letters, numbers, and hyphens only
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your repository..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Visibility</Label>
            <div className="grid grid-cols-2 gap-4">
              <Card
                className={`cursor-pointer transition-colors ${
                  formData.visibility === "public" ? "border-primary" : ""
                }`}
                onClick={() => setFormData({ ...formData, visibility: "public" })}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <Globe className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Public</h4>
                    <p className="text-xs text-muted-foreground">
                      Anyone can see this repository
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card
                className={`cursor-pointer transition-colors ${
                  formData.visibility === "private" ? "border-primary" : ""
                }`}
                onClick={() => setFormData({ ...formData, visibility: "private" })}
              >
                <CardContent className="p-4 flex items-start gap-3">
                  <Lock className="h-5 w-5 mt-0.5 text-muted-foreground" />
                  <div>
                    <h4 className="font-semibold">Private</h4>
                    <p className="text-xs text-muted-foreground">
                      You choose who can see this repository
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Initialize with README</Label>
                <p className="text-sm text-muted-foreground">
                  Add a README file to describe your repository
                </p>
              </div>
              <Switch
                checked={formData.initReadme}
                onCheckedChange={(checked) => setFormData({ ...formData, initReadme: checked })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gitignore">.gitignore Template</Label>
            <Select
              value={formData.gitignore}
              onValueChange={(value) => setFormData({ ...formData, gitignore: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="Node">Node</SelectItem>
                <SelectItem value="React">React</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="license">License</Label>
            <Select
              value={formData.license}
              onValueChange={(value) => setFormData({ ...formData, license: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="None">None</SelectItem>
                <SelectItem value="MIT">MIT License</SelectItem>
                <SelectItem value="Apache-2.0">Apache License 2.0</SelectItem>
                <SelectItem value="GPL-3.0">GNU GPL v3.0</SelectItem>
                <SelectItem value="BSD-3-Clause">BSD 3-Clause</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="branch">Default Branch Name</Label>
            <Input
              id="branch"
              placeholder="main"
              value={formData.defaultBranch}
              onChange={(e) => setFormData({ ...formData, defaultBranch: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate("/repository")}>
          Cancel
        </Button>
        <Button onClick={handleCreate}>
          <GitBranch className="h-4 w-4 mr-2" />
          Create Repository
        </Button>
      </div>
    </div>
  );
}
