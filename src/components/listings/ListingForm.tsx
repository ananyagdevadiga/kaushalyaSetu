
"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import type { Listing } from '@/contexts/ListingContext';
import { Briefcase, Save } from 'lucide-react';

const listingFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  companyName: z.string().min(2, { message: "Company name is required." }),
  description: z.string().min(20, { message: "Description must be at least 20 characters." }),
  type: z.enum(['Internship', 'Full-time Job'], { required_error: "Listing type is required." }),
  requiredSkills: z.string().min(1, { message: "Please list at least one skill." }),
});

type ListingFormData = z.infer<typeof listingFormSchema>;

interface ListingFormProps {
  onSubmit: (data: Omit<Listing, 'id' | 'postedDate' | 'applications'>) => void;
  initialData?: Partial<ListingFormData>; // For editing, not used in this iteration
  isLoading?: boolean;
}

export function ListingForm({ onSubmit, initialData, isLoading = false }: ListingFormProps) {
  const form = useForm<ListingFormData>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: initialData || {
      title: '',
      companyName: '',
      description: '',
      type: undefined,
      requiredSkills: '',
    },
  });

  const handleSubmit = (data: ListingFormData) => {
    const processedData = {
      ...data,
      requiredSkills: data.requiredSkills.split(',').map(skill => skill.trim()).filter(skill => skill),
    };
    onSubmit(processedData);
    form.reset(); // Reset form after submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Software Engineer Intern, Junior Web Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Company Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job/Internship Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Provide a detailed description of the role, responsibilities, and qualifications..." {...field} rows={5} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Listing Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of listing" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Internship">Internship</SelectItem>
                  <SelectItem value="Full-time Job">Full-time Job</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="requiredSkills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Required Skills</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React, Node.js, Python, Communication" {...field} />
              </FormControl>
              <FormDescription>
                Enter skills separated by commas.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
          {isLoading ? (
            'Submitting...'
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Post Listing
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
