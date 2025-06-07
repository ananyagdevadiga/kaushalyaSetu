
"use client";

import { useListings } from '@/contexts/ListingContext';
import { ListingCard } from '@/components/listings/ListingCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClipboardList, PlusCircle } from 'lucide-react';

export default function MyListingsPage() {
  const { listings } = useListings();
  // In a real app, you'd filter listings by the currently logged-in industry partner.
  // For this prototype, we'll show all listings.
  // const industryListings = listings.filter(l => l.postedBy === "currentIndustryPartnerId");
  const industryListings = listings; 

  return (
    <div className="space-y-8">
      <section className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground rounded-lg shadow-lg">
        <div className="flex items-center gap-4">
          <ClipboardList className="w-12 h-12 text-accent" />
          <div>
            <h1 className="text-3xl font-headline font-bold">My Posted Listings</h1>
            <p className="text-lg opacity-90">
              Manage your job and internship opportunities and view applicants.
            </p>
          </div>
        </div>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4 sm:mt-0">
            <Link href="/industry/post-listing">
                <PlusCircle className="mr-2 h-5 w-5" /> Create New Listing
            </Link>
        </Button>
      </section>

      {industryListings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground mb-4">You haven&apos;t posted any listings yet.</p>
          <Button asChild size="lg">
            <Link href="/industry/post-listing">Post Your First Listing</Link>
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industryListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} showApplicants={true} />
          ))}
        </div>
      )}
    </div>
  );
}
