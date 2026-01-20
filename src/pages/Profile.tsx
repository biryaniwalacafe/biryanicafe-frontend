import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/lib/store";
import { useLocation } from "wouter";
import { Package, MapPin, LogOut } from "lucide-react";
import { useEffect } from "react";

//todo: remove mock functionality
const mockOrders = [
  {
    id: "ORD001",
    date: "2024-11-05",
    items: "Chicken Biryani x2, Mango Lassi x1",
    total: "30.97",
    status: "Delivered",
  },
  {
    id: "ORD002",
    date: "2024-11-03",
    items: "Mutton Biryani x1, Gulab Jamun x1",
    total: "22.98",
    status: "Delivered",
  },
];

const mockAddresses = [
  {
    id: "1",
    label: "Home",
    street: "123 Main Street",
    city: "Cuisine City",
    state: "CC",
    zipCode: "12345",
    isDefault: true,
  },
  {
    id: "2",
    label: "Work",
    street: "456 Office Avenue",
    city: "Cuisine City",
    state: "CC",
    zipCode: "12346",
    isDefault: false,
  },
];

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/auth");
    }
  }, [isAuthenticated, setLocation]);

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="bg-card border-b border-card-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-serif text-5xl font-bold mb-2" data-testid="text-profile-name">
                  {user?.name}
                </h1>
                <p className="text-xl text-muted-foreground" data-testid="text-profile-email">
                  {user?.email}
                </p>
              </div>
              <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <CardTitle>Order History</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockOrders.map((order) => (
                    <Card key={order.id} className="hover-elevate">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold" data-testid={`text-order-${order.id}`}>
                              {order.id}
                            </p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                          </div>
                          <Badge>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{order.items}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-primary">${order.total}</span>
                          <Button variant="outline" size="sm" data-testid={`button-reorder-${order.id}`}>
                            Reorder
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <CardTitle>Saved Addresses</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" data-testid="button-add-address">
                      Add New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAddresses.map((address) => (
                    <Card key={address.id} className="hover-elevate">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <p className="font-semibold" data-testid={`text-address-${address.id}`}>
                              {address.label}
                            </p>
                            {address.isDefault && (
                              <Badge variant="secondary">Default</Badge>
                            )}
                          </div>
                          <Button variant="ghost" size="sm" data-testid={`button-edit-${address.id}`}>
                            Edit
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {address.street}<br />
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
