import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Gitgraph, Mode, TemplateName } from "@gitgraph/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GitBranch, GitCommit, FileCode, User, Calendar, Search, Plus, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Commit {
  id: string;
  hash: string;
  author: string;
  date: string;
  message: string;
  branch: string;
  filesChanged: number;
  deployments: { env: string; version: string }[];
  files: string[];
}

interface Repository {
  id: string;
  name: string;
  url: string;
  visibility: "public" | "private";
  createdAt: string;
  lastCommit: string;
  apps: string[];
  branches: number;
  commits: number;
}

// Mock data
const mockRepos: Repository[] = [
  {
    id: "1",
    name: "my-first-repo",
    url: "github.com/user/my-first-repo",
    visibility: "private",
    createdAt: "2025-01-10",
    lastCommit: "2025-01-15",
    apps: ["Dashboard App", "Admin Portal"],
    branches: 3,
    commits: 45,
  },
  {
    id: "2",
    name: "dashboard-app",
    url: "github.com/user/dashboard-app",
    visibility: "public",
    createdAt: "2025-01-05",
    lastCommit: "2025-01-14",
    apps: ["Analytics Dashboard"],
    branches: 5,
    commits: 67,
  },
  {
    id: "3",
    name: "ecommerce-site",
    url: "github.com/user/ecommerce-site",
    visibility: "private",
    createdAt: "2024-12-20",
    lastCommit: "2025-01-13",
    apps: ["Store Frontend", "Store Admin"],
    branches: 4,
    commits: 89,
  },
];

const mockCommits: Commit[] = [
  {
    id: "1",
    hash: "a3f4c21",
    author: "John Doe",
    date: "2025-01-15",
    message: "Add authentication module",
    branch: "main",
    filesChanged: 8,
    deployments: [
      { env: "PROD", version: "v1.2 c25" },
      { env: "STAGING", version: "v1.2 c24" }
    ],
    files: ["src/auth/login.tsx", "src/auth/register.tsx", "src/api/auth.ts"]
  },
  {
    id: "2",
    hash: "b7e9d32",
    author: "AI Assistant",
    date: "2025-01-14",
    message: "Refactor user dashboard components",
    branch: "feature/dashboard",
    filesChanged: 12,
    deployments: [{ env: "DEV", version: "v1.2 c23" }],
    files: ["src/components/dashboard/stats.tsx", "src/components/dashboard/chart.tsx"]
  },
  {
    id: "3",
    hash: "c4d8f45",
    author: "Jane Smith",
    date: "2025-01-13",
    message: "Update API endpoints for user management",
    branch: "main",
    filesChanged: 5,
    deployments: [{ env: "QA", version: "v1.1 c22" }],
    files: ["src/api/users.ts", "src/types/user.ts"]
  },
  {
    id: "4",
    hash: "d9a2b67",
    author: "AI Assistant",
    date: "2025-01-12",
    message: "Implement dark mode theme",
    branch: "feature/theme",
    filesChanged: 15,
    deployments: [],
    files: ["src/index.css", "tailwind.config.ts", "src/components/theme-provider.tsx"]
  },
];

