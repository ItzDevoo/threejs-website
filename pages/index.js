// Stdin works!
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Claude Automated Portfolio</title>
        <meta name="description" content="Portfolio with Claude Code automation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center flex-1 md:flex-initial md:text-left">My Portfolio</h2>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-600 hover:text-gray-900 transition">About</a>
              <a href="#projects" className="text-gray-600 hover:text-gray-900 transition">Projects</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3 text-center">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 transition py-2">About</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 transition py-2">Projects</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-600 hover:text-gray-900 transition py-2">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 sm:px-8 md:px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to My Portfolio
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto px-4">
            Full Stack Developer | Claude Code Automation Enthusiast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <a href="#projects" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg">
              View My Work
            </a>
            <a href="#contact" className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
              Get In Touch
            </a>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
              About Me
            </h2>
            <div className="max-w-3xl mx-auto text-center px-4">
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                I'm a passionate developer who loves creating innovative solutions. This portfolio 
                showcases my work and is powered by cutting-edge Claude Code automation.
              </p>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                I specialize in modern web technologies including Next.js, Three.js, and AI-powered 
                development workflows. My approach combines clean code with intelligent automation.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Project One</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    A full-stack application built with Next.js and modern tools.
                  </p>
                  <a href="#" className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600"></div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Two</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    Interactive 3D experiences using Three.js and WebGL.
                  </p>
                  <a href="#" className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Project Three</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    AI-powered automation tools and workflows.
                  </p>
                  <a href="#" className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Claude Automation Section */}
        <section className="bg-gray-900 text-white py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10">
              Powered by Claude Automation
            </h2>
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-gray-300 text-center text-base sm:text-lg mb-10">
                This portfolio is automatically maintained by Claude Code. Create a GitHub issue 
                starting with "(Claude)" and watch the magic happen!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-green-500/20 rounded-xl p-6 hover:bg-green-500/30 transition-colors">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">Auto-Fix Issues</h3>
                    <p className="text-gray-400 text-sm">
                      Create tagged issues and get instant fixes
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500/20 rounded-xl p-6 hover:bg-blue-500/30 transition-colors">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">Auto-Deploy</h3>
                    <p className="text-gray-400 text-sm">
                      Changes are pushed and deployed instantly
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/20 rounded-xl p-6 hover:bg-purple-500/30 transition-colors">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">Auto-Response</h3>
                    <p className="text-gray-400 text-sm">
                      Get detailed reports on every fix
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
              Get In Touch
            </h2>
            <div className="max-w-2xl mx-auto text-center px-4">
              <p className="text-gray-600 text-base sm:text-lg mb-8">
                I'm always open to discussing new projects and opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:hello@example.com" className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg">
                  Email Me
                </a>
                <a href="https://github.com" className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition font-medium">
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 sm:px-8 md:px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 My Portfolio. Powered by Claude Code Automation.
          </p>
        </div>
      </footer>
    </div>
  );
}