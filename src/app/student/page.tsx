import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Award, Brain, Presentation, UserCircle, BookOpen, MessageSquare } from 'lucide-react';
import Image from 'next/image';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-12">
      <section className="p-8 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <UserCircle className="w-24 h-24 text-accent" />
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Student Dashboard</h1>
            <p className="text-lg opacity-90">
              Welcome! Manage your profile, build your portfolio, and explore career opportunities.
            </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Skill Portfolio</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Showcase your projects, skills, and achievements. Let your talent shine!</CardDescription>
             <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="Portfolio preview" layout="fill" objectFit="cover" data-ai-hint="portfolio resume"/>
            </div>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">Manage Portfolio &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Micro-Certifications</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Earn verified badges by completing courses and assessments.</CardDescription>
            <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="Certifications" layout="fill" objectFit="cover" data-ai-hint="certificate badge"/>
            </div>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">Explore Courses &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Career Matchmaking</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Get AI-powered internship and job recommendations.</CardDescription>
            <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="AI matchmaking" layout="fill" objectFit="cover" data-ai-hint="career path"/>
            </div>
            <Button asChild className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/student/career-matchmaking">Find Opportunities</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-1">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Presentation className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Webinars & Events</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Join live expert talks and workshops.</CardDescription>
             <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="Webinar" layout="fill" objectFit="cover" data-ai-hint="webinar online"/>
            </div>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">View Schedule &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-accent" />
               <CardTitle className="text-xl font-headline text-primary">Mentorship & Q&A Forum</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Connect with mentors and ask questions in our community forum.</CardDescription>
             <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="Mentorship forum" layout="fill" objectFit="cover" data-ai-hint="forum community"/>
            </div>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">Access Forum &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
