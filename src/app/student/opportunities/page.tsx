
"use client";

import React, { useState } from 'react';
import { useListings } from '@/contexts/ListingContext';
import { ListingCard } from '@/components/listings/ListingCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';

export default function OpportunitiesPage() {
  const { listings, applyToListing } = useListings();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'Internship' | 'Full-time Job'>('all');
  const [applyingId, setApplyingId] = useState<string | null>(null);

  const handleApply = async (listingId: string) => {
    setApplyingId(listingId);
    // Simulate API call for application
    await new Promise(resolve => setTimeout(resolve, 700)); 
    // For this prototype, we'll use a mock student ID and name
    applyToListing(listingId, "mockStudent123", "Mock Student User");
    setApplyingId(null);
  };

  const filteredListings = listings
    .filter(listing => 
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.requiredSkills.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(listing => 
      filterType === 'all' ? true : listing.type === filterType
    );

  return (
    <div className="space-y-8">
      <div className="p-4 bg-card rounded-lg shadow-md border">
        <h1 className="text-2xl font-headline font-bold text-primary mb-4">Find Opportunities</h1>
        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="search-listings" className="text-sm font-medium">Search Listings</Label>
            <div className="relative mt-1">
              <Input
                id="search-listings"
                type="text"
                placeholder="Search by title, company, skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div>
            <Label htmlFor="filter-type" className="text-sm font-medium">Filter by Type</Label>
             <Select value={filterType} onValueChange={(value) => setFilterType(value as typeof filterType)}>
                <SelectTrigger id="filter-type" className="mt-1">
                    <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Full-time Job">Full-time Job</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {listings.length === 0 ? (
         <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No opportunities posted yet. Check back soon!</p>
        </div>
      ): filteredListings.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No listings match your current search/filter criteria.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map(listing => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onApply={handleApply} 
              isApplying={applyingId === listing.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
