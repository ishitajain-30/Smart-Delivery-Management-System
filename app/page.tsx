import { Header } from "@/components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  CheckCircle2,
  Clock,
  Package,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Dashboard" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Partners
              </CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Pending Orders
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">-3 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Deliveries Today
              </CardTitle>
              <Truck className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">36</div>
              <p className="text-xs text-muted-foreground">+8 from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Avg. Delivery Time
              </CardTitle>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28m</div>
              <p className="text-xs text-muted-foreground">
                -2m from yesterday
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="metrics">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="map">Active Orders Map</TabsTrigger>
              <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
            </TabsList>
            <Button size="sm">Run Assignment Algorithm</Button>
          </div>
          <TabsContent value="map" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Orders Map</CardTitle>
                <CardDescription>
                  Real-time view of all active orders and delivery partners
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Interactive map will be displayed here
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="metrics" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Partner Performance</CardTitle>
                  <CardDescription>
                    Top performing delivery partners
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Star className="w-4 h-4 text-primary" />
                          </div>
                          <span>John Doe</span>
                        </div>
                        <span className="font-medium">4.9</span>
                      </div>
                      <Progress value={98} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Star className="w-4 h-4 text-primary" />
                          </div>
                          <span>Jane Smith</span>
                        </div>
                        <span className="font-medium">4.8</span>
                      </div>
                      <Progress value={96} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Star className="w-4 h-4 text-primary" />
                          </div>
                          <span>Mike Johnson</span>
                        </div>
                        <span className="font-medium">4.7</span>
                      </div>
                      <Progress value={94} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Success Rate</CardTitle>
                  <CardDescription>
                    Success rate of order assignments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full border-8 border-primary flex items-center justify-center">
                        <span className="text-3xl font-bold">92%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>Successful</span>
                        </div>
                        <span>92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-yellow-500" />
                          <span>Retried</span>
                        </div>
                        <span>6%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-red-500" />
                          <span>Failed</span>
                        </div>
                        <span>2%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Recent Assignments</CardTitle>
            <CardDescription>
              Latest order assignments to delivery partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Order #</th>
                    <th className="text-left py-3 px-2">Partner</th>
                    <th className="text-left py-3 px-2">Area</th>
                    <th className="text-left py-3 px-2">Time</th>
                    <th className="text-left py-3 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-2">ORD-{1000 + i}</td>
                      <td className="py-3 px-2">Partner {i}</td>
                      <td className="py-3 px-2">Area {i}</td>
                      <td className="py-3 px-2">{i}0 minutes ago</td>
                      <td className="py-3 px-2">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            i % 3 === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : i % 3 === 1
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {i % 3 === 0
                            ? "Pending"
                            : i % 3 === 1
                            ? "Delivered"
                            : "In Progress"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
