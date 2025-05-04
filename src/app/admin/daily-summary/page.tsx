"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  CalendarIcon,
  ChevronDown,
  Clock,
  DollarSign,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DailySummaryPage() {
  const [timeRange, setTimeRange] = useState("today");
  const salesData = [
    { hour: "9AM", sales: 120 },
    { hour: "10AM", sales: 200 },
    { hour: "11AM", sales: 180 },
    { hour: "12PM", sales: 350 },
    { hour: "1PM", sales: 410 },
    { hour: "2PM", sales: 280 },
    { hour: "3PM", sales: 220 },
    { hour: "4PM", sales: 300 },
    { hour: "5PM", sales: 450 },
    { hour: "6PM", sales: 380 },
    { hour: "7PM", sales: 520 },
    { hour: "8PM", sales: 400 },
  ];

  // Mock data for category sales
  const categoryData = [
    { name: "Mains", value: 45 },
    { name: "Drinks", value: 25 },
    { name: "Starters", value: 15 },
    { name: "Desserts", value: 15 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Mock data for stats
  const stats = {
    totalSales: 3850,
    totalOrders: 42,
    averageOrder: 91.67,
    customers: 38,
  };

  // Mock data for upcoming reservations
  const upcomingReservations = [
    { id: 1, name: "John Smith", time: "7:30 PM", guests: 4, table: "Table 6" },
    {
      id: 2,
      name: "Sarah Johnson",
      time: "8:00 PM",
      guests: 2,
      table: "Table 8",
    },
    {
      id: 3,
      name: "Michael Brown",
      time: "8:15 PM",
      guests: 6,
      table: "Table 12",
    },
  ];

  return (
    <div className="p-4 md:p-6">
      {/* <div className="flex items-center mb-6">
        <Link href="/admin">
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to POS</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Daily Summary Report</h1>
      </div> */}

      <div className="flex justify-end items-center mb-4">
        {/* <h2 className="text-xl font-semibold">Performance Overview</h2> */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {timeRange === "today"
                ? "Today"
                : timeRange === "week"
                  ? "This Week"
                  : "This Month"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTimeRange("today")}>
              Today
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("week")}>
              This Week
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeRange("month")}>
              This Month
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
          <TabsTrigger
            value="overview"
            className="rounded-none bg-background h-full border-b-2 data-[state=active]:shadow-none border-transparent data-[state=active]:border-primary"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="reservations"
            className="rounded-none bg-background h-full border-b-2 data-[state=active]:shadow-none border-transparent data-[state=active]:border-primary"
          >
            Reservations
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="rounded-none bg-background h-full border-b-2 data-[state=active]:shadow-none border-transparent data-[state=active]:border-primary"
          >
            Recent Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Sales
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.totalSales.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Orders</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">
                  +12.5% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Order
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${stats.averageOrder.toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from yesterday
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Customers</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.customers}</div>
                <p className="text-xs text-muted-foreground">
                  +8.1% from yesterday
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales by Hour</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div>
                      <h4 className="font-medium">{reservation.name}</h4>
                      <div className="text-sm text-muted-foreground">
                        {reservation.guests} guests • {reservation.table}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{reservation.time}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                ))}

                <Button className="w-full">View All Reservations</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Order #1234</h4>
                    <div className="text-sm text-muted-foreground">
                      Table 2 • 4 items
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$87.50</div>
                    <div className="text-sm text-muted-foreground">
                      15 mins ago
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Order #1233</h4>
                    <div className="text-sm text-muted-foreground">
                      Table 7 • 3 items
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$64.25</div>
                    <div className="text-sm text-muted-foreground">
                      32 mins ago
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <h4 className="font-medium">Order #1232</h4>
                    <div className="text-sm text-muted-foreground">
                      Table 10 • 6 items
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">$125.00</div>
                    <div className="text-sm text-muted-foreground">
                      45 mins ago
                    </div>
                  </div>
                </div>

                <Button className="w-full">View All Orders</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
