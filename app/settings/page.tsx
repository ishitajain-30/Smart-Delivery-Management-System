"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Bell, Globe, Lock, MapPin, Save, User } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Settings" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <Tabs defaultValue="general">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent">
                <TabsTrigger value="general" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                  <User className="w-4 h-4 mr-2" />
                  General
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="areas" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                  <MapPin className="w-4 h-4 mr-2" />
                  Service Areas
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                  <Lock className="w-4 h-4 mr-2" />
                  Security
                </TabsTrigger>
                <TabsTrigger value="api" className="justify-start px-4 py-2 h-10 data-[state=active]:bg-muted">
                  <Globe className="w-4 h-4 mr-2" />
                  API Access
                </TabsTrigger>
              </TabsList>
            </div>
            <div className="flex-1">
              <TabsContent value="general" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>Manage your account settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Company Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company-name">Company Name</Label>
                          <Input id="company-name" defaultValue="Smart Delivery Inc." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-email">Email Address</Label>
                          <Input id="company-email" type="email" defaultValue="contact@smartdelivery.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-phone">Phone Number</Label>
                          <Input id="company-phone" defaultValue="+1 (555) 123-4567" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company-website">Website</Label>
                          <Input id="company-website" defaultValue="https://smartdelivery.com" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Address</h3>
                      <div className="space-y-2">
                        <Label htmlFor="address-line1">Address Line 1</Label>
                        <Input id="address-line1" defaultValue="123 Delivery Street" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address-line2">Address Line 2</Label>
                        <Input id="address-line2" defaultValue="Suite 456" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" defaultValue="San Francisco" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" defaultValue="CA" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" defaultValue="94105" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">System Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select defaultValue="america-los_angeles">
                            <SelectTrigger id="timezone">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="america-los_angeles">America/Los Angeles (UTC-08:00)</SelectItem>
                              <SelectItem value="america-new_york">America/New York (UTC-05:00)</SelectItem>
                              <SelectItem value="europe-london">Europe/London (UTC+00:00)</SelectItem>
                              <SelectItem value="asia-tokyo">Asia/Tokyo (UTC+09:00)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="date-format">Date Format</Label>
                          <Select defaultValue="mm-dd-yyyy">
                            <SelectTrigger id="date-format">
                              <SelectValue placeholder="Select date format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                              <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                              <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="notifications">Enable Notifications</Label>
                        <p className="text-sm text-muted-foreground">Receive notifications about system events</p>
                      </div>
                      <Switch
                        id="notifications"
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Channels</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                            disabled={!notificationsEnabled}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications in the browser</p>
                          </div>
                          <Switch
                            id="push-notifications"
                            checked={pushNotifications}
                            onCheckedChange={setPushNotifications}
                            disabled={!notificationsEnabled}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="sms-notifications">SMS Notifications</Label>
                            <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                          </div>
                          <Switch
                            id="sms-notifications"
                            checked={smsNotifications}
                            onCheckedChange={setSmsNotifications}
                            disabled={!notificationsEnabled}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Events</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>New Order Notifications</Label>
                            <p className="text-sm text-muted-foreground">When a new order is created</p>
                          </div>
                          <Switch defaultChecked disabled={!notificationsEnabled} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Assignment Notifications</Label>
                            <p className="text-sm text-muted-foreground">When an order is assigned to a partner</p>
                          </div>
                          <Switch defaultChecked disabled={!notificationsEnabled} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Status Change Notifications</Label>
                            <p className="text-sm text-muted-foreground">When an order status changes</p>
                          </div>
                          <Switch defaultChecked disabled={!notificationsEnabled} />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Partner Status Notifications</Label>
                            <p className="text-sm text-muted-foreground">When a partner's status changes</p>
                          </div>
                          <Switch defaultChecked disabled={!notificationsEnabled} />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="areas" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Service Areas</CardTitle>
                    <CardDescription>Manage delivery service areas and coverage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Active Service Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Downtown", "Uptown", "Midtown", "Westside", "Eastside", "Northside", "Southside"].map(
                          (area) => (
                            <Badge key={area} variant="outline" className="px-3 py-1 text-sm">
                              {area}
                              <button className="ml-2 text-muted-foreground hover:text-foreground">×</button>
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Add New Service Area</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="area-name">Area Name</Label>
                          <Input id="area-name" placeholder="Enter area name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="area-code">Area Code</Label>
                          <Input id="area-code" placeholder="Enter area code" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="area-description">Description</Label>
                        <Textarea id="area-description" placeholder="Enter area description" />
                      </div>
                      <div className="flex justify-end">
                        <Button>Add Service Area</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Service Area Map</h3>
                      <div className="aspect-[2/1] bg-muted rounded-md flex items-center justify-center">
                        <p className="text-muted-foreground">Service area map will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and authentication</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Change Password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <div className="flex justify-end">
                        <Button>Update Password</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Two-factor authentication is not enabled</AlertTitle>
                        <AlertDescription>
                          Add an extra layer of security to your account by enabling two-factor authentication.
                        </AlertDescription>
                      </Alert>
                      <div className="flex justify-end">
                        <Button variant="outline">Enable 2FA</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Session Management</h3>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Current Session</div>
                              <div className="text-sm text-muted-foreground">Chrome on Windows • San Francisco, CA</div>
                              <div className="text-sm text-muted-foreground">Started 2 hours ago</div>
                            </div>
                            <Badge>Active</Badge>
                          </div>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Previous Session</div>
                              <div className="text-sm text-muted-foreground">Safari on macOS • San Francisco, CA</div>
                              <div className="text-sm text-muted-foreground">2 days ago</div>
                            </div>
                            <Button variant="ghost" size="sm">
                              Revoke
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline">Revoke All Other Sessions</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="api" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>API Access</CardTitle>
                    <CardDescription>Manage API keys and access to the delivery system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Keys</h3>
                      <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Production API Key</div>
                              <div className="text-sm text-muted-foreground">Created on May 10, 2023</div>
                              <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                                sk_live_••••••••••••••••••••••••••••••
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Button variant="outline" size="sm">
                                Reveal
                              </Button>
                              <Button variant="outline" size="sm" className="block">
                                Revoke
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 border rounded-md">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Development API Key</div>
                              <div className="text-sm text-muted-foreground">Created on May 15, 2023</div>
                              <div className="mt-2 p-2 bg-muted rounded text-sm font-mono">
                                sk_test_••••••••••••••••••••••••••••••
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Button variant="outline" size="sm">
                                Reveal
                              </Button>
                              <Button variant="outline" size="sm" className="block">
                                Revoke
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Generate New API Key</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Webhooks</h3>
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input id="webhook-url" defaultValue="https://example.com/webhook" />
                      </div>
                      <div className="space-y-2">
                        <Label>Webhook Events</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <Switch id="order-created" defaultChecked />
                            <Label htmlFor="order-created">Order Created</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="order-updated" defaultChecked />
                            <Label htmlFor="order-updated">Order Updated</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="order-assigned" defaultChecked />
                            <Label htmlFor="order-assigned">Order Assigned</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="order-delivered" defaultChecked />
                            <Label htmlFor="order-delivered">Order Delivered</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch id="partner-status" defaultChecked />
                            <Label htmlFor="partner-status">Partner Status Changed</Label>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button>Save Webhook Settings</Button>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Documentation</h3>
                      <p className="text-sm text-muted-foreground">
                        Access our API documentation to integrate with the Smart Delivery Management System.
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline">View API Documentation</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
