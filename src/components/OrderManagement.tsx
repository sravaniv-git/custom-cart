import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingCart, Package, Calendar, DollarSign, Truck, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface Order {
  id: string;
  products: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  supplier: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  total: number;
  orderDate: string;
  expectedDelivery: string;
}

export const OrderManagement = () => {
  const [orders] = useState<Order[]>([
    {
      id: "ORD-001",
      products: [
        { name: "Industrial Steel Pipes", quantity: 50, price: 120.00 },
        { name: "Electronic Components Kit", quantity: 10, price: 85.00 }
      ],
      supplier: "SteelCorp Industries",
      status: "shipped",
      total: 6850.00,
      orderDate: "2024-01-15",
      expectedDelivery: "2024-01-22"
    },
    {
      id: "ORD-002",
      products: [
        { name: "Organic Cotton Fabric", quantity: 100, price: 15.50 }
      ],
      supplier: "GreenFiber Co.",
      status: "confirmed",
      total: 1550.00,
      orderDate: "2024-01-18",
      expectedDelivery: "2024-01-25"
    },
    {
      id: "ORD-003",
      products: [
        { name: "Pharmaceutical Grade Bottles", quantity: 500, price: 2.50 }
      ],
      supplier: "MedPack Solutions",
      status: "pending",
      total: 1250.00,
      orderDate: "2024-01-20",
      expectedDelivery: "2024-01-28"
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "confirmed":
        return <CheckCircle className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <Package className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary";
      case "confirmed":
        return "default";
      case "shipped":
        return "default";
      case "delivered":
        return "default";
      default:
        return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-warning";
      case "confirmed":
        return "text-primary";
      case "shipped":
        return "text-primary";
      case "delivered":
        return "text-success";
      default:
        return "text-muted-foreground";
    }
  };

  const ordersByStatus = {
    all: orders,
    pending: orders.filter(order => order.status === "pending"),
    confirmed: orders.filter(order => order.status === "confirmed"),
    shipped: orders.filter(order => order.status === "shipped"),
    delivered: orders.filter(order => order.status === "delivered")
  };

  const totalValue = orders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="max-w-7xl mx-auto p-6 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <ShoppingCart className="h-8 w-8 text-primary" />
          <h2 className="text-3xl font-bold text-foreground">Order Management</h2>
        </div>
        <p className="text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Order Summary */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{orders.length}</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{ordersByStatus.pending.length}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shipped</p>
                <p className="text-2xl font-bold">{ordersByStatus.shipped.length}</p>
              </div>
              <Truck className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="shipped">Shipped</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>

        {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
          <TabsContent key={status} value={status} className="space-y-4">
            {statusOrders.map((order) => (
              <Card key={order.id} className="shadow-medium animate-slide-up">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>Order {order.id}</span>
                        <Badge 
                          variant={getStatusVariant(order.status)}
                          className={`flex items-center space-x-1 ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="capitalize">{order.status}</span>
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-2">
                        Supplier: {order.supplier}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${order.total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    {/* Products */}
                    <div className="space-y-2">
                      <h4 className="font-semibold">Products:</h4>
                      {order.products.map((product, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-border last:border-b-0">
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <span className="text-muted-foreground ml-2">
                              × {product.quantity}
                            </span>
                          </div>
                          <span className="font-medium">
                            ${(product.price * product.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Order Date: {new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Truck className="h-4 w-4 text-muted-foreground" />
                        <span>Expected: {new Date(order.expectedDelivery).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === "pending" && (
                        <Button variant="destructive" size="sm">
                          Cancel Order
                        </Button>
                      )}
                      {order.status === "shipped" && (
                        <Button size="sm">
                          Track Shipment
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {statusOrders.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p className="text-muted-foreground">
                    {status === "all" ? "You haven't placed any orders yet" : `No ${status} orders`}
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};