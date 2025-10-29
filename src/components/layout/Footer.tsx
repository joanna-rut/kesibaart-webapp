export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Kesiba Art. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
