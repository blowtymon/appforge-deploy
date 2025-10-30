import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PageBuilder } from "@/components/pagebuilder/PageBuilder";
import { 
  Rocket, 
  Globe, 
  Layout, 
  FileCode, 
  Cloud,
  Server,
  GitBranch,
  Tag,
  Upload,
  Zap,
  Plus
} from "lucide-react";

interface InceptionData {
  appName: string;
  appDescription: string;
  domainName: string;
  domainSecured: boolean;
  repoOption: "new" | "existing";
  existingRepo: string;
  newRepoName: string;
  features: string[];
  environment: string;
  awsAccountId: string;
  region: string;
  branch: string;
  version: string;
  releaseNotes: string;
  deploymentTarget: string;
}

interface InceptionPhaseProps {
  step: number;
  data: InceptionData;
  onDataChange: (data: Partial<InceptionData>) => void;
}

const features = [
  { id: "login", label: "User Login & Authentication" },
  { id: "header", label: "Navigation Header" },
  { id: "sidebar", label: "Sidebar Navigation" },
  { id: "router", label: "Multi-page Router" },
  { id: "api", label: "API Integration" },
  { id: "database", label: "Database Connection" },
];

const existingRepos = [
  { id: "1", name: "my-first-repo", url: "github.com/user/my-first-repo" },
  { id: "2", name: "dashboard-app", url: "github.com/user/dashboard-app" },
  { id: "3", name: "ecommerce-site", url: "github.com/user/ecommerce-site" },
];

