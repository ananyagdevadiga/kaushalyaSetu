
"use client";

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FileText, Lightbulb, FolderKanban, Upload, PlusCircle, XCircle, Save, Trash2, Edit3 } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  imageUrl?: string;
}

interface Resume {
  name: string;
  uploadDate: string;
  file?: File; 
}

const initialProjectFormState = {
  title: '',
  description: '',
  technologies: '',
  link: '',
  imageUrl: '',
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [resume, setResume] = useState<Resume | null>(null);

  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState(initialProjectFormState);

  const [skillInput, setSkillInput] = useState('');

  // Project Handlers
  const handleProjectInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProjectFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdateProject = (e: FormEvent) => {
    e.preventDefault();
    if (!projectFormData.title || !projectFormData.description) {
      alert("Project title and description are required.");
      return;
    }
    const projectData = {
      ...projectFormData,
      technologies: projectFormData.technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
    };

    if (editingProjectId) {
      setProjects(projects.map(p => p.id === editingProjectId ? { ...p, ...projectData, id: editingProjectId } : p));
    } else {
      setProjects([...projects, { ...projectData, id: Date.now().toString() }]);
    }
    setShowAddProjectForm(false);
    setEditingProjectId(null);
    setProjectFormData(initialProjectFormState);
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setProjectFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
        link: project.link || '',
        imageUrl: project.imageUrl || '',
    });
    setShowAddProjectForm(true);
  };

  const handleDeleteProject = (projectId: string) => {
    setProjects(projects.filter(p => p.id !== projectId));
  };

  const toggleProjectForm = () => {
    setShowAddProjectForm(!showAddProjectForm);
    setEditingProjectId(null); // Reset editing state when toggling
    setProjectFormData(initialProjectFormState); // Reset form data
  };


  // Skill Handlers
  const handleSkillInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSkillInput(e.target.value);
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  // Resume Handler
  const handleResumeUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume({
        name: file.name,
        uploadDate: new Date().toLocaleDateString(),
        file: file,
      });
      // In a real app, you'd upload the file here
      alert(`Mock upload: ${file.name}`);
    }
  };

  const handleRemoveResume = () => {
    setResume(null);
    const resumeInput = document.getElementById('resumeUpload') as HTMLInputElement;
    if (resumeInput) resumeInput.value = '';
  };


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

      {/* Projects Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-accent" />
              <CardTitle className="text-xl font-headline text-primary">My Projects</CardTitle>
            </div>
            <Button onClick={toggleProjectForm} variant="outline" size="sm">
              {showAddProjectForm ? <XCircle className="mr-2 h-4 w-4" /> : <PlusCircle className="mr-2 h-4 w-4" />}
              {showAddProjectForm ? (editingProjectId ? 'Cancel Edit' : 'Cancel Add') : 'Add New Project'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAddProjectForm && (
            <form onSubmit={handleAddOrUpdateProject} className="space-y-4 p-4 border rounded-md bg-muted/50 mb-6">
              <h3 className="text-lg font-semibold text-primary">{editingProjectId ? "Edit Project" : "Add New Project"}</h3>
              <div>
                <Label htmlFor="title">Project Title</Label>
                <Input id="title" name="title" value={projectFormData.title} onChange={handleProjectInputChange} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" value={projectFormData.description} onChange={handleProjectInputChange} required />
              </div>
              <div>
                <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                <Input id="technologies" name="technologies" value={projectFormData.technologies} onChange={handleProjectInputChange} placeholder="e.g., React, Node.js, PostgreSQL" />
              </div>
              <div>
                <Label htmlFor="link">Project Link (Optional)</Label>
                <Input id="link" name="link" type="url" value={projectFormData.link} onChange={handleProjectInputChange} placeholder="https://yourproject.com" />
              </div>
              <div>
                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                <Input id="imageUrl" name="imageUrl" type="url" value={projectFormData.imageUrl} onChange={handleProjectInputChange} placeholder="https://placehold.co/600x400.png" />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={toggleProjectForm}>Cancel</Button>
                <Button type="submit" className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Save className="mr-2 h-4 w-4" /> {editingProjectId ? "Save Changes" : "Add Project"}
                </Button>
              </div>
            </form>
          )}
          {projects.length === 0 && !showAddProjectForm && (
            <CardDescription>No projects added yet. Click "Add New Project" to get started.</CardDescription>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map(project => (
              <Card key={project.id} className="flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-primary">{project.title}</CardTitle>
                     <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditProject(project)}>
                            <Edit3 className="h-4 w-4" />
                             <span className="sr-only">Edit Project</span>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDeleteProject(project.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete Project</span>
                        </Button>
                    </div>
                  </div>
                  {project.imageUrl && (
                    <div className="mt-2 relative h-40 w-full rounded-md overflow-hidden">
                      <Image src={project.imageUrl} alt={project.title} layout="fill" objectFit="cover" data-ai-hint="project showcase" />
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground mb-2 whitespace-pre-line">{project.description}</p>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline block mb-2">
                      View Project &rarr;
                    </a>
                  )}
                  <div className="mt-2">
                    <span className="text-sm font-medium">Technologies:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map(tech => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Skills Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-accent" />
            <CardTitle className="text-xl font-headline text-primary">My Skills</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">List your technical and soft skills. Get them endorsed or verified.</CardDescription>
          <div className="flex gap-2 mb-4">
            <Input
              type="text"
              value={skillInput}
              onChange={handleSkillInputChange}
              placeholder="Enter a skill (e.g., JavaScript)"
              className="flex-grow"
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill();}}}
            />
            <Button onClick={handleAddSkill} className="bg-accent text-accent-foreground hover:bg-accent/90">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </div>
          {skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <Badge key={skill} variant="default" className="text-base py-1.5 px-3">
                  {skill}
                  <button onClick={() => handleRemoveSkill(skill)} className="ml-2 p-0.5 rounded-full hover:bg-primary-foreground/20 focus:outline-none focus:ring-1 focus:ring-background">
                    <XCircle className="h-4 w-4" />
                     <span className="sr-only">Remove {skill}</span>
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No skills added yet.</p>
          )}
        </CardContent>
      </Card>

      <Separator />

      {/* Resume Section */}
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Upload className="w-8 h-8 text-accent" />
            <CardTitle className="text-xl font-headline text-primary">My Resume/CV</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4">Upload your latest resume or CV. Keep it updated for employers.</CardDescription>
          {resume ? (
            <div className="p-4 border rounded-md bg-muted/50">
              <p className="font-medium text-foreground">{resume.name}</p>
              <p className="text-xs text-muted-foreground">Uploaded on: {resume.uploadDate}</p>
              <Button variant="destructive" size="sm" onClick={handleRemoveResume} className="mt-2">
                <Trash2 className="mr-2 h-4 w-4" /> Remove Resume
              </Button>
            </div>
          ) : (
            <div className="mt-6 p-6 border-2 border-dashed border-border rounded-lg text-center">
              <Label htmlFor="resumeUpload" className="cursor-pointer w-full flex flex-col items-center">
                <p className="text-muted-foreground mb-4">Drag & drop your file here, or click to browse.</p>
                 <Button asChild variant="outline" className="pointer-events-none">
                    <span><Upload className="mr-2 h-4 w-4" /> Upload Resume</span>
                 </Button>
              </Label>
              <Input id="resumeUpload" type="file" onChange={handleResumeUpload} className="hidden" accept=".pdf,.doc,.docx" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


    