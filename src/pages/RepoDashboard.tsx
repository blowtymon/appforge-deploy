import { useState } from "react";
import { Gitgraph, Mode, TemplateName } from "@gitgraph/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GitBranch, GitCommit, FileCode, User, Calendar, Search, Filter } from "lucide-react";
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

// Mock data
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedAuthor, setSelectedAuthor] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Repository Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Visualize repository activity, commits, and deployment history
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
            <GitCommit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCommits}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
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
            <p className="text-xs text-muted-foreground">Across all environments</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="commits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="commits">Commits</TabsTrigger>
          <TabsTrigger value="graph">Git Graph</TabsTrigger>
          <TabsTrigger value="visualization">Repo Visualization</TabsTrigger>
        </TabsList>

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
            </CardContent>
          </Card>

          {/* Commits Table */}
          <Card>
            <CardHeader>
              <CardTitle>Commit History</CardTitle>
              <CardDescription>
                {filteredCommits.length} commits found
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
                  {filteredCommits.map((commit) => (
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
                            {commit.deployments.map((dep, idx) => (
                              <Badge key={idx} variant="default" className="text-xs">
                                {dep.env}: {dep.version}
                              </Badge>
                            ))}
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
                              <h4 className="font-semibold mb-2">Files Changed:</h4>
                              <ul className="space-y-1">
                                {commit.files.map((file, idx) => (
                                  <li key={idx} className="text-sm flex items-center gap-2">
                                    <FileCode className="h-4 w-4 text-muted-foreground" />
                                    <code className="text-xs">{file}</code>
                                  </li>
                                ))}
                              </ul>
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
        </TabsContent>

        <TabsContent value="graph">
          <Card>
            <CardHeader>
              <CardTitle>Git Graph Visualization</CardTitle>
              <CardDescription>Visual representation of branch and commit history</CardDescription>
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
                    const main = gitgraph.branch("main");
                    main.commit("Initial commit");
                    main.commit("Add authentication module");
                    
                    const feature = gitgraph.branch("feature/dashboard");
                    feature.commit("Refactor user dashboard components");
                    
                    main.commit("Update API endpoints");
                    
                    const theme = gitgraph.branch("feature/theme");
                    theme.commit("Implement dark mode theme");
                    
                    main.merge(feature);
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
              <CardDescription>Visual representation of repository structure</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-96 bg-muted rounded-lg">
                <div className="text-center space-y-2">
                  <FileCode className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Repository visualization coming soon
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Will integrate with GitHub Next's repo-visualization
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
