"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { CareerMatchmakingOutput } from '@/ai/flows/career-matchmaking-engine';
import { getCareerRecommendationsAction } from '@/app/student/career-matchmaking/actions';

// No onResults prop needed anymore as the page doesn't handle results display
interface CareerFormProps {}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? 'Processing...' : 'Get Recommendations'}
    </Button>
  );
}

export function CareerForm({}: CareerFormProps) {
  const initialState: { data: CareerMatchmakingOutput | null; error: string | null; fieldErrors?: any } = { data: null, error: null };
  
  // The action will be called, but the page won't use its output to display results/errors below the form.
  const formAction = async (prevState: any, formData: FormData) => {
    const result = await getCareerRecommendationsAction(prevState, formData);
    // No longer calling onResults
    return result;
  };
  
  const [state, dispatch] = useFormState(formAction, initialState);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-primary">Career Matchmaking AI</CardTitle>
        <CardDescription>
          Enter your skills and certifications to get personalized internship and job recommendations.
        </CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studentSkills" className="text-lg font-medium">Your Skills</Label>
            <p className="text-sm text-muted-foreground">
              Enter your skills, separated by commas (e.g., JavaScript, Python, Graphic Design).
            </p>
            <Textarea
              id="studentSkills"
              name="studentSkills"
              placeholder="e.g., React, Node.js, Project Management, Figma"
              rows={3}
              aria-describedby="studentSkillsError"
            />
            {state.fieldErrors?.studentSkills && (
              <p id="studentSkillsError" className="text-sm text-destructive">{state.fieldErrors.studentSkills.join(', ')}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="studentCertifications" className="text-lg font-medium">Your Certifications (Optional)</Label>
             <p className="text-sm text-muted-foreground">
              List any certifications you hold, separated by commas (e.g., AWS Certified Developer, Google IT Support).
            </p>
            <Textarea
              id="studentCertifications"
              name="studentCertifications"
              placeholder="e.g., Certified Full Stack Developer, CompTIA A+"
              rows={3}
            />
            {state.fieldErrors?.studentCertifications && (
              <p id="studentCertificationsError" className="text-sm text-destructive">{state.fieldErrors.studentCertifications.join(', ')}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-6">
           {/* Removed the display of state.error here to ensure "don't show anything" more strictly */}
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
