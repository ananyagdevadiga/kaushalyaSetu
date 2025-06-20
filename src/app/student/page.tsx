
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Award, Brain, Presentation, UserCircle, MessageSquare, FileSearch } from 'lucide-react';

export default function StudentDashboardPage() {
  return (
    <div className="space-y-12">
      <section className="p-8 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <UserCircle className="w-16 h-16 text-accent" /> {/* Icon size adjusted */}
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
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="/student/portfolio">Manage Portfolio &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileSearch className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Job Opportunities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Browse internships and full-time jobs posted by industry partners.</CardDescription>
            <Button asChild className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/student/opportunities">Find Openings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">AI Career Advisor</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Get AI-powered internship and job recommendations based on your profile.</CardDescription>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="/student/career-matchmaking">Get Advice &rarr;</Link>
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
            <CardDescription>Earn verified badges by completing courses and assessments. (Coming Soon)</CardDescription>
            <Button asChild variant="link" className="text-primary p-0 mt-4" disabled>
              <Link href="#">Explore Courses &rarr;</Link>
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
            <CardDescription>Join live expert talks and workshops. (Coming Soon)</CardDescription>
            <Button asChild variant="link" className="text-primary p-0 mt-4" disabled>
              <Link href="#">View Schedule &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 lg:col-span-1">
         <CardHeader>
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-accent" />
               <CardTitle className="text-xl font-headline text-primary">Mentorship Forum</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Connect with mentors and ask questions in our community forum. (Coming Soon)</CardDescription>
            <Button asChild variant="link" className="text-primary p-0 mt-4" disabled>
              <Link href="#">Access Forum &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
