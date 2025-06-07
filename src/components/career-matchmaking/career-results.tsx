import type { CareerMatchmakingOutput } from '@/ai/flows/career-matchmaking-engine';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface CareerResultsProps {
  results: CareerMatchmakingOutput | null;
  error?: string | null;
  isLoading: boolean;
}

function formatRecommendations(recommendations: string | undefined) {
  if (!recommendations) return <p className="text-muted-foreground">No recommendations available.</p>;
  // Split by newlines that are not preceded or followed by another newline (to handle single newlines as list items)
  // And also split by markdown list উপসর্গs
  const items = recommendations.split(/\n(?!\n)|(?<!\n)\n|\* |\- /).map(item => item.trim()).filter(item => item.length > 0);
  if (items.length === 0) return <p className="text-muted-foreground">No recommendations available.</p>;
  return (
    <ul className="list-disc list-inside space-y-1">
      {items.map((item, index) => (
        <li key={index} className="text-foreground/90">{item.replace(/^[\*\-]\s*/, '')}</li>
      ))}
    </ul>
  );
}


export function CareerResults({ results, error, isLoading }: CareerResultsProps) {
  if (isLoading) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8 shadow-lg animate-pulse">
        <CardHeader>
          <CardTitle className="text-xl font-headline text-primary">Fetching Recommendations...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-8 bg-muted rounded w-3/4 mt-4"></div>
          <div className="h-16 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8 border-destructive shadow-lg">
        <CardHeader className="flex flex-row items-center gap-2">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <CardTitle className="text-xl font-headline text-destructive">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return null; 
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-2">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <CardTitle className="text-xl font-headline text-primary">Your AI-Powered Career Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Internship Recommendations</h3>
          <div className="p-4 bg-muted/50 rounded-md prose prose-sm max-w-none">
            {formatRecommendations(results.internshipRecommendations)}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">Job Recommendations</h3>
           <div className="p-4 bg-muted/50 rounded-md prose prose-sm max-w-none">
            {formatRecommendations(results.jobRecommendations)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
