
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserCog, Users, Award, BarChart3 } from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-12">
      <section className="p-8 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <UserCog className="w-24 h-24 text-accent" />
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">Polytechnic Admin Dashboard</h1>
            <p className="text-lg opacity-90">
              Manage student data, oversee certifications, and track institutional performance.
            </p>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-accent" />
                <CardTitle className="text-xl font-headline text-primary">Student Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>View student profiles, track progress, and manage accounts.</CardDescription>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">Manage Students &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-accent" />
                <CardTitle className="text-xl font-headline text-primary">Certification Oversight</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Monitor micro-certification programs and verify student achievements.</CardDescription>
             <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">View Certifications &rarr;</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-accent" />
                <CardTitle className="text-xl font-headline text-primary">Platform Analytics</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Access reports on student engagement and employment outcomes.</CardDescription>
            <Button asChild variant="link" className="text-primary p-0 mt-4">
              <Link href="#">View Reports &rarr;</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
