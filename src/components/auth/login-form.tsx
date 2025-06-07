
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

type Role = "student" | "industry" | "admin";

export function LoginForm() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call / authentication
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`Logging in as ${selectedRole} with email: ${email}`);

    toast({
      title: "Login Successful (Mock)",
      description: `Redirecting to ${selectedRole} dashboard...`,
    });

    switch (selectedRole) {
      case "student":
        router.push('/student');
        break;
      case "industry":
        router.push('/industry');
        break;
      case "admin":
        router.push('/admin');
        break;
      default:
        router.push('/');
    }
    // No need to setIsLoading(false) as we are redirecting.
  };

  const renderFormFields = (role: Role) => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor={`${role}-email`}>Email</Label>
        <Input
          id={`${role}-email`}
          type="email"
          placeholder="your.email@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="text-base md:text-sm"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${role}-password`}>Password</Label>
        <Input
          id={`${role}-password`}
          type="password"
          placeholder="********"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          className="text-base md:text-sm"
        />
      </div>
      <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={isLoading}>
        {isLoading ? (
          `Logging in...`
        ) : (
          <>
            <LogIn className="mr-2 h-4 w-4" /> Login as {role.charAt(0).toUpperCase() + role.slice(1)}
          </>
        )}
      </Button>
    </form>
  );

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-border">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline text-primary">K-Skill Connect Login</CardTitle>
        <CardDescription>Select your role and enter your credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedRole} onValueChange={(value) => {
          setSelectedRole(value as Role);
          // Optionally clear fields on tab switch, or keep them for convenience
          // setEmail(''); 
          // setPassword('');
        }} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="student">Student</TabsTrigger>
            <TabsTrigger value="industry">Industry</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>
          <TabsContent value="student" className="mt-6">
            {renderFormFields("student")}
          </TabsContent>
          <TabsContent value="industry" className="mt-6">
            {renderFormFields("industry")}
          </TabsContent>
          <TabsContent value="admin" className="mt-6">
            {renderFormFields("admin")}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground pt-4">
        <p>This is a prototype. No actual authentication is performed.</p>
      </CardFooter>
    </Card>
  );
}
