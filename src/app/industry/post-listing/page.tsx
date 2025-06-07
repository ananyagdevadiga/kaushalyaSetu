
"use client";

import { ListingForm } from '@/components/listings/ListingForm';
import { useListings, type Listing } from '@/contexts/ListingContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PostListingPage() {
  const { addListing } = useListings();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (data: Omit<Listing, 'id' | 'postedDate' | 'applications'>) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    addListing(data);
    setIsLoading(false);
    router.push('/industry/my-listings'); // Redirect after successful posting
  };

  return (
    <div className="space-y-8">
      <section className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground rounded-lg shadow-lg">
        <Briefcase className="w-12 h-12 text-accent" />
        <div>
          <h1 className="text-3xl font-headline font-bold">Post New Opportunity</h1>
          <p className="text-lg opacity-90">
            Reach talented students by creating a job or internship listing.
          </p>
        </div>
      </section>

      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-headline text-primary">Listing Details</CardTitle>
          <CardDescription>Fill in the form below to create your new listing.</CardDescription>
        </CardHeader>
        <CardContent>
          <ListingForm onSubmit={handleSubmit} isLoading={isLoading} />
        </CardContent>
      </Card>
    </div>
  );
}
