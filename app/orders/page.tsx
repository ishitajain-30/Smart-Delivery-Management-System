"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/redux/store";
import {
  fetchOrders,
  setFilters,
  assignOrder,
  updateOrderStatus,
} from "@/lib/redux/slices/ordersSlice";
import { fetchPartners } from "@/lib/redux/slices/partnersSlice";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Edit,
  Eye,
  Filter,
  MapPin,
  Package,
  Plus,
  Search,
  User,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrderForm } from "@/components/order-form";
import { AssignOrderDialog } from "@/components/assign-order-dialog";
import { ViewOrderDialog } from "@/components/view-order-dialog";
import type { Order } from "@/types";

export default function OrdersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, filters, loading } = useSelector(
    (state: RootState) => state.orders
  );
  const { partners } = useSelector((state: RootState) => state.partners);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
    dispatch(fetchPartners());
  }, [dispatch]);

  const handleStatusFilter = (status: Order["status"] | null) => {
    setSelectedStatus(status);
    if (status) {
      dispatch(setFilters({ status: [status] }));
    } else {
      dispatch(setFilters({ status: [] }));
    }
  };

  const handleAssignOrder = (orderId: string, partnerId: string) => {
    dispatch(assignOrder({ orderId, partnerId }));
    setIsAssignDialogOpen(false);
  };

  const handleUpdateStatus = (orderId: string, status: Order["status"]) => {
    dispatch(updateOrderStatus({ id: orderId, status }));
    setIsViewDialogOpen(false);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === null || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "picked":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Orders" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search orders..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                  <span className="sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Filter Orders</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Status
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === null}
                  onCheckedChange={() => handleStatusFilter(null)}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "pending"}
                  onCheckedChange={() => handleStatusFilter("pending")}
                >
                  Pending
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "assigned"}
                  onCheckedChange={() => handleStatusFilter("assigned")}
                >
                  Assigned
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "picked"}
                  onCheckedChange={() => handleStatusFilter("picked")}
                >
                  Picked
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={selectedStatus === "delivered"}
                  onCheckedChange={() => handleStatusFilter("delivered")}
                >
                  Delivered
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Date filter</span>
            </Button>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new delivery order
                </DialogDescription>
              </DialogHeader>
              <OrderForm onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Orders
              </CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orders.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Badge className="bg-yellow-100 text-yellow-800">
                {orders.filter((o) => o.status === "pending").length}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  (orders.filter((o) => o.status === "pending").length /
                    (orders.length || 1)) *
                    100
                )}
                %
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <Badge className="bg-blue-100 text-blue-800">
                {
                  orders.filter(
                    (o) => o.status === "assigned" || o.status === "picked"
                  ).length
                }
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  (orders.filter(
                    (o) => o.status === "assigned" || o.status === "picked"
                  ).length /
                    (orders.length || 1)) *
                    100
                )}
                %
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Badge className="bg-green-100 text-green-800">
                {orders.filter((o) => o.status === "delivered").length}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(
                  (orders.filter((o) => o.status === "delivered").length /
                    (orders.length || 1)) *
                    100
                )}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Orders</CardTitle>
              <Tabs defaultValue="all" className="w-full md:w-[400px]">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger
                    value="all"
                    onClick={() => handleStatusFilter(null)}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="pending"
                    onClick={() => handleStatusFilter("pending")}
                  >
                    Pending
                  </TabsTrigger>
                  <TabsTrigger
                    value="in-progress"
                    onClick={() => handleStatusFilter("assigned")}
                  >
                    In Progress
                  </TabsTrigger>
                  <TabsTrigger
                    value="delivered"
                    onClick={() => handleStatusFilter("delivered")}
                  >
                    Delivered
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              Manage your orders and track their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <p>Loading orders...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Order #</th>
                      <th className="text-left py-3 px-2">Customer</th>
                      <th className="text-left py-3 px-2 hidden md:table-cell">
                        Area
                      </th>
                      <th className="text-left py-3 px-2 hidden md:table-cell">
                        Scheduled For
                      </th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2 hidden sm:table-cell">
                        Amount
                      </th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-4 text-center text-muted-foreground"
                        >
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order._id} className="border-b">
                          <td className="py-3 px-2 font-medium">
                            {order.orderNumber}
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-4 h-4 text-primary" />
                              </div>
                              <div>
                                <div className="font-medium">
                                  {order.customer.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {order.customer.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{order.area}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 hidden md:table-cell">
                            {order.scheduledFor}
                          </td>
                          <td className="py-3 px-2">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 font-medium hidden sm:table-cell">
                            ${order.totalAmount.toFixed(2)}
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">View</span>
                              </Button>
                              {order.status === "pending" && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setIsAssignDialogOpen(true);
                                  }}
                                >
                                  <Edit className="h-4 w-4 mr-1" />
                                  <span className="hidden sm:inline">
                                    Assign
                                  </span>
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Assign Order Dialog */}
      <AssignOrderDialog
        open={isAssignDialogOpen}
        onOpenChange={setIsAssignDialogOpen}
        order={selectedOrder}
        partners={partners.filter(
          (p) => p.status === "active" && p.currentLoad < 3
        )}
        onAssign={handleAssignOrder}
      />

      {/* View Order Dialog */}
      <ViewOrderDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
}
