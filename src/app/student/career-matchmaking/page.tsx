"use client";

import { CareerForm } from '@/components/career-matchmaking/career-form';
import { Separator } from '@/components/ui/separator';

export default function CareerMatchmakingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">AI Career Advisor</h1>
        <p className="text-lg text-foreground/80">
          Discover internships and job opportunities tailored to your skills and certifications.
        </p>
      </div>
      <Separator />
      <CareerForm />
    </div>
  );
}
