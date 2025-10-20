import { Plus, TrendingUp, Activity, Server, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppCard } from "@/components/apps/AppCard";
import { useNavigate } from "react-router-dom";

const apps = [
  {
    id: "1",
    name: "E-Commerce Platform",
    description: "Modern online shopping experience with advanced features",
    status: "live" as const,
    environment: "PROD",
    repository: "ecommerce-platform",
    domain: "shop.example.com",
    lastDeployment: "2 hours ago",
    collaborators: 5,
  },
  {
    id: "2",
    name: "Analytics Dashboard",
    description: "Real-time data visualization and reporting system",
    status: "deploying" as const,
    environment: "STAGING",
    repository: "analytics-dash",
    domain: "analytics-staging.example.com",
    lastDeployment: "5 minutes ago",
    collaborators: 3,
  },
  {
    id: "3",
    name: "Mobile API Gateway",
    description: "Unified API layer for mobile applications",
    status: "live" as const,
    environment: "PROD",
    repository: "mobile-api",
    domain: "api.mobile.example.com",
    lastDeployment: "1 day ago",
    collaborators: 8,
  },
  {
    id: "4",
    name: "Admin Portal",
    description: "Internal management and configuration interface",
    status: "failed" as const,
    environment: "DEV",
    repository: "admin-portal",
    lastDeployment: "30 minutes ago",
    collaborators: 2,
  },
];

const stats = [
  {
    title: "Total Apps",
    value: "24",
    change: "+12%",
    icon: Activity,
    trend: "up" as const,
  },
  {
    title: "Active Deployments",
    value: "8",
    change: "+3",
    icon: TrendingUp,
    trend: "up" as const,
  },
  {
    title: "Environments",
    value: "15",
    change: "+2",
    icon: Server,
    trend: "up" as const,
  },
  {
    title: "Connected Domains",
    value: "32",
    change: "+5",
    icon: Globe,
    trend: "up" as const,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your applications, deployments, and infrastructure
          </p>
        </div>
        <Button onClick={() => navigate("/apps/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create App
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Recent Apps</h2>
          <Button variant="outline" onClick={() => navigate("/apps")}>
            View All
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      </div>
    </div>
  );
}
