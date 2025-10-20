import { Plus, Globe, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const domains = [
  {
    id: "1",
    domain: "shop.example.com",
    app: "E-Commerce Platform",
    environment: "PROD",
    status: "active",
    ssl: "valid",
    lastVerified: "2 hours ago",
  },
  {
    id: "2",
    domain: "analytics-staging.example.com",
    app: "Analytics Dashboard",
    environment: "STAGING",
    status: "active",
    ssl: "valid",
    lastVerified: "1 day ago",
  },
  {
    id: "3",
    domain: "api.mobile.example.com",
    app: "Mobile API Gateway",
    environment: "PROD",
    status: "active",
    ssl: "valid",
    lastVerified: "3 hours ago",
  },
  {
    id: "4",
    domain: "test.example.com",
    app: "Admin Portal",
    environment: "DEV",
    status: "pending",
    ssl: "pending",
    lastVerified: "10 minutes ago",
  },
];

export default function Domains() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Domains</h1>
          <p className="text-muted-foreground">
            Manage custom domains and SSL certificates
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Domain
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Domains</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">SSL Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Domains</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Domain</TableHead>
                <TableHead>App</TableHead>
                <TableHead>Environment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SSL</TableHead>
                <TableHead>Last Verified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.map((domain) => (
                <TableRow key={domain.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{domain.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>{domain.app}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{domain.environment}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        domain.status === "active"
                          ? "bg-success text-success-foreground"
                          : "bg-warning text-warning-foreground"
                      }
                    >
                      {domain.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {domain.ssl === "valid" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-success" />
                          <span className="text-sm text-success">Valid</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-warning" />
                          <span className="text-sm text-warning">Pending</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {domain.lastVerified}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
