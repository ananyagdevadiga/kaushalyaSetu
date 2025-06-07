
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

const sampleListings: Listing[] = [
  {
    id: 'sample-listing-1',
    title: 'Frontend Developer Intern (Sample)',
    description: 'Join our dynamic team to work on exciting new features for our flagship web application. Learn React, Tailwind CSS, and Next.js in a fast-paced, supportive environment. This is a great opportunity to gain hands-on experience.',
    companyName: 'Innovatech Solutions Ltd.',
    type: 'Internship',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Posted 2 days ago
    applications: [],
  },
  {
    id: 'sample-listing-2',
    title: 'Junior Backend Engineer (Sample)',
    description: 'We are looking for a motivated junior backend engineer to help build and maintain our scalable microservices architecture. Experience with Node.js and SQL/NoSQL databases is a plus. You will contribute to API development and system optimization.',
    companyName: 'Tech Core Systems Inc.',
    type: 'Full-time Job',
    requiredSkills: ['Node.js', 'Express.js', 'SQL', 'Docker', 'REST APIs'],
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Posted 5 days ago
    applications: [
      { studentId: 'mockStudent001', studentName: 'Alice Wonderland', appliedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString() }
    ],
  },
  {
    id: 'sample-listing-3',
    title: 'UX/UI Design Intern (Sample)',
    description: 'Passionate about user-centered design? Apply for our UX/UI internship to collaborate on creating intuitive and visually appealing interfaces for mobile and web products. Proficiency in Figma or Adobe XD is required.',
    companyName: 'Creative Designs Co.',
    type: 'Internship',
    requiredSkills: ['Figma', 'User Research', 'Prototyping', 'Wireframing'],
    postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString(), // Posted 1 day ago
    applications: [],
  },
];


export const ListingProvider = ({ children }: { children: ReactNode }) => {
  const [listings, setListings] = useState<Listing[]>(sampleListings);

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
