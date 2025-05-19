"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/lib/redux/store"
import { fetchAssignments, fetchAssignmentMetrics, runAssignmentAlgorithm } from "@/lib/redux/slices/assignmentsSlice"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertCircle, CheckCircle2, Clock, RefreshCw, Truck, Users, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AssignmentsPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { activeAssignments, metrics, partners, loading } = useSelector((state: RootState) => state.assignments)

  useEffect(() => {
    dispatch(fetchAssignments())
    dispatch(fetchAssignmentMetrics())
  }, [dispatch])

  const handleRunAlgorithm = () => {
    dispatch(runAssignmentAlgorithm())
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Assignment Dashboard" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-semibold">Smart Assignment System</h2>
          <Button onClick={handleRunAlgorithm}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Run Assignment Algorithm
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Available Partners</CardTitle>
              <Users className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partners.available}</div>
              <p className="text-xs text-muted-foreground">Ready to accept new orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Busy Partners</CardTitle>
              <Truck className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partners.busy}</div>
              <p className="text-xs text-muted-foreground">Currently delivering orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Offline Partners</CardTitle>
              <Users className="w-4 h-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{partners.offline}</div>
              <p className="text-xs text-muted-foreground">Not available for delivery</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Metrics</CardTitle>
              <CardDescription>Performance metrics for the assignment system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Success Rate</span>
                  </div>
                  <span className="font-medium">{metrics.successRate}%</span>
                </div>
                <Progress value={metrics.successRate} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>Average Assignment Time</span>
                  </div>
                  <span className="font-medium">{metrics.averageTime}s</span>
                </div>
                <Progress value={Math.min((metrics.averageTime / 10) * 100, 100)} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-purple-500" />
                    <span>Total Assigned</span>
                  </div>
                  <span className="font-medium">{metrics.totalAssigned}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span>Failure Reasons</span>
                  </div>
                </div>
                <div className="space-y-1">
                  {metrics.failureReasons.map((reason, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span>{reason.reason}</span>
                      <span>{reason.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Assignments</CardTitle>
              <CardDescription>Currently active order assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center h-40">
                  <p>Loading assignments...</p>
                </div>
              ) : activeAssignments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
                  <XCircle className="w-8 h-8 mb-2" />
                  <p>No active assignments</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeAssignments.map((assignment) => (
                    <div key={assignment.orderId} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Truck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Order #{assignment.orderId.slice(-6)}</div>
                          <div className="text-sm text-muted-foreground">Partner #{assignment.partnerId.slice(-6)}</div>
                        </div>
                      </div>
                      <Badge
                        className={
                          assignment.status === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }
                      >
                        {assignment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Assignment History</CardTitle>
              <Tabs defaultValue="all" className="w-full md:w-[300px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="success">Success</TabsTrigger>
                  <TabsTrigger value="failed">Failed</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>History of order assignments and their outcomes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Order ID</th>
                    <th className="text-left py-3 px-2">Partner ID</th>
                    <th className="text-left py-3 px-2 hidden md:table-cell">Timestamp</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2 hidden md:table-cell">Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-2 font-medium">ORD-{1000 + i}</td>
                      <td className="py-3 px-2">PTR-{2000 + i}</td>
                      <td className="py-3 px-2 hidden md:table-cell">{new Date().toLocaleString()}</td>
                      <td className="py-3 px-2">
                        <Badge className={i % 3 === 0 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}>
                          {i % 3 === 0 ? "failed" : "success"}
                        </Badge>
                      </td>
                      <td className="py-3 px-2 hidden md:table-cell">{i % 3 === 0 ? "Partner unavailable" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
