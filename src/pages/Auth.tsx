import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import api from "@/lib/api";
import { Loader2, RefreshCw } from "lucide-react";

// --- UPDATED INTERFACES ---
interface Profile {
  name: string;
  email: string;
  phone?: string;
}

interface OrderItem {
  menu_item_name: string;
  quantity: number;
  price: string;
  customizations: { groupName: string; selection: string }[];
}

interface Order {
  order_id: string;
  total_amount: string;
  status: string;
  created_at: string;
  additional_notes: string;
  items: OrderItem[];
}
declare global {
  interface Window {
    google?: any;
  }
}
export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { user, login, logout, register, changePassword, setUser } =
    useAuthStore();
  const [loginSignupTab, setLoginSignupTab] = useState("login");
  // 1. Read the 'tab' parameter from the URL when the page loads.
  const searchParams = new URLSearchParams(window.location.search);
  const initialTab = searchParams.get("tab") || "profile"; // Default to "profile" if not provided

  // 2. Create state to manage the active tab, initialized from the URL.
  const [activeTab, setActiveTab] = useState(initialTab);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]); // State for holding orders
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [firstTimeProfile, setFirstTimeProfile] = useState(false);
  const [authProvider, setAuthProvider] = useState<string | null>(null);
  const googleLoginButtonRef = useRef<HTMLDivElement>(null);
  const googleSignupButtonRef = useRef<HTMLDivElement>(null);
  const client_id =
    "865250496596-q6lkjfadvdh8dvf53sfk10s8bdtg09ck.apps.googleusercontent.com";

  //const API_URL = "http://localhost:8000/api";
  const API_URL = import.meta.env.VITE_API_URL;

  const axiosAuth = axios.create({ baseURL: API_URL });
  const [isRefreshing, setIsRefreshing] = useState(false);

  axiosAuth.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useAuthStore.getState().accessToken;
      if (token) {
        if (!config.headers) config.headers = new AxiosHeaders();
        else if (!(config.headers instanceof AxiosHeaders))
          config.headers = new AxiosHeaders(config.headers);
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleGoogleResponse = async (response: any) => {
    try {
      const token = response.credential;
      const res = await axios.post(`${API_URL}/auth/google-login/`, { token });

      const { user, access, refresh } = res.data;
      setUser(user, access, refresh);
      localStorage.setItem("authProvider", "google");
      setAuthProvider("google");

      toast({
        title: "Logged in with Google!",
        description: `Welcome, ${user.name || user.email}!`,
      });
    } catch (err: any) {
      toast({
        title: "Google login failed",
        description: "Could not sign you in with Google. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google) {
        clearInterval(interval);

        window.google.accounts.id.initialize({
          client_id,
          callback: handleGoogleResponse,
        });

        // Trigger re-render for the current tab
        if (loginSignupTab === "login" && googleLoginButtonRef.current) {
          window.google.accounts.id.renderButton(googleLoginButtonRef.current, {
            theme: "outline",
            size: "large",
            text: "continue_with",
          });
        }
        if (loginSignupTab === "signup" && googleSignupButtonRef.current) {
          window.google.accounts.id.renderButton(
            googleSignupButtonRef.current,
            {
              theme: "outline",
              size: "large",
              text: "signup_with",
            }
          );
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [loginSignupTab]);

  useEffect(() => {
    if (!window.google) {
      console.error("Google script not loaded.");
      return;
    }

    window.google.accounts.id.initialize({
      client_id,
      callback: async (response: any) => {
        try {
          const token = response.credential;
          const res = await axios.post(`${API_URL}/auth/google-login/`, {
            token,
          });
          const { user, access, refresh } = res.data;

          setUser(user, access, refresh);
          localStorage.setItem("authProvider", "google");
          setAuthProvider("google");

          toast({
            title: "Logged in with Google!",
            description: `Welcome, ${user.name || user.email}!`,
          });
        } catch (err: any) {
          toast({
            title: "Google login failed",
            description: "Could not sign you in with Google. Please try again.",
            variant: "destructive",
          });
        }
      },
    });
  }, []);

  useEffect(() => {
    const provider = localStorage.getItem("authProvider");
    if (provider) setAuthProvider(provider);
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfileAndData();
      fetchOrders(); // --- FETCH ORDERS WHEN USER IS LOGGED IN ---
    }
  }, [user]);

  // useEffect(() => {
  //   if (!user) return; // Don't start polling if the user is not logged in

  //   const intervalId = setInterval(() => {
  //     console.log("Polling for order updates...");
  //     fetchOrders();
  //   }, 15000); // Re-fetch orders every 15 seconds

  //   // Cleanup function: This runs when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, [user]);
  const fetchProfileAndData = async () => {
    try {
      const profileRes = await api.get("/auth/profile/");
      setProfile(profileRes.data);
      setFirstTimeProfile(!profileRes.data.phone);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    }
  };

  // --- NEW: Function to fetch order history ---
  const fetchOrders = async () => {
    setIsRefreshing(true);
    try {
      const ordersRes = await api.get("/orders/");
      setOrders(ordersRes.data);
      toast({
        title: "Orders Updated",
        description: "Your order history is up to date.",
      });
    } catch (err) {
      console.error("Error fetching orders:", err);
      toast({
        title: "Error",
        description: "Failed to fetch your order history.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false); // Stop the loading indicator, even if it fails
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginData.email, loginData.password);
      localStorage.setItem("authProvider", "email");
      setAuthProvider("email");
      toast({ title: "Welcome back!", description: "Logged in successfully" });
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.response?.data?.detail || "An unexpected error.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    try {
      await register(
        signupData.name,
        signupData.email,
        signupData.password,
        signupData.confirmPassword
      );
      localStorage.setItem("authProvider", "email");
      setAuthProvider("email");
      toast({
        title: "Account created!",
        description: `Welcome ${signupData.name}!`,
      });
    } catch (err: any) {
      toast({
        title: "Signup failed",
        description: err.response?.data?.detail || "An unexpected error.",
        variant: "destructive",
      });
    }
  };

  // const handleGoogleAuth = () => {
  //   const client_id =
  //     "865250496596-q6lkjfadvdh8dvf53sfk10s8bdtg09ck.apps.googleusercontent.com";
  //   // @ts-ignore
  //   window.google.accounts.id.initialize({
  //     client_id,
  //     callback: async (response: any) => {
  //       try {
  //         const token = response.credential;
  //         const res = await axios.post(`${API_URL}/auth/google-login/`, {
  //           token,
  //         });
  //         const { user, access, refresh } = res.data;
  //         setUser(user, access, refresh);
  //         localStorage.setItem("authProvider", "google");
  //         setAuthProvider("google");
  //         toast({
  //           title: "Logged in with Google!",
  //           description: `Welcome ${user.name}`,
  //         });
  //       } catch (err: any) {
  //         toast({
  //           title: "Google login failed",
  //           description: "Could not sign you in with Google. Please try again.",
  //           variant: "destructive",
  //         });
  //       }
  //     },
  //   });
  //   // @ts-ignore
  //   window.google.accounts.id.prompt();
  // };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("authProvider");
    setAuthProvider(null);
    setLocation("/");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      const res = await axiosAuth.put("/auth/profile/", profile);
      setProfile(res.data);
      toast({ title: "Profile updated" });
    } catch {
      toast({
        title: "Error",
        description: "Failed to save profile",
        variant: "destructive",
      });
    }
  };

  const handleProfileCompletion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      try {
        await axiosAuth.put("/auth/profile/", profile);
        await fetchProfileAndData();
        setFirstTimeProfile(false);
        toast({
          title: "Profile updated",
          description: "Your profile is complete.",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to update profile.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await changePassword(currentPassword, newPassword);
      toast({ title: "Success", description: "Password updated." });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to change password.",
        variant: "destructive",
      });
    }
  };

  const tabsListClass =
    authProvider === "email"
      ? "grid grid-cols-3 w-full"
      : "grid grid-cols-2 w-full";

  if (!user) {
    // --- LOGIN/SIGNUP UI (No changes) ---
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12">
          <div className="w-full max-w-md px-4">
            <Tabs value={loginSignupTab} onValueChange={setLoginSignupTab}>
              <TabsList className="grid grid-cols-2 w-full">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Login to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleAuth}
                    >
                      <FaGoogle className="mr-2" /> Continue with Google
                      
                    </Button> */}
                    <div
                      ref={googleLoginButtonRef}
                      className="w-full flex justify-center"
                    ></div>
                    <Separator />
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="signup">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Start using the app</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleAuth}
                    >
                      <FaGoogle className="mr-2" /> Sign up with Google
                    </Button> */}
                    <div
                      ref={googleSignupButtonRef}
                      className="w-full flex justify-center"
                    ></div>
                    <Separator />
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={signupData.name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              name: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Confirm Password</Label>
                        <Input
                          type="password"
                          value={signupData.confirmPassword}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              confirmPassword: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Sign Up
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- LOGGED-IN UI ---
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12 flex flex-col items-center space-y-8">
        <Button
          variant="destructive"
          className="self-end mr-6"
          onClick={handleLogout}
        >
          Logout
        </Button>
        {firstTimeProfile ? (
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                Provide your details to continue.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileCompletion} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={profile?.name || ""}
                    onChange={(e) =>
                      setProfile({ ...profile!, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={profile?.email || ""} disabled />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={profile?.phone || ""}
                    onChange={(e) =>
                      setProfile({ ...profile!, phone: e.target.value })
                    }
                    required
                  />
                </div>
                <Button className="w-full" type="submit">
                  Save & Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="w-full max-w-4xl px-4">
            {/* <Tabs defaultValue="profile" className="w-full"> */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className={tabsListClass}>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                {authProvider === "email" && (
                  <TabsTrigger value="change-password">
                    Change Password
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={profile?.name || ""}
                          onChange={(e) =>
                            setProfile({ ...profile!, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input value={profile?.email || ""} disabled />
                      </div>
                      <div>
                        <Label>Phone</Label>
                        <Input
                          value={profile?.phone || ""}
                          onChange={(e) =>
                            setProfile({ ...profile!, phone: e.target.value })
                          }
                          required
                        />
                      </div>
                      <Button type="submit">Save Profile</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* --- UPDATED: Orders Tab with Real Data --- */}

              <TabsContent value="orders">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Your Order History</CardTitle>
                      <CardDescription>
                        Check the latest status of your recent orders.
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={fetchOrders}
                      disabled={isRefreshing}
                      className="flex items-center gap-2 text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 dark:text-green-400 dark:border-green-500 dark:hover:text-green-300 dark:hover:bg-green-900/30" // Ensures icon and text are spaced nicely
                    >
                      {isRefreshing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4" />
                      )}
                      <span>Refresh</span>
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <Card key={order.order_id} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-bold text-lg">
                                Order ID: {order.order_id}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(order.created_at).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">
                                ${order.total_amount}
                              </p>
                              <p className="text-sm font-medium text-blue-600">
                                {order.status}
                              </p>
                            </div>
                          </div>
                          <Separator />
                          <div className="mt-4 space-y-3">
                            {order.items.map((item, index) => (
                              <div key={index} className="text-sm">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium">
                                    {item.menu_item_name} (x{item.quantity})
                                  </p>
                                  <p>${item.price}</p>
                                </div>
                                {item.customizations &&
                                  item.customizations.length > 0 && (
                                    <p className="text-xs text-muted-foreground italic pl-2">
                                      +{" "}
                                      {item.customizations
                                        .map((c) => c.selection)
                                        .join(", ")}
                                    </p>
                                  )}
                              </div>
                            ))}
                          </div>
                          {order.additional_notes && (
                            <p className="text-sm italic text-muted-foreground mt-4">
                              Your Notes: "{order.additional_notes}"
                            </p>
                          )}
                        </Card>
                      ))
                    ) : (
                      <p>You have no orders yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {authProvider === "email" && (
                <TabsContent value="change-password">
                  {/* ... no changes ... */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Change Password</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form
                        onSubmit={handleChangePassword}
                        className="space-y-4"
                      >
                        <div>
                          <Label>Current Password</Label>
                          <Input
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label>New Password</Label>
                          <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <Button type="submit">Update Password</Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
