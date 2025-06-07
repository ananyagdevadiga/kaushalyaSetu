
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/shared/feature-card';
import { Users, Briefcase, Award, Brain, Presentation, UserCheck, Building, UserCog } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: UserCheck,
      title: "Multi-Role Access",
      description: "Dedicated portals for students, industry partners, and polytechnic admins to manage profiles and access tailored features."
    },
    {
      icon: Briefcase,
      title: "Skill Portfolio Builder",
      description: "Showcase your projects, get skills auto-tagged, and earn verified skill badges to impress employers."
    },
    {
      icon: Award,
      title: "Micro-Certification System",
      description: "Access course modules, complete in-app assessments, and build your certification wallet with verified skills."
    },
    {
      icon: Brain,
      title: "Career Matchmaking Engine",
      description: "Receive smart internship and job recommendations powered by AI, based on your unique skill set and certifications."
    },
    {
      icon: Presentation,
      title: "Live Webinars & Mentorship",
      description: "Engage with industry experts through live talks, participate in Q&A forums, and benefit from mentorship opportunities."
    }
  ];

  return (
    <div className="space-y-16">
      <section className="text-center py-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-lg shadow-inner">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-headline font-bold text-primary mb-6">
            Welcome to KaushalyaSetu
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-3xl mx-auto">
            Bridging the gap between Karnataka&apos;s polytechnic talent and industry demands. Certify your skills, build your portfolio, and connect with opportunities.
          </p>
          <div className="relative w-full max-w-3xl mx-auto h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl mb-12">
            <Image 
              src="/img1.png" 
              alt="Students collaborating on a project at KaushalyaSetu" 
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/student">I&apos;m a Student</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/industry">I&apos;m an Industry Partner</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-headline font-bold text-primary text-center mb-12">
            Platform Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50 rounded-lg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-headline font-bold text-primary mb-8">
            Who is this for?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/student" className="block p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Users className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-headline text-primary mb-2">Students</h3>
              <p className="text-foreground/80">Gain skills, build your portfolio, and find internships or jobs.</p>
            </Link>
            <Link href="/industry" className="block p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <Building className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-headline text-primary mb-2">Industry Partners</h3>
              <p className="text-foreground/80">Discover skilled talent, post opportunities, and mentor the next generation.</p>
            </Link>
            <Link href="/admin" className="block p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <UserCog className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-headline text-primary mb-2">Polytechnic Admins</h3>
              <p className="text-foreground/80">Track student progress, manage certifications, and enhance institutional reputation.</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
