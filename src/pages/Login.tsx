import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wallet, ArrowRight, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuthStore } from '@/store/auth';
import { User } from '@/types';

import { api } from '@/lib/api';

interface LoginProps {
  onLoginSuccess?: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const navigate = useNavigate();
  const setToken = useAuthStore(state => state.setToken);
  const login = useAuthStore(state => state.login);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { access_token, user } = await api.login(username, password);
      setToken(access_token)
      const current_user: User = await api.users_user(user.id);
      
      login(current_user, access_token);
      onLoginSuccess?.();
      if (Boolean(current_user.aravt)) {
        navigate('/dashboard');
      } else {
        navigate('/browse');
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    setIsWalletConnecting(true);
    setError('');

    try {
      // TODO: Replace with TON wallet connection logic
      onLoginSuccess?.();
      navigate('/dashboard');
    } catch (error: unknown) {
      setError(
        error instanceof Error 
          ? error.message 
          : 'Failed to connect wallet. Please make sure you have TON wallet installed.'
      );
    } finally {
      setIsWalletConnecting(false);
    }
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Welcome to Aravt</CardTitle>
            <Globe className="h-6 w-6 text-gray-500" />
          </div>
          <CardDescription>
            Choose your preferred way to connect
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Tabs defaultValue="username" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="username">Username</TabsTrigger>
              <TabsTrigger value="wallet">TON Wallet</TabsTrigger>  
            </TabsList>

            <TabsContent value="wallet">
              <div className="space-y-4">
                <Button 
                  className="w-full h-12 bg-black text-white hover:bg-gray-800"
                  onClick={handleWalletConnect}
                  disabled={isWalletConnecting}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isWalletConnecting ? 'Connecting...' : 'Connect TON Wallet'}
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">
                      Secure and decentralized
                    </span>
                  </div>
                </div>
                <CardFooter className="flex flex-col space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.open('https://db.aravt.io', '_blank')}
                >
                  Don't have a TON wallet?
                </Button>
              </CardFooter>
              </div>
            </TabsContent>

            <TabsContent value="username">
              <form onSubmit={handleUsernameLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="username"
                    placeholder="username"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Signing in...'
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                <div className="text-center text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;