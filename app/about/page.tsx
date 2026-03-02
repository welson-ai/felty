import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">About Scroll Souls</h1>
        
        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <p className="text-lg">
            Scroll Souls is a comprehensive emotional wellness platform designed to support your mental health journey. We believe that everyone deserves access to tools and resources that help them understand, process, and improve their emotional well-being.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p>
              We're committed to making mental health support accessible, affordable, and stigma-free. Through our platform, we provide daily check-in prompts, journaling tools, mood tracking, and connections to mental health professionals who can support your wellness journey.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">What We Offer</h2>
            <ul className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong>Daily Check-ins:</strong> Quick mood assessments that help you track emotional patterns over time</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong>Journaling:</strong> Private space to reflect on your feelings and experiences</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong>Mood Wall:</strong> Share and connect with others about your emotional experiences</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong>Therapist Directory:</strong> Find qualified mental health professionals in our network</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong>Organizations:</strong> Connect with mental health organizations and support groups</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent mt-1">•</span>
                <span><strong>Achievement Badges:</strong> Celebrate your progress and consistency in self-care</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Why Scroll Souls?</h2>
            <p>
              We understand that mental health is personal. That's why we've built Scroll Souls as a judgment-free space where you can explore your emotions at your own pace. Whether you're looking to understand yourself better, track your mood trends, or connect with professional help, we're here to support you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Privacy & Safety</h2>
            <p>
              Your privacy is paramount. All your journal entries, check-ins, and personal information are securely stored and encrypted. You control who sees what on your profile, and your data will never be sold to third parties.
            </p>
          </section>
        </div>

        <div className="mt-12 flex gap-4">
          <Link href="/signup">
            <Button className="bg-primary text-primary-foreground">Get Started</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back Home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
