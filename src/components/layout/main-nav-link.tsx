"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { LinkProps } from 'next/link';
import type React from 'react';

interface MainNavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

export function MainNavLink({ href, children, className, ...props }: MainNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href.toString();

  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive
          ? "bg-accent text-accent-foreground"
          : "hover:bg-primary-foreground hover:text-primary",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
