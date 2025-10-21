import { Plus, Server, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const environments = [
  {
    id: "1",
    name: "Production",
    type: "PROD",
    status: "active",
    apps: 8,
    region: "us-east-1",
    lastDeployment: "2 hours ago",
  },
  {
    id: "2",
    name: "Staging",
    type: "STAGING",
    status: "active",
    apps: 5,
    region: "us-east-1",
    lastDeployment: "1 day ago",
  },
  {
    id: "3",
    name: "Development",
    type: "DEV",
    status: "active",
    apps: 12,
    region: "us-west-2",
    lastDeployment: "30 minutes ago",
  },
  {
    id: "4",
    name: "QA Testing",
    type: "QA",
    status: "inactive",
    apps: 3,
    region: "eu-west-1",
    lastDeployment: "1 week ago",
  },
];

export default function Environments() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Environments</h1>
          <p className="text-muted-foreground">
            Manage deployment environments and AWS configurations
          </p>
        </div>
        <Button onClick={() => navigate("/environments/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Add Environment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Environments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Deployments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AWS Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {environments.map((env) => (
          <Card key={env.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Server className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{env.name}</CardTitle>
                </div>
                <Badge
                  className={
                    env.status === "active"
                      ? "bg-success text-success-foreground"
                      : "bg-muted text-muted-foreground"
                  }
                >
                  {env.status}
                </Badge>
              </div>
              <Badge variant="outline">{env.type}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Apps Deployed</span>
                  <span className="font-medium">{env.apps}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">AWS Region</span>
                  <span className="font-medium">{env.region}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Deployment</span>
                  <span className="font-medium">{env.lastDeployment}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2 border-t border-border">
                <Button variant="outline" size="sm" className="flex-1">
                  <Activity className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button size="sm" className="flex-1">Configure</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
