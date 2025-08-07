import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Users, Mail, Phone, MapPin, Calendar, DollarSign, Package } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: "active" | "inactive";
  lastOrder: string;
}

export const CustomerManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [customers] = useState<Customer[]>([
    {
      id: "CUST-001",
      name: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      company: "TechCorp Solutions",
      location: "New York, NY",
      joinDate: "2023-06-15",
      totalOrders: 12,
      totalSpent: 45000,
      status: "active",
      lastOrder: "2024-01-18"
    },
    {
      id: "CUST-002",
      name: "Sarah Johnson",
      email: "sarah.j@greenmanufacturing.com",
      phone: "+1 (555) 987-6543",
      company: "Green Manufacturing",
      location: "Los Angeles, CA",
      joinDate: "2023-08-22",
      totalOrders: 8,
      totalSpent: 28500,
      status: "active",
      lastOrder: "2024-01-20"
    },
    {
      id: "CUST-003",
      name: "Michael Chen",
      email: "m.chen@innovatetech.com",
      phone: "+1 (555) 456-7890",
      company: "InnovateTech",
      location: "San Francisco, CA",
      joinDate: "2023-04-10",
      totalOrders: 15,
      totalSpent: 67800,
      status: "active",
      lastOrder: "2024-01-15"
    },
    {
      id: "CUST-004",
      name: "Emma Wilson",
      email: "emma.w@buildright.com",
      phone: "+1 (555) 321-0987",
      company: "BuildRight Construction",
      location: "Chicago, IL",
      joinDate: "2023-09-05",
      totalOrders: 5,
      totalSpent: 15200,
      status: "inactive",
      lastOrder: "2023-12-10"
    }
  ]);

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeCustomers = filteredCustomers.filter(c => c.status === "active");
  const inactiveCustomers = filteredCustomers.filter(c => c.status === "inactive");

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
  const averageOrderValue = totalRevenue / customers.reduce((sum, customer) => sum + customer.totalOrders, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Customer Management</h2>
        </div>
        <p className="text-muted-foreground">Manage your customer relationships and track performance</p>
      </div>

      {/* Customer Summary */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Customers</p>
                <p className="text-2xl font-bold">{totalCustomers}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Order Value</p>
                <p className="text-2xl font-bold">${Math.round(averageOrderValue).toLocaleString()}</p>
              </div>
              <Package className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Customers</p>
                <p className="text-2xl font-bold">{activeCustomers.length}</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="mb-8 shadow-soft">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers by name, email, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customer List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Customers ({filteredCustomers.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeCustomers.length})</TabsTrigger>
          <TabsTrigger value="inactive">Inactive ({inactiveCustomers.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {inactiveCustomers.map((customer) => (
            <CustomerCard key={customer.id} customer={customer} />
          ))}
        </TabsContent>
      </Tabs>

      {filteredCustomers.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No customers found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

const CustomerCard = ({ customer }: { customer: Customer }) => {
  return (
    <Card className="shadow-medium hover:shadow-strong transition-all duration-300 animate-slide-up">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <CardTitle className="text-xl">{customer.name}</CardTitle>
              <Badge variant={customer.status === "active" ? "default" : "secondary"}>
                {customer.status}
              </Badge>
            </div>
            <CardDescription className="mt-2">
              {customer.company}
            </CardDescription>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              ${customer.totalSpent.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              {customer.totalOrders} orders
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{customer.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{customer.location}</span>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Joined: {new Date(customer.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span>Last Order: {new Date(customer.lastOrder).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            View Profile
          </Button>
          <Button variant="outline" size="sm">
            Contact
          </Button>
          <Button variant="outline" size="sm">
            Order History
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};