import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section with Light Purple Theme */}
      <section className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 text-center relative">
        {/* Navigation at Bottom */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-purple-200/50 px-6 py-4 z-50">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div className="text-xl font-bold text-purple-900">Felty</div>
            <div className="flex gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-purple-700 hover:bg-purple-100">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">Get Started</Button>
              </Link>
            </div>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-700 rounded-full text-xs font-semibold">
              Emotional Wellness Platform
            </span>
          </div>
          <p className="text-lg text-purple-800 mb-6 max-w-3xl mx-auto leading-relaxed">
            Track your emotions, journal your thoughts, and connect with mental health professionals. 
            Felty is your AI-powered companion for emotional wellbeing and personal growth.
          </p>
          
          {/* Hero Image */}
          <div className="relative w-full h-[50vh] min-h-[350px] max-h-[500px] mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-200/40 via-purple-300/30 to-transparent z-10"></div>
            <img 
              src="/hero image.png"
              alt="Emotional wellness and mental health support"
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="text-purple-900 text-center">
                <p className="text-sm font-medium mb-2">Join thousands on their wellness journey</p>
                <div className="flex items-center justify-center gap-6 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span>50K+ Active Users</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>500+ Therapists</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>98% Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex gap-3 justify-center mb-20">
            <Link href="/signup">
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2">
                Start Free Today
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-100 px-6 py-2">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center text-white mb-4">Powerful Features</h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Everything you need for your emotional wellness journey, powered by cutting-edge technology
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">�</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h3>
            <p className="text-gray-300">
              Track your daily emotions with AI-powered insights and understand your emotional patterns over time.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">�</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Private Journaling</h3>
            <p className="text-gray-300">
              Express your thoughts and feelings in a secure, encrypted journaling space with zero-knowledge proofs.
            </p>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Professional Support</h3>
            <p className="text-gray-300">
              Connect with licensed therapists and mental health professionals for personalized guidance.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-white mb-2">50K+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">1M+</div>
            <div className="text-gray-300">Emotion Entries</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">500+</div>
            <div className="text-gray-300">Therapists</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-gray-300">Satisfaction Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-12 border border-purple-500/20">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have transformed their emotional health with Felty. 
            Start your free trial today and take the first step towards better emotional wellness.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-12 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-gray-400 mb-4">
            &copy; 2024 Felty. Your emotional wellness companion.
          </div>
          <div className="text-gray-500 text-sm">
            Built with ❤️ for better mental health worldwide
          </div>
        </div>
      </footer>
    </main>
  );
}
