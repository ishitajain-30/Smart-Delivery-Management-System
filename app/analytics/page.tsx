"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, Users, Package, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Analytics" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-semibold">Performance Metrics</h2>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 Hours</SelectItem>
                <SelectItem value="7d">Last 7 Days</SelectItem>
                <SelectItem value="30d">Last 30 Days</SelectItem>
                <SelectItem value="90d">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Date range</span>
            </Button>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download report</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-muted-foreground">+12% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
              <Users className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+2 from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Delivery Success Rate</CardTitle>
              <Package className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.2%</div>
              <p className="text-xs text-muted-foreground">+0.5% from previous period</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Avg. Delivery Time</CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28m</div>
              <p className="text-xs text-muted-foreground">-2m from previous period</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-4 md:w-[400px]">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="areas">Areas</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Trends</CardTitle>
                <CardDescription>Order volume and status distribution over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[2/1] bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Order trend chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Status Distribution</CardTitle>
                  <CardDescription>Current distribution of order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                        </div>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>
                        </div>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-purple-100 text-purple-800">Picked</Badge>
                        </div>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-800">Delivered</Badge>
                        </div>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Order Value Analysis</CardTitle>
                  <CardDescription>Average order value by area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Downtown</span>
                        <span className="font-medium">$42.50</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Uptown</span>
                        <span className="font-medium">$38.75</span>
                      </div>
                      <Progress value={77} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Midtown</span>
                        <span className="font-medium">$35.20</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Westside</span>
                        <span className="font-medium">$32.80</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Eastside</span>
                        <span className="font-medium">$30.15</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="partners" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Partner Performance</CardTitle>
                <CardDescription>Performance metrics for delivery partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[2/1] bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Partner performance chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Top Performing Partners</CardTitle>
                  <CardDescription>Based on delivery time and ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">Partner {i}</div>
                            <div className="text-sm text-muted-foreground">{6 - i} areas covered</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{5.0 - i * 0.1} ★</div>
                          <div className="text-sm text-muted-foreground">{30 - i * 2}m avg. time</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Partner Availability</CardTitle>
                  <CardDescription>Current partner status distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center py-8">
                    <div className="w-48 h-48 rounded-full border-8 border-primary relative flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl font-bold">24</div>
                          <div className="text-sm text-muted-foreground">Total Partners</div>
                        </div>
                      </div>
                      <div
                        className="absolute -top-1 -right-1 w-16 h-16 rounded-full bg-green-100 border-4 border-background flex items-center justify-center"
                        style={{ transform: "translate(25%, -25%)" }}
                      >
                        <div className="text-center">
                          <div className="text-sm font-bold text-green-800">14</div>
                          <div className="text-xs text-green-800">Active</div>
                        </div>
                      </div>
                      <div
                        className="absolute -bottom-1 -right-1 w-16 h-16 rounded-full bg-yellow-100 border-4 border-background flex items-center justify-center"
                        style={{ transform: "translate(25%, 25%)" }}
                      >
                        <div className="text-center">
                          <div className="text-sm font-bold text-yellow-800">7</div>
                          <div className="text-xs text-yellow-800">Busy</div>
                        </div>
                      </div>
                      <div
                        className="absolute -bottom-1 -left-1 w-16 h-16 rounded-full bg-gray-100 border-4 border-background flex items-center justify-center"
                        style={{ transform: "translate(-25%, 25%)" }}
                      >
                        <div className="text-center">
                          <div className="text-sm font-bold text-gray-800">3</div>
                          <div className="text-xs text-gray-800">Offline</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="assignments" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Assignment Success Rate</CardTitle>
                <CardDescription>Success rate of order assignments over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[2/1] bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Assignment success rate chart will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Failures</CardTitle>
                  <CardDescription>Reasons for assignment failures</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Partner unavailable</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Area not covered</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Load capacity exceeded</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Outside shift hours</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Other reasons</span>
                        <span>5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Metrics</CardTitle>
                  <CardDescription>Key performance indicators for assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Success Rate</div>
                        <div className="text-2xl font-bold">92.5%</div>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center">
                        <span className="text-green-500 font-bold">92.5%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Average Assignment Time</div>
                        <div className="text-2xl font-bold">3.2s</div>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-blue-500 flex items-center justify-center">
                        <span className="text-blue-500 font-bold">3.2s</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">Retry Rate</div>
                        <div className="text-2xl font-bold">4.8%</div>
                      </div>
                      <div className="w-16 h-16 rounded-full border-4 border-yellow-500 flex items-center justify-center">
                        <span className="text-yellow-500 font-bold">4.8%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="areas" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Area Coverage</CardTitle>
                <CardDescription>Order and partner distribution by area</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[2/1] bg-muted rounded-md flex items-center justify-center">
                  <p className="text-muted-foreground">Area coverage map will be displayed here</p>
                </div>
              </CardContent>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Volume by Area</CardTitle>
                  <CardDescription>Number of orders per area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Downtown</span>
                        <span>32%</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Uptown</span>
                        <span>24%</span>
                      </div>
                      <Progress value={24} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Midtown</span>
                        <span>18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Westside</span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Eastside</span>
                        <span>8%</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Other Areas</span>
                        <span>6%</span>
                      </div>
                      <Progress value={6} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Partner Coverage</CardTitle>
                  <CardDescription>Number of partners per area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { area: "Downtown", partners: 8, coverage: 100 },
                      { area: "Uptown", partners: 6, coverage: 75 },
                      { area: "Midtown", partners: 5, coverage: 62 },
                      { area: "Westside", partners: 4, coverage: 50 },
                      { area: "Eastside", partners: 3, coverage: 38 },
                      { area: "Northside", partners: 2, coverage: 25 },
                      { area: "Southside", partners: 2, coverage: 25 },
                    ].map((item) => (
                      <div key={item.area} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <div className="font-medium">{item.area}</div>
                          <div className="text-sm text-muted-foreground">{item.partners} partners</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${item.coverage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{item.coverage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
