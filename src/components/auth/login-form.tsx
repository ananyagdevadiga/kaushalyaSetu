
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

export type Role = "student" | "industry" | "admin";

interface LoginFormProps {
  initialRole?: Role;
}

export function LoginForm({ initialRole }: LoginFormProps) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>(initialRole || "student");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialRole && ["student", "industry", "admin"].includes(initialRole)) {
      setSelectedRole(initialRole);
    }
  }, [initialRole]);

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

  const handleRoleChange = (value: string) => {
    setSelectedRole(value as Role);
    // Optionally clear fields on tab switch, or keep them for convenience
    // setEmail('');
    // setPassword('');
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
        <CardTitle className="text-3xl font-headline text-primary">KaushalyaSetu Login</CardTitle>
        <CardDescription>Select your role and enter your credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedRole} onValueChange={handleRoleChange} className="w-full">
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
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary hover:text-primary/90 underline-offset-4 hover:underline">
            Sign Up
          </Link>
        </p>
      </CardContent>
      <CardFooter className="flex justify-center text-xs text-muted-foreground pt-4">
        <p>This is a prototype. No actual authentication is performed.</p>
      </CardFooter>
    </Card>
  );
}
