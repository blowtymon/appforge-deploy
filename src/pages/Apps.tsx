import { useState } from "react";
import { Plus, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppCard } from "@/components/apps/AppCard";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  {
    id: "5",
    name: "Payment Service",
    description: "Secure payment processing microservice",
    status: "live" as const,
    environment: "PROD",
    repository: "payment-service",
    domain: "payments.example.com",
    lastDeployment: "3 days ago",
    collaborators: 4,
  },
  {
    id: "6",
    name: "User Auth Service",
    description: "Centralized authentication and authorization",
    status: "live" as const,
    environment: "PROD",
    repository: "auth-service",
    domain: "auth.example.com",
    lastDeployment: "1 week ago",
    collaborators: 6,
  },
];

export default function Apps() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [envFilter, setEnvFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Applications</h1>
          <p className="text-muted-foreground">
            Manage all your applications in one place
          </p>
        </div>
        <Button onClick={() => navigate("/apps/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create App
        </Button>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search apps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="live">Live</SelectItem>
            <SelectItem value="deploying">Deploying</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={envFilter} onValueChange={setEnvFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Environment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Environments</SelectItem>
            <SelectItem value="dev">DEV</SelectItem>
            <SelectItem value="qa">QA</SelectItem>
            <SelectItem value="staging">STAGING</SelectItem>
            <SelectItem value="prod">PROD</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app.id} {...app} />
        ))}
      </div>
    </div>
  );
}
