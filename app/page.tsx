export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gradient-to-b from-gray-900/50 to-gray-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
              <span className="text-white font-bold text-lg">EmailAI</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-gray-300 hover:text-white transition">
                Features
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">
                Pricing
              </a>
              <a
                href="/dashboard"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Generate Cold Emails That{' '}
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Convert
            </span>
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Stop writing boring cold emails. Get 3 AI-generated variations in seconds that are personalized, compelling, and ready to send.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition text-center"
            >
              Start Generating Free
            </a>
            <a
              href="#features"
              className="px-8 py-4 border border-gray-600 hover:border-gray-500 text-white rounded-lg font-semibold transition text-center"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose EmailAI?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '⚡',
              title: 'Lightning Fast',
              description: 'Get 3 email variations in under 10 seconds',
            },
            {
              icon: '🎯',
              title: 'Highly Personalized',
              description: 'Each email is tailored to your prospect\'s specific pain point',
            },
            {
              icon: '🔄',
              title: '3 Unique Angles',
              description: 'Short, medium, and professional versions for different scenarios',
            },
            {
              icon: '✨',
              title: 'AI-Powered',
              description: 'Built with GPT-4o-mini for high-quality, natural writing',
            },
            {
              icon: '📋',
              title: 'Easy to Use',
              description: 'Just fill in 6 fields and let AI do the work',
            },
            {
              icon: '💾',
              title: 'Save & Manage',
              description: 'Keep track of all your generated emails in one place',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-blue-500/50 transition"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Plan */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <p className="text-gray-400 mb-6">Perfect for getting started</p>
            <div className="mb-6">
              <div className="text-4xl font-bold text-white">$0</div>
              <p className="text-gray-400 text-sm mt-2">Forever free</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400">✓</span> 3 emails per day
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400">✓</span> 3 variations per email
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400">✓</span> Email history
              </li>
              <li className="flex items-center gap-3 text-gray-500">
                <span className="text-gray-600">✗</span> Advanced analytics
              </li>
            </ul>
            <a
              href="/dashboard"
              className="w-full px-6 py-3 border border-gray-600 hover:border-gray-500 text-white rounded-lg font-medium transition text-center"
            >
              Get Started
            </a>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-500/50 rounded-xl p-8 relative">
            <div className="absolute -top-4 left-6 px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
              POPULAR
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-gray-300 mb-6">For serious sales teams</p>
            <div className="mb-6">
              <div className="text-4xl font-bold text-white">
                $9<span className="text-lg text-gray-400">/mo</span>
              </div>
              <p className="text-gray-400 text-sm mt-2">Billed monthly</p>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400">✓</span> Unlimited emails
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400">✓</span> 3 variations per email
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400">✓</span> Email history
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <span className="text-blue-400">✓</span> Advanced analytics
              </li>
            </ul>
            <a
              href="/dashboard"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-medium transition text-center"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Outreach?</h2>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Start generating high-converting cold emails today. No credit card required.
        </p>
        <a
          href="/dashboard"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition"
        >
          Get Started Free
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg"></div>
              <span className="text-white font-bold">EmailAI</span>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 EmailAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
