"use client";

import Link from 'next/link';
import { MainNavLink } from './main-nav-link';
import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold hover:text-accent transition-colors">
          <GraduationCap className="w-8 h-8" />
          K-Skill Connect
        </Link>
        <nav className="flex items-center space-x-2 sm:space-x-4">
          <MainNavLink href="/">Home</MainNavLink>
          <MainNavLink href="/student">Student</MainNavLink>
          <MainNavLink href="/industry">Industry</MainNavLink>
          <MainNavLink href="/admin">Admin</MainNavLink>
          <MainNavLink href="/student/career-matchmaking">Career AI</MainNavLink>
        </nav>
      </div>
    </header>
  );
}
