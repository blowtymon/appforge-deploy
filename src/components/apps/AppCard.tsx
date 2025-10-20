import { MoreVertical, GitBranch, Globe, Users } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface AppCardProps {
  id: string;
  name: string;
  description: string;
  status: "live" | "deploying" | "failed" | "inactive";
  environment: string;
  repository: string;
  domain?: string;
  lastDeployment: string;
  collaborators: number;
}

export function AppCard({
  id,
  name,
  description,
  status,
  environment,
  repository,
  domain,
  lastDeployment,
  collaborators,
}: AppCardProps) {
  const navigate = useNavigate();

  const statusColors = {
    live: "bg-success text-success-foreground",
    deploying: "bg-warning text-warning-foreground",
    failed: "bg-destructive text-destructive-foreground",
    inactive: "bg-muted text-muted-foreground",
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/apps/${id}`)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1 flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Deploy</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <Badge className={statusColors[status]}>{status}</Badge>
          <Badge variant="outline">{environment}</Badge>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <GitBranch className="h-4 w-4" />
            <span>{repository}</span>
          </div>
          {domain && (
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="truncate">{domain}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{collaborators} collaborators</span>
            </div>
            <span className="text-xs">{lastDeployment}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
