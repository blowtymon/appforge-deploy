import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, X, Lightbulb, Map, Users, List, FileText, Trello } from "lucide-react";
import { useState } from "react";

interface BrainstormingData {
  description: string;
  keywords: string[];
  intersections: string;
  useCases: string[];
  brainMap: { node: string; connections: string[] }[];
  userStories: { role: string; action: string; benefit: string }[];
  featureList: string[];
  requirements: { id: string; requirement: string; priority: string }[];
  kanbanColumns: { name: string; tasks: string[] }[];
}

interface BrainstormingPhaseProps {
  step: number;
  data: BrainstormingData;
  onDataChange: (data: Partial<BrainstormingData>) => void;
}

export function BrainstormingPhase({ step, data, onDataChange }: BrainstormingPhaseProps) {
  const [newKeyword, setNewKeyword] = useState("");
  const [newUseCase, setNewUseCase] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const steps = [
    { id: 2, title: "Description", icon: "📝" },
    { id: 3, title: "Keywords/Tags", icon: "🏷️" },
    { id: 4, title: "Intersections", icon: "🔗" },
    { id: 5, title: "Use Cases", icon: "💡" },
    { id: 6, title: "Brain Map", icon: "🗺️" },
    { id: 7, title: "User Stories", icon: "👥" },
    { id: 8, title: "Feature List", icon: "📋" },
    { id: 9, title: "Requirements", icon: "📄" },
    { id: 10, title: "Kanban", icon: "📊" },
  ];

  const addKeyword = () => {
    if (newKeyword.trim()) {
      onDataChange({ keywords: [...data.keywords, newKeyword.trim()] });
      setNewKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    onDataChange({ keywords: data.keywords.filter((_, i) => i !== index) });
  };

  const addUseCase = () => {
    if (newUseCase.trim()) {
      onDataChange({ useCases: [...data.useCases, newUseCase.trim()] });
      setNewUseCase("");
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      onDataChange({ featureList: [...data.featureList, newFeature.trim()] });
      setNewFeature("");
    }
  };

  const addUserStory = () => {
    onDataChange({
      userStories: [...data.userStories, { role: "", action: "", benefit: "" }],
    });
  };

  const addRequirement = () => {
    onDataChange({
      requirements: [
        ...data.requirements,
        { id: `REQ-${data.requirements.length + 1}`, requirement: "", priority: "medium" },
      ],
    });
  };

  return (
    <div className="space-y-6">
      {/* Step Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap ${
              step === s.id
                ? "border-blue-500 bg-blue-500/10 text-blue-600"
                : step > s.id
                ? "border-primary bg-primary/10"
                : "border-border bg-muted"
            }`}
          >
            <span className="text-lg">{s.icon}</span>
            <span className="text-sm font-medium">{s.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Project Description</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Describe your app idea</Label>
            <Textarea
              id="description"
              placeholder="What problem does your app solve? Who is it for?"
              value={data.description}
              onChange={(e) => onDataChange({ description: e.target.value })}
              rows={6}
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Keywords & Tags</h3>
          </div>
          <div className="space-y-2">
            <Label>Add relevant keywords</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., social, productivity, mobile"
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
              />
              <Button type="button" onClick={addKeyword}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {data.keywords.map((keyword, index) => (
                <Badge key={index} variant="secondary" className="gap-2">
                  {keyword}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeKeyword(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Intersections</h3>
          <div className="space-y-2">
            <Label htmlFor="intersections">
              What technologies, markets, or concepts intersect in your app?
            </Label>
            <Textarea
              id="intersections"
              placeholder="e.g., AI + Healthcare, E-commerce + Social Media"
              value={data.intersections}
              onChange={(e) => onDataChange({ intersections: e.target.value })}
              rows={6}
            />
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Use Cases</h3>
          <div className="space-y-2">
            <Label>Define key use cases</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., User can create and share content"
                value={newUseCase}
                onChange={(e) => setNewUseCase(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addUseCase()}
              />
              <Button type="button" onClick={addUseCase}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-4">
              {data.useCases.map((useCase, index) => (
                <Card key={index}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <span className="text-sm">{useCase}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onDataChange({
                          useCases: data.useCases.filter((_, i) => i !== index),
                        })
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Map className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Brain Map</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Visualize connections between concepts, features, and user flows
          </p>
          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/20">
            <Map className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Interactive brain mapping tool will be available here
            </p>
          </div>
        </div>
      )}

      {step === 7 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">User Stories</h3>
          </div>
          <Button type="button" onClick={addUserStory} className="mb-4">
            <Plus className="h-4 w-4 mr-2" />
            Add User Story
          </Button>
          <div className="space-y-4">
            {data.userStories.map((story, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-sm">Story #{index + 1}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">As a</Label>
                      <Input
                        placeholder="user role"
                        value={story.role}
                        onChange={(e) => {
                          const updated = [...data.userStories];
                          updated[index].role = e.target.value;
                          onDataChange({ userStories: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">I want to</Label>
                      <Input
                        placeholder="action"
                        value={story.action}
                        onChange={(e) => {
                          const updated = [...data.userStories];
                          updated[index].action = e.target.value;
                          onDataChange({ userStories: updated });
                        }}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">So that</Label>
                      <Input
                        placeholder="benefit"
                        value={story.benefit}
                        onChange={(e) => {
                          const updated = [...data.userStories];
                          updated[index].benefit = e.target.value;
                          onDataChange({ userStories: updated });
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 8 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <List className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Feature List</h3>
          </div>
          <div className="space-y-2">
            <Label>Add features</Label>
            <div className="flex gap-2">
              <Input
                placeholder="e.g., User authentication, Profile management"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addFeature()}
              />
              <Button type="button" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mt-4">
              {data.featureList.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="p-3 flex items-center justify-between">
                    <span className="text-sm">{feature}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        onDataChange({
                          featureList: data.featureList.filter((_, i) => i !== index),
                        })
                      }
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === 9 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Requirements</h3>
          </div>
          <Button type="button" onClick={addRequirement} className="mb-4">
            <Plus className="h-4 w-4 mr-2" />
            Add Requirement
          </Button>
          <div className="space-y-3">
            {data.requirements.map((req, index) => (
              <Card key={req.id}>
                <CardContent className="p-4">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <div className="col-span-2">
                      <Badge variant="outline">{req.id}</Badge>
                    </div>
                    <div className="col-span-7">
                      <Input
                        placeholder="Requirement description"
                        value={req.requirement}
                        onChange={(e) => {
                          const updated = [...data.requirements];
                          updated[index].requirement = e.target.value;
                          onDataChange({ requirements: updated });
                        }}
                      />
                    </div>
                    <div className="col-span-2">
                      <select
                        className="w-full border rounded-md px-3 py-2 text-sm"
                        value={req.priority}
                        onChange={(e) => {
                          const updated = [...data.requirements];
                          updated[index].priority = e.target.value;
                          onDataChange({ requirements: updated });
                        }}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="col-span-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          onDataChange({
                            requirements: data.requirements.filter((_, i) => i !== index),
                          })
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 10 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Trello className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Kanban Board</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Organize your tasks and track progress
          </p>
          <div className="grid grid-cols-3 gap-4">
            {["To Do", "In Progress", "Done"].map((column) => (
              <Card key={column}>
                <CardHeader>
                  <CardTitle className="text-sm">{column}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Task
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
