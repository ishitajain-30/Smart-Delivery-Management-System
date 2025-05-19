"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchPartners, updatePartner } from "@/lib/redux/slices/partnersSlice";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Edit,
  Eye,
  Filter,
  MapPin,
  Plus,
  Search,
  Star,
  XCircle,
} from "lucide-react";
import { PartnerForm } from "@/components/partner-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditPartnerDialog } from "@/components/edit-partner-dialog";
import { ViewPartnerDialog } from "@/components/view-partner-dialog";
import type { DeliveryPartner } from "@/types";

export default function PartnersPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { partners, metrics, loading } = useSelector(
    (state: RootState) => state.partners
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] =
    useState<DeliveryPartner | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const handleUpdatePartner = (partner: DeliveryPartner) => {
    dispatch(updatePartner(partner));
    setIsEditDialogOpen(false);
  };

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === null || partner.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header title="Partners" />
      <main className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search partners..."
                className="pl-8 w-full md:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New Partner</DialogTitle>
                <DialogDescription>
                  Fill in the details to register a new delivery partner
                </DialogDescription>
              </DialogHeader>
              <PartnerForm onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Active
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalActive}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (metrics.totalActive / (partners.length || 1)) * 100
                )}
                % of total partners
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Average Rating
              </CardTitle>
              <Star className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics.avgRating.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">
                Based on all partner ratings
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Top Areas</CardTitle>
              <MapPin className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {metrics.topAreas.map((area, index) => (
                  <Badge key={index} variant="secondary">
                    {area}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Delivery Partners</CardTitle>
              <Tabs defaultValue="all" className="w-full md:w-[300px]">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="all"
                    onClick={() => setStatusFilter(null)}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger
                    value="active"
                    onClick={() => setStatusFilter("active")}
                  >
                    Active
                  </TabsTrigger>
                  <TabsTrigger
                    value="inactive"
                    onClick={() => setStatusFilter("inactive")}
                  >
                    Inactive
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              Manage your delivery partners and their details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <p>Loading partners...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">Name</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2 hidden md:table-cell">
                        Areas
                      </th>
                      <th className="text-left py-3 px-2 hidden md:table-cell">
                        Current Load
                      </th>
                      <th className="text-left py-3 px-2">Rating</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPartners.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-4 text-center text-muted-foreground"
                        >
                          No partners found
                        </td>
                      </tr>
                    ) : (
                      filteredPartners.map((partner) => (
                        <tr key={partner._id} className="border-b">
                          <td className="py-3 px-2">
                            <div>
                              <div className="font-medium">{partner.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {partner.email}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <Badge
                              variant={
                                partner.status === "active"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {partner.status === "active" ? (
                                <CheckCircle2 className="mr-1 h-3 w-3" />
                              ) : (
                                <XCircle className="mr-1 h-3 w-3" />
                              )}
                              {partner.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-2 hidden md:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {partner.areas.map((area, index) => (
                                <Badge key={index} variant="outline">
                                  {area}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-2 hidden md:table-cell">
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                                <div
                                  className="bg-primary h-2.5 rounded-full"
                                  style={{
                                    width: `${
                                      (partner.currentLoad / 3) * 100
                                    }%`,
                                  }}
                                ></div>
                              </div>
                              <span>{partner.currentLoad}/3</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span>{partner.metrics.rating.toFixed(1)}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPartner(partner);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">Edit</span>
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPartner(partner);
                                  setIsViewDialogOpen(true);
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                <span className="hidden sm:inline">View</span>
                              </Button>
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

      {/* Edit Partner Dialog */}
      <EditPartnerDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        partner={selectedPartner}
        onUpdate={handleUpdatePartner}
      />

      {/* View Partner Dialog */}
      <ViewPartnerDialog
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
        partner={selectedPartner}
      />
    </div>
  );
}
