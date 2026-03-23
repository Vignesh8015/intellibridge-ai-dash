import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain, LogIn, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await api.login(email, password);
        toast({ title: "Welcome back!", description: "Login successful." });
      } else {
        await api.register(email, password, name);
        toast({ title: "Account created!", description: "Registration successful." });
      }
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-3">
          <div className="p-3 bg-primary rounded-xl">
            <Brain className="h-10 w-10 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">IntelliBridge</h1>
          <p className="text-muted-foreground text-sm">AI-Powered Legacy System Modernizer</p>
        </div>

        <Card className="card-enterprise">
          <CardHeader className="text-center">
            <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
            <CardDescription>
              {isLogin
                ? "Enter your credentials to access the dashboard"
                : "Register a new account to get started"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="demo@intellibridge.ai"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  "Please wait..."
                ) : isLogin ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" /> Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary hover:underline"
              >
                {isLogin ? "Don't have an account? Register" : "Already have an account? Sign In"}
              </button>
            </div>

            {isLogin && (
              <div className="mt-3 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
                <p className="font-medium mb-1">Demo Credentials:</p>
                <p>Email: demo@intellibridge.ai</p>
                <p>Password: demo123</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
