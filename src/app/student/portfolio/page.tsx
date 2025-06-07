
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { FileText, Lightbulb, FolderKanban, Upload } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="space-y-12">
      <section className="p-8 bg-gradient-to-r from-primary to-indigo-600 text-primary-foreground rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <FolderKanban className="w-24 h-24 text-accent" />
          <div>
            <h1 className="text-4xl font-headline font-bold mb-2">My Skill Portfolio</h1>
            <p className="text-lg opacity-90">
              Showcase your projects, skills, and achievements to potential employers.
            </p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">My Projects</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>Add and manage your projects, highlighting your contributions and technologies used.</CardDescription>
            <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Add New Project
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">My Skills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>List your technical and soft skills. Get them endorsed or verified.</CardDescription>
             <Button variant="outline" className="mt-4 w-full">
              Manage Skills
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Separator />

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Upload className="w-8 h-8 text-accent" />
            <CardTitle className="text-xl font-headline text-primary">My Resume/CV</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription>Upload your latest resume or CV. Keep it updated for employers.</CardDescription>
          <div className="mt-6 p-6 border-2 border-dashed border-border rounded-lg text-center">
            <p className="text-muted-foreground mb-4">Drag & drop your file here, or click to browse.</p>
            <Button variant="outline">
              <Upload className="mr-2 h-4 w-4" /> Upload Resume
            </Button>
          </div>
          {/* Placeholder for displaying uploaded resume info */}
          {/* <div className="mt-4">
            <p className="text-sm font-medium text-foreground">current_resume.pdf</p>
            <p className="text-xs text-muted-foreground">Uploaded on: 2024-07-28</p>
          </div> */}
        </CardContent>
      </Card>

    </div>
  );
}
