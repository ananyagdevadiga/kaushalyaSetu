
"use client";

import Link from 'next/link';
import { MainNavLink } from './main-nav-link';
import { GraduationCap, LogIn, UserPlus } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl sm:text-2xl font-headline font-bold hover:text-accent transition-colors">
          <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8" />
          KaushalyaSetu
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2 flex-wrap justify-end">
          <MainNavLink href="/">Home</MainNavLink>
          <MainNavLink href="/login?role=student">Student</MainNavLink>
          <MainNavLink href="/login?role=industry">Industry</MainNavLink>
          <MainNavLink href="/login?role=admin">Admin</MainNavLink>
          <MainNavLink href="/student/career-matchmaking">Career AI</MainNavLink>
          <MainNavLink
            href="/signup"
            className="flex items-center border border-accent"
          >
            <UserPlus className="w-4 h-4 mr-1 sm:mr-2" /> Sign Up
          </MainNavLink>
          <MainNavLink href="/login" className="flex items-center">
            <LogIn className="w-4 h-4 mr-1 sm:mr-2" /> Login
          </MainNavLink>
        </nav>
      </div>
    </header>
  );
}