export default function RepoDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [groupBy, setGroupBy] = useState("none");
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);
  const [repoSearchQuery, setRepoSearchQuery] = useState("");
  const [isGithubConnected] = useState(true); // This should come from global state/context

  const branches = ["all", ...Array.from(new Set(mockCommits.map(c => c.branch)))];
  const authors = ["all", ...Array.from(new Set(mockCommits.map(c => c.author)))];

  const filteredCommits = mockCommits
    .filter(commit => {
      const matchesSearch = commit.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          commit.hash.includes(searchQuery) ||
                          commit.author.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBranch = selectedBranch === "all" || commit.branch === selectedBranch;
      const matchesAuthor = selectedAuthor === "all" || commit.author === selectedAuthor;
      return matchesSearch && matchesBranch && matchesAuthor;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "files") return b.filesChanged - a.filesChanged;
      return 0;
    });

  const totalCommits = mockCommits.length;
  const totalDeployments = mockCommits.reduce((acc, c) => acc + c.deployments.length, 0);
  const activeBranches = branches.length - 1;

  // Calculate deployments per environment
  const deploymentsByEnv = mockCommits.reduce((acc, commit) => {
    commit.deployments.forEach(dep => {
      if (!acc[dep.env]) acc[dep.env] = 0;
      acc[dep.env]++;
    });
    return acc;
  }, {} as Record<string, number>);

  // Group commits based on selection
  const groupedCommits = groupBy === "none" 
    ? { "All Commits": filteredCommits }
    : filteredCommits.reduce((acc, commit) => {
        const key = groupBy === "branch" ? commit.branch 
                  : groupBy === "author" ? commit.author 
                  : commit.date;
        if (!acc[key]) acc[key] = [];
        acc[key].push(commit);
        return acc;
      }, {} as Record<string, Commit[]>);

  const filteredRepos = mockRepos.filter((repo) =>
    repo.name.toLowerCase().includes(repoSearchQuery.toLowerCase()) ||
    repo.apps.some((app) => app.toLowerCase().includes(repoSearchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Repository Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Visualize repository activity, commits, and deployment history
          </p>
        </div>
        
        <Card className="w-fit">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">GitHub Status</p>
                  {isGithubConnected ? (
                    <Badge variant="default" className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Not Connected</Badge>
                  )}
                </div>
                {isGithubConnected ? (
                  <p className="text-xs text-muted-foreground">Last sync: 2 minutes ago</p>
                ) : (
                  <Link to="/settings" className="text-xs text-primary hover:underline">
                    Connect in Settings
                  </Link>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCommits}</div>
            <p className="text-xs text-muted-foreground">Auto-incremented</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Branches</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBranches}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deployments</CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeployments}</div>
            <p className="text-xs text-muted-foreground">All environments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">By Environment</CardTitle>
            <FileCode className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {Object.entries(deploymentsByEnv).map(([env, count]) => (
                <div key={env} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{env}:</span>
                  <span className="font-medium">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="repos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="repos">Repositories</TabsTrigger>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="graph">Git Graph</TabsTrigger>
          <TabsTrigger value="visualization">Repo Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="repos" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search repositories or apps..."
                value={repoSearchQuery}
                onChange={(e) => setRepoSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => navigate("/repository/create")}>
              <Plus className="h-4 w-4 mr-2" />
              Create Repository
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Repositories</CardTitle>
              <CardDescription>
                {filteredRepos.length} repositories found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Repository</TableHead>
                    <TableHead>Visibility</TableHead>
                    <TableHead>Associated Apps</TableHead>
                    <TableHead>Branches</TableHead>
                    <TableHead>Commits</TableHead>
                    <TableHead>Last Commit</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRepos.map((repo) => (
                    <TableRow key={repo.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            <GitBranch className="h-4 w-4" />
                            {repo.name}
                          </div>
                          <div className="text-xs text-muted-foreground">{repo.url}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={repo.visibility === "public" ? "default" : "secondary"}>
                          {repo.visibility}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {repo.apps.map((app, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{repo.branches}</TableCell>
                      <TableCell>{repo.commits}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{repo.lastCommit}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commits" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Filter and sort commit history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search commits..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>

                <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Branch" />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.map(branch => (
                      <SelectItem key={branch} value={branch}>
                        {branch === "all" ? "All Branches" : branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Author" />
                  </SelectTrigger>
                  <SelectContent>
                    {authors.map(author => (
                      <SelectItem key={author} value={author}>
                        {author === "all" ? "All Authors" : author}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="files">Files Changed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-2">
                <label className="text-sm font-medium mb-2 block">Group By</label>
                <Select value={groupBy} onValueChange={setGroupBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Group by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="branch">Branch</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Commits Table */}
          <div className="space-y-4">
            {Object.entries(groupedCommits).map(([groupName, commits]) => (
              <Card key={groupName}>
                <CardHeader>
                  <CardTitle>
                    {groupBy === "none" ? "Commit History" : `${groupName}`}
                  </CardTitle>
                  <CardDescription>
                    {commits.length} commit{commits.length !== 1 ? 's' : ''} 
                    {groupBy !== "none" && ` in this ${groupBy}`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Hash</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Branch</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Files</TableHead>
                        <TableHead>Deployments</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {commits.map((commit) => (
                        <>
                          <TableRow key={commit.id}>
                            <TableCell className="font-mono text-xs">{commit.hash}</TableCell>
                            <TableCell className="font-medium">{commit.message}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span className="text-sm">{commit.author}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{commit.branch}</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm">{commit.date}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">{commit.filesChanged} files</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {commit.deployments.length === 0 ? (
                                  <span className="text-xs text-muted-foreground">No deployments</span>
                                ) : (
                                  commit.deployments.map((dep, idx) => (
                                    <Badge key={idx} variant="default" className="text-xs">
                                      {dep.env}: {dep.version}
                                    </Badge>
                                  ))
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setExpandedCommit(expandedCommit === commit.id ? null : commit.id)}
                              >
                                {expandedCommit === commit.id ? "Hide" : "Files"}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expandedCommit === commit.id && (
                            <TableRow>
                              <TableCell colSpan={8} className="bg-muted/50">
                                <div className="py-4">
                                  <h4 className="font-semibold mb-2">Files Changed ({commit.filesChanged}):</h4>
                                  <ul className="space-y-1">
                                    {commit.files.map((file, idx) => (
                                      <li key={idx} className="text-sm flex items-center gap-2">
                                        <FileCode className="h-4 w-4 text-muted-foreground" />
                                        <code className="text-xs bg-muted px-1 py-0.5 rounded">{file}</code>
                                      </li>
                                    ))}
                                  </ul>
                                  {commit.deployments.length > 0 && (
                                    <div className="mt-4">
                                      <h4 className="font-semibold mb-2">Deployment History:</h4>
                                      <div className="flex flex-wrap gap-2">
                                        {commit.deployments.map((dep, idx) => (
                                          <div key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                                            <span className="font-medium">{dep.env}</span>: {dep.version}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>Git Graph Visualization</CardTitle>
              <CardDescription>
                Visual representation of branch and commit history using{" "}
                <a 
                  href="https://www.nicoespeon.com/gitgraph.js/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  gitgraph.js
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-background border rounded-lg p-4 overflow-auto">
                <Gitgraph
                  options={{
                    mode: Mode.Compact,
                    template: TemplateName.Metro,
                  }}
                >
                  {(gitgraph) => {
                    // Create branches based on actual commits
                    const branches: Record<string, any> = {};
                    
                    // Create main branch
                    branches["main"] = gitgraph.branch("main");
                    
                    // Process commits to build graph dynamically
                    mockCommits
                      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                      .forEach(commit => {
                        // Create branch if it doesn't exist
                        if (!branches[commit.branch]) {
                          branches[commit.branch] = gitgraph.branch(commit.branch);
                        }
                        
                        // Add commit to branch
                        branches[commit.branch].commit({
                          subject: commit.message,
                          author: commit.author,
                          hash: commit.hash,
                        });
                      });
                    
                    // Merge feature branches back to main
                    Object.keys(branches).forEach(branchName => {
                      if (branchName !== "main" && Math.random() > 0.5) {
                        branches["main"].merge(branches[branchName]);
                      }
                    });
                  }}
                </Gitgraph>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visualization">
          <Card>
            <CardHeader>
              <CardTitle>Repository Visualization</CardTitle>
              <CardDescription>
                Visual representation of repository structure using{" "}
                <a 
                  href="https://githubnext.com/projects/repo-visualization/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub Next Repo Visualization
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-96 bg-muted rounded-lg border-2 border-dashed">
                <div className="text-center space-y-4 p-6">
                  <FileCode className="h-16 w-16 mx-auto text-muted-foreground" />
                  <div>
                    <p className="text-lg font-medium text-foreground mb-2">
                      Repository Visualization
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md">
                      This will integrate with GitHub Next's repo-visualization tool to show
                      an interactive 3D visualization of your repository structure, file sizes,
                      and recent changes.
                    </p>
                  </div>
                  <Button variant="outline" asChild>
                    <a 
                      href="https://githubnext.com/projects/repo-visualization/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Learn More
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
