
import { SignupForm, type Role } from '@/components/auth/signup-form';
import { Suspense } from 'react';

export default function SignupPage({ searchParams }: { searchParams?: { role?: string } }) {
  const initialRole = searchParams?.role;
  const validRoles: Role[] = ["student", "industry", "admin"];
  const validatedInitialRole = initialRole && validRoles.includes(initialRole as Role) 
    ? initialRole as Role 
    : undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-220px)] py-8 md:py-12">
       <Suspense fallback={<div className="text-center text-lg text-muted-foreground">Loading signup form...</div>}>
        <SignupForm initialRole={validatedInitialRole} />
      </Suspense>
    </div>
  );
}
