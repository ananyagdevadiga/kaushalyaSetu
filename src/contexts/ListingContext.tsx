
"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Application {
  studentId: string;
  studentName: string; // For display purposes
  appliedDate: string;
  // In a real app, you might include a link to the student's portfolio or a resume ID
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  companyName: string;
  type: 'Internship' | 'Full-time Job';
  requiredSkills: string[];
  postedDate: string;
  // postedBy: string; // To associate with an industry partner
  applications: Application[];
}

interface ListingContextType {
  listings: Listing[];
  addListing: (newListing: Omit<Listing, 'id' | 'postedDate' | 'applications'>) => void;
  applyToListing: (listingId: string, studentId: string, studentName: string) => void;
  getListingById: (listingId: string) => Listing | undefined;
}

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export const ListingProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Listing[]>([]);

  const addListing = useCallback((newListingData: Omit<Listing, 'id' | 'postedDate' | 'applications'>) => {
    const listingToAdd: Listing = {
      ...newListingData,
      id: `listing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      postedDate: new Date().toLocaleDateString(),
      applications: [],
    };
    setListings(prevListings => [listingToAdd, ...prevListings]);
    toast({
      title: "Listing Posted!",
      description: `Your listing "${listingToAdd.title}" has been successfully posted.`,
    });
  }, []);

  const applyToListing = useCallback((listingId: string, studentId: string, studentName: string) => {
    setListings(prevListings =>
      prevListings.map(listing => {
        if (listing.id === listingId) {
          // Prevent duplicate applications from the same student (basic check)
          if (listing.applications.some(app => app.studentId === studentId)) {
            toast({
              title: "Already Applied",
              description: "You have already applied to this listing.",
              variant: "destructive",
            });
            return listing;
          }
          const newApplication: Application = {
            studentId,
            studentName,
            appliedDate: new Date().toLocaleDateString(),
          };
          toast({
            title: "Application Successful!",
            description: `You have successfully applied to "${listing.title}".`,
          });
          return { ...listing, applications: [...listing.applications, newApplication] };
        }
        return listing;
      })
    );
  }, []);

  const getListingById = useCallback((listingId: string) => {
    return listings.find(listing => listing.id === listingId);
  }, [listings]);


  return (
    <ListingContext.Provider value={{ listings, addListing, applyToListing, getListingById }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingContext);
  if (context === undefined) {
    throw new Error('useListings must be used within a ListingProvider');
  }
  return context;
};
