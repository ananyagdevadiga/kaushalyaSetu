// src/ai/flows/career-matchmaking-engine.ts
'use server';

/**
 * @fileOverview Career Matchmaking Engine for Students.
 *
 * - careerMatchmakingEngine - A function that handles the career matchmaking process for students.
 * - CareerMatchmakingInput - The input type for the careerMatchmakingEngine function.
 * - CareerMatchmakingOutput - The return type for the careerMatchmakingEngine function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CareerMatchmakingInputSchema = z.object({
  studentSkills: z
    .string()
    .describe("The student's skills, as a comma separated list of skills."),
  studentCertifications: z
    .string()
    .describe("The student's certifications, as a comma separated list of certifications."),
});
export type CareerMatchmakingInput = z.infer<typeof CareerMatchmakingInputSchema>;

const CareerMatchmakingOutputSchema = z.object({
  internshipRecommendations: z
    .string()
    .describe('A list of recommended internships for the student.'),
  jobRecommendations: z
    .string()
    .describe('A list of recommended jobs for the student.'),
});
export type CareerMatchmakingOutput = z.infer<typeof CareerMatchmakingOutputSchema>;

export async function careerMatchmakingEngine(input: CareerMatchmakingInput): Promise<CareerMatchmakingOutput> {
  return careerMatchmakingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerMatchmakingPrompt',
  input: {schema: CareerMatchmakingInputSchema},
  output: {schema: CareerMatchmakingOutputSchema},
  prompt: `You are a career advisor specializing in recommending internships and jobs to students.

You will use the student's skills and certifications to recommend internships and jobs that match their profile.

Skills: {{{studentSkills}}}
Certifications: {{{studentCertifications}}}

Consider that you are providing the response in markdown format.
`,
});

const careerMatchmakingFlow = ai.defineFlow(
  {
    name: 'careerMatchmakingFlow',
    inputSchema: CareerMatchmakingInputSchema,
    outputSchema: CareerMatchmakingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
