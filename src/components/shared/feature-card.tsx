import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon: Icon, title, description, className }: FeatureCardProps) {
  return (
    <Card className={`shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="p-3 bg-accent/20 rounded-full">
          <Icon className="w-8 h-8 text-accent" />
        </div>
        <CardTitle className="text-xl font-headline text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
