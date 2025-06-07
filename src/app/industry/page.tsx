import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Building, Users, Briefcase, Search } from 'lucide-react';
import Image from 'next/image';

export default function IndustryDashboardPage() {
  return (
    <div className="space-y-12">
      <section className="p-8 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground rounded-lg shadow-xl">
         <div className="flex flex-col md:flex-row items-center gap-6">
          <Building className="w-24 h-24 text-accent" />
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Industry Partner Dashboard</h1>
            <p className="text-lg opacity-90">
              Connect with skilled polytechnic talent, post opportunities, and shape the future workforce.
            </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Search className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Find Talent</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Browse student portfolios and discover candidates with the right skills.</CardDescription>
            <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="Find talent" layout="fill" objectFit="cover" data-ai-hint="talent search"/>
            </div>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">Search Portfolios &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
             <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Post Opportunities</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>List internships and job openings to attract qualified students.</CardDescription>
            <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="Post job" layout="fill" objectFit="cover" data-ai-hint="job post"/>
            </div>
            <Button asChild className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#">Create Listing</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">Mentorship Programs</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Engage with students through webinars, talks, and mentorship.</CardDescription>
             <div className="relative w-full h-40 mt-4 rounded-md overflow-hidden">
              <Image src="https://placehold.co/600x400.png" alt="Mentorship" layout="fill" objectFit="cover" data-ai-hint="mentor student"/>
            </div>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">Learn More &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
