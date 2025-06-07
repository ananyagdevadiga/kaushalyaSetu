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
      error: "Invalid input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
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
}
