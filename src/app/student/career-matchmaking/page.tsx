"use client";

import { useState } from 'react';
import { CareerForm } from '@/components/career-matchmaking/career-form';
import { CareerResults } from '@/components/career-matchmaking/career-results';
import type { CareerMatchmakingOutput } from '@/ai/flows/career-matchmaking-engine';
import { Separator } from '@/components/ui/separator';

export default function CareerMatchmakingPage() {
  const [results, setResults] = useState<CareerMatchmakingOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleResults = (data: CareerMatchmakingOutput | null, errorMsg: string | null) => {
    setResults(data);
    setError(errorMsg);
    setIsLoading(false);
  };
  
  // This function will be called by CareerForm before dispatching the action
  // This allows us to set loading state immediately
  const handleFormSubmitInitiated = () => {
    setIsLoading(true);
    setError(null);
    setResults(null);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-headline font-bold text-primary mb-2">AI Career Advisor</h1>
        <p className="text-lg text-foreground/80">
          Discover internships and job opportunities tailored to your skills and certifications.
        </p>
      </div>
      <Separator />
      <CareerForm onResults={handleResults} />
      {(results || error || isLoading) && <CareerResults results={results} error={error} isLoading={isLoading} />}
    </div>
  );
}
