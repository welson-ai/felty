import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border/50">
        <div className="text-2xl font-bold text-primary">Felty</div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
          Your Emotional Wellness Journey
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Track your emotions, journal your thoughts, and connect with mental health professionals. Felty is your companion for emotional wellbeing.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Start Free Today</Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">Sign In</Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-border/50">
            <div className="text-4xl mb-4">😊</div>
            <h3 className="text-xl font-semibold mb-2">Mood Tracking</h3>
            <p className="text-muted-foreground">
              Track your daily emotions and understand your emotional patterns over time.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-border/50">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">Journaling</h3>
            <p className="text-muted-foreground">
              Express your thoughts and feelings in a safe, private journaling space.
            </p>
          </div>
          <div className="bg-white rounded-lg p-8 shadow-sm border border-border/50">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-muted-foreground">
              Find and book sessions with licensed therapists in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8 text-center text-muted-foreground">
        <p>&copy; 2024 Felty. Your emotional wellness companion.</p>
      </footer>
    </main>
  );
}