export function InceptionPhase({ step, data, onDataChange }: InceptionPhaseProps) {
  const steps = [
    { id: 20, title: "App Creation", icon: "🚀" },
    { id: 21, title: "Domain Name", icon: "🌐" },
    { id: 22, title: "Features", icon: "⚡" },
    { id: 23, title: "Page Generation", icon: "📄" },
    { id: 24, title: "Content Mgmt", icon: "📝" },
    { id: 25, title: "Cloud Infra", icon: "☁️" },
    { id: 26, title: "Environments", icon: "🔧" },
    { id: 27, title: "Repo/Branches", icon: "🌿" },
    { id: 28, title: "Versions", icon: "🏷️" },
    { id: 29, title: "Release", icon: "📦" },
    { id: 30, title: "Deployments", icon: "⚡" },
  ];

  return (
    <div className="space-y-6">
      {/* Step Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s) => (
          <div
            key={s.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap ${
              step === s.id
                ? "border-purple-500 bg-purple-500/10 text-purple-600"
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
      {step === 20 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Rocket className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">App Creation</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appName">App Name</Label>
            <Input
              id="appName"
              placeholder="My Awesome App"
              value={data.appName}
              onChange={(e) => onDataChange({ appName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="appDescription">App Description</Label>
            <Textarea
              id="appDescription"
              placeholder="A brief description of your application..."
              value={data.appDescription}
              onChange={(e) => onDataChange({ appDescription: e.target.value })}
              rows={4}
            />
          </div>
        </div>
      )}

      {step === 21 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Secure Domain Name</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="domainName">Domain Name</Label>
            <Input
              id="domainName"
              placeholder="myapp.com"
              value={data.domainName}
              onChange={(e) => onDataChange({ domainName: e.target.value })}
            />
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="domainSecured"
              checked={data.domainSecured}
              onCheckedChange={(checked) =>
                onDataChange({ domainSecured: checked as boolean })
              }
            />
            <Label htmlFor="domainSecured" className="font-normal cursor-pointer">
              I have already secured this domain
            </Label>
          </div>
          {!data.domainSecured && (
            <Card className="mt-4 bg-muted/50">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">
                  Don't have a domain yet? Consider using services like Namecheap, GoDaddy,
                  or Google Domains to register your domain name.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {step === 22 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Layout className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Features & Components</h3>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground mb-4">
              Build your app pages using AI-powered chat interface
            </p>
            <PageBuilder />
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-sm font-medium">Or select pre-built features:</p>
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.id}
                  checked={data.features.includes(feature.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onDataChange({ features: [...data.features, feature.id] });
                    } else {
                      onDataChange({
                        features: data.features.filter((f) => f !== feature.id),
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
        </div>
      )}

      {step === 23 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileCode className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Page Generation</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Additional page templates and content generation
          </p>
          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/20">
            <FileCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Page templates and generation tools coming soon
            </p>
          </div>
        </div>
      )}

      {step === 24 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileCode className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Content Management</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Configure CMS and content structure
          </p>
          <div className="border-2 border-dashed rounded-lg p-8 text-center bg-muted/20">
            <FileCode className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              Content management system integration coming soon
            </p>
          </div>
        </div>
      )}

      {step === 25 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Cloud className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Cloud Infrastructure</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="awsAccountId">AWS Account ID</Label>
            <Input
              id="awsAccountId"
              placeholder="123456789012"
              value={data.awsAccountId}
              onChange={(e) => onDataChange({ awsAccountId: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">AWS Region</Label>
            <Select
              value={data.region}
              onValueChange={(value) => onDataChange({ region: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                <SelectItem value="eu-west-1">EU (Ireland)</SelectItem>
                <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {step === 26 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Server className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Environment Configuration</h3>
          </div>
          <div className="space-y-2">
            <Label htmlFor="environment">Environment</Label>
            <Select
              value={data.environment}
              onValueChange={(value) => onDataChange({ environment: value })}
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
        </div>
      )}

      {step === 27 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <GitBranch className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Repository & Branches</h3>
          </div>
          <RadioGroup
            value={data.repoOption}
            onValueChange={(value: "new" | "existing") =>
              onDataChange({ repoOption: value })
            }
          >
            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="new" id="new" />
              <div className="flex-1">
                <Label htmlFor="new" className="font-semibold cursor-pointer flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Repository
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Generate a new GitHub repository with boilerplate code
                </p>
                {data.repoOption === "new" && (
                  <div className="mt-4">
                    <Label htmlFor="newRepoName">Repository Name</Label>
                    <Input
                      id="newRepoName"
                      placeholder="my-awesome-app"
                      value={data.newRepoName}
                      onChange={(e) => onDataChange({ newRepoName: e.target.value })}
                      className="mt-2"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-start space-x-3 p-4 border rounded-lg">
              <RadioGroupItem value="existing" id="existing" />
              <div className="flex-1">
                <Label htmlFor="existing" className="font-semibold cursor-pointer flex items-center gap-2">
                  <GitBranch className="h-4 w-4" />
                  Use Existing Repository
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect to an existing GitHub repository
                </p>
                {data.repoOption === "existing" && (
                  <div className="mt-4">
                    <Label htmlFor="existingRepo">Select Repository</Label>
                    <Select
                      value={data.existingRepo}
                      onValueChange={(value) => onDataChange({ existingRepo: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a repository" />
                      </SelectTrigger>
                      <SelectContent>
                        {existingRepos.map((repo) => (
                          <SelectItem key={repo.id} value={repo.id}>
                            <div className="flex flex-col">
                              <span className="font-medium">{repo.name}</span>
                              <span className="text-xs text-muted-foreground">{repo.url}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </div>
          </RadioGroup>
          <div className="space-y-2 mt-4">
            <Label htmlFor="branch">Branch</Label>
            <Input
              id="branch"
              placeholder="main"
              value={data.branch}
              onChange={(e) => onDataChange({ branch: e.target.value })}
            />
          </div>
        </div>
      )}

      {step === 28 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Versions</h3>
          </div>
          
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Version Management</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Every app needs to be committed to repository</li>
                <li>• Each version takes a snapshot of the current app</li>
                <li>• Snapshots include features, code, UI settings, and configurations</li>
                <li>• You can recall any APP version from the repo at any time</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="version">Version Number</Label>
            <Input
              id="version"
              placeholder="v1.1"
              value={data.version}
              onChange={(e) => onDataChange({ version: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              Format: v1.0, v1.1, v2.0, etc.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="tagRelease"
              defaultChecked={false}
            />
            <Label htmlFor="tagRelease" className="font-normal cursor-pointer">
              Tag this version for release (Author can TAG app once ready)
            </Label>
          </div>
        </div>
      )}

      {step === 29 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Upload className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Release</h3>
          </div>
          
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Release Functionality</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Every time app is released, it's like tagging the version</li>
                <li>• Release counter auto-increments with each commit to repo</li>
                <li>• Example: V1.1 release 10 (or v1.1 r10) means version 1.1 after 252 commits</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">Release Number</p>
                  <p className="text-2xl font-bold text-primary">r10</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Total Commits</p>
                  <p className="text-lg font-semibold">252</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Format: {data.version} r10 (version + release number)
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="releaseNotes">Release Notes</Label>
            <Textarea
              id="releaseNotes"
              placeholder="Describe the changes in this release..."
              value={data.releaseNotes}
              onChange={(e) => onDataChange({ releaseNotes: e.target.value })}
              rows={6}
            />
          </div>
        </div>
      )}

      {step === 30 && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold">Deployments</h3>
          </div>
          
          <Card className="bg-muted/50">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Deployment Tracking</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Counts how many times app has been deployed</li>
                <li>• Each environment counts as separate deployment</li>
                <li>• Example: v1.1 r10 d20 = version 1.1, release 10, 20 deployments</li>
                <li>• Track: v1.1 R10 d20 on DEV, d21 on QA, d22 on PROD</li>
              </ul>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="deploymentTarget">Deployment Target Environment</Label>
            <Select
              value={data.deploymentTarget}
              onValueChange={(value) => onDataChange({ deploymentTarget: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select deployment target" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dev">Development (DEV)</SelectItem>
                <SelectItem value="qa">QA</SelectItem>
                <SelectItem value="staging">Staging</SelectItem>
                <SelectItem value="prod">Production (PROD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-4">Deployment Counter by Environment</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">DEV</p>
                  <p className="text-xl font-bold text-blue-600">d20</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">QA</p>
                  <p className="text-xl font-bold text-green-600">d21</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Staging</p>
                  <p className="text-xl font-bold text-yellow-600">d15</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">PROD</p>
                  <p className="text-xl font-bold text-red-600">d22</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Full version: {data.version} r10 d{data.deploymentTarget === 'dev' ? '20' : data.deploymentTarget === 'qa' ? '21' : data.deploymentTarget === 'staging' ? '15' : '22'}
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
