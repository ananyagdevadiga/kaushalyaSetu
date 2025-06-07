
export function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground py-6 text-center mt-auto">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} KaushalyaSetu. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Empowering Karnataka&apos;s Future Workforce.
        </p>
      </div>
    </footer>
  );
}
