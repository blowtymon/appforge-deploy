import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GitBranch,
  Globe,
  Settings,
  Activity,
  Server,
  Users,
  ExternalLink,
  Play,
} from "lucide-react";

export default function AppDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">E-Commerce Platform</h1>
            <Badge className="bg-success text-success-foreground">Live</Badge>
          </div>
          <p className="text-muted-foreground">
            Modern online shopping experience with advanced features
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Site
          </Button>
          <Button>
            <Play className="h-4 w-4 mr-2" />
            Deploy
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repository</CardTitle>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">ecommerce-platform</div>
            <p className="text-xs text-muted-foreground">main branch</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Domain</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold truncate">shop.example.com</div>
            <p className="text-xs text-muted-foreground">SSL Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Environment</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">PROD</div>
            <p className="text-xs text-muted-foreground">AWS us-east-1</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collaborators</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">5 members</div>
            <p className="text-xs text-muted-foreground">3 roles</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environments">Environments</TabsTrigger>
          <TabsTrigger value="deployments">Deployments</TabsTrigger>
          <TabsTrigger value="repository">Repository</TabsTrigger>
          <TabsTrigger value="domains">Domains</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: "Deployment completed",
                    env: "PROD",
                    time: "2 hours ago",
                    user: "John Doe",
                  },
                  {
                    action: "Branch merged",
                    env: "main",
                    time: "3 hours ago",
                    user: "Jane Smith",
                  },
                  {
                    action: "Environment created",
                    env: "STAGING",
                    time: "1 day ago",
                    user: "System",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.env} • {activity.user}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environments">
          <Card>
            <CardHeader>
              <CardTitle>Environments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Environment configuration and status</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployments">
          <Card>
            <CardHeader>
              <CardTitle>Deployment History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">View all deployments and build logs</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="repository">
          <Card>
            <CardHeader>
              <CardTitle>Repository Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">GitHub repository information and activity</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domains">
          <Card>
            <CardHeader>
              <CardTitle>Domain Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure custom domains and SSL certificates</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>App Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Configure app features and preferences</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
