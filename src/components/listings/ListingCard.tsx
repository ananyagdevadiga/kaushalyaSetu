
"use client";

import type { Listing } from '@/contexts/ListingContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, CalendarDays, Send, Info } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface ListingCardProps {
  listing: Listing;
  onApply?: (listingId: string) => void; // For student view
  showApplicants?: boolean; // For industry view
  isApplying?: boolean; // To disable apply button during action
}

export function ListingCard({ listing, onApply, showApplicants = false, isApplying = false }: ListingCardProps) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-headline text-primary">{listing.title}</CardTitle>
            <Badge variant={listing.type === 'Internship' ? 'secondary' : 'default'} className="whitespace-nowrap">
                <Briefcase className="w-3 h-3 mr-1.5" />
                {listing.type}
            </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground pt-1">
          {listing.companyName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <p className="text-sm text-foreground/90 line-clamp-3">{listing.description}</p>
        <div>
          <h4 className="text-xs font-semibold text-muted-foreground mb-1">Required Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {listing.requiredSkills.map(skill => (
              <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>
        </div>
         {showApplicants && (
          <div className="pt-2">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1 flex items-center">
                <Users className="w-3 h-3 mr-1.5" /> Applicants ({listing.applications.length})
            </h4>
            {listing.applications.length > 0 ? (
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="link" size="sm" className="text-xs p-0 h-auto text-accent">View Applicants</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Applicants for {listing.title}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {listing.applications.map(app => (
                                <div key={app.studentId} className="py-1 text-sm">
                                    {app.studentName} (Applied: {app.appliedDate})
                                </div>
                            ))}
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            ) : (
              <p className="text-xs text-muted-foreground italic">No applications yet.</p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 border-t">
        <div className="text-xs text-muted-foreground flex items-center">
            <CalendarDays className="w-3 h-3 mr-1.5" />
            Posted: {listing.postedDate}
        </div>
        {onApply && (
          <Button onClick={() => onApply(listing.id)} size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto" disabled={isApplying || listing.applications.some(app => app.studentId === "mockStudent123")}>
            <Send className="mr-2 h-4 w-4" />
            {listing.applications.some(app => app.studentId === "mockStudent123") ? "Applied" : (isApplying ? "Applying..." : "Apply Now")}
          </Button>
        )}
         {!onApply && !showApplicants && ( // Generic info button if no action
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <Info className="mr-2 h-4 w-4" /> Details
                    </Button>
                </AlertDialogTrigger>
                 <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle>{listing.title} at {listing.companyName}</AlertDialogTitle>
                    <AlertDialogDescription className="whitespace-pre-line max-h-[60vh] overflow-y-auto">
                        <p className="font-medium text-foreground mb-2">Type: {listing.type}</p>
                        <p className="font-medium text-foreground mb-2">Posted: {listing.postedDate}</p>
                        <h4 className="font-semibold mt-3 mb-1">Full Description:</h4>
                        {listing.description}
                        <h4 className="font-semibold mt-3 mb-1">Required Skills:</h4>
                        {listing.requiredSkills.join(', ')}
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Close</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )}
      </CardFooter>
    </Card>
  );
}
