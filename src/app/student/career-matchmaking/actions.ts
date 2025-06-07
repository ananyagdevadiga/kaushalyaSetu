// src/app/student/career-matchmaking/actions.ts
'use server';

import { careerMatchmakingEngine, type CareerMatchmakingInput, type CareerMatchmakingOutput } from '@/ai/flows/career-matchmaking-engine';
import { z } from 'zod';

const CareerMatchmakingInputSchema = z.object({
  studentSkills: z.string().min(1, "Skills are required."),
  studentCertifications: z.string(), // Certifications can be optional
});

export async function getCareerRecommendationsAction(
  prevState: any,
  formData: FormData
): Promise<{data: CareerMatchmakingOutput | null; error: string | null; fieldErrors?: any }> {
  const rawFormData = {
    studentSkills: formData.get('studentSkills'),
    studentCertifications: formData.get('studentCertifications'),
  };

  const validatedFields = CareerMatchmakingInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      data: null,
      error: "Invalid input. Please check the fields.", // Generic error for field issues, but won't be displayed outside field-specific messages
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  // For UI only, we don't proceed with the AI call.
  // We return a state that indicates success but with no data to display.
  return { data: null, error: null };

  /* 
  // Original code that calls the AI engine:
  const input: CareerMatchmakingInput = {
    studentSkills: validatedFields.data.studentSkills,
    studentCertifications: validatedFields.data.studentCertifications,
  };

  try {
    const result = await careerMatchmakingEngine(input);
    return { data: result, error: null };
  } catch (error) {
    console.error("Error in career matchmaking engine action:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { data: null, error: `Failed to get career recommendations: ${errorMessage}` };
  }
  */
}
