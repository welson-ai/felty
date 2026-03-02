import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="text-2xl font-bold text-white">Felty</div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center relative">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold mb-4">
            Emotional Wellness Platform
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Transform Your
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Emotional Health
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Track your emotions, journal your thoughts, and connect with mental health professionals. 
          Felty is your AI-powered companion for emotional wellbeing and personal growth.
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Link href="/signup">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
              Start Free Today
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg">
              Sign In
            </Button>
          </Link>
        </div>
        
        {/* Hero Image */}
        <div className="relative w-full h-[60vh] min-h-[400px] max-h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1541480601022-2308c0f02487?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Emotional wellness and mental health support"
            className="w-full h-full object-cover rounded-2xl shadow-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="text-white text-center">
              <p className="text-lg font-medium mb-2">Join thousands on their wellness journey</p>
              <div className="flex items-center justify-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>50K+ Active Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>500+ Therapists</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>98% Satisfaction</span>
                </div>
              </div>
            </div>
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
