// Stdin works!
import Head from 'next/head';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ModernButton, FloatingActionButton, IconButton } from '../components/ModernButton';

const HeroScene = dynamic(() => import('../components/HeroScene'), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center"><div className="text-gray-500">Loading 3D Scene...</div></div>
});

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-animated">
      <Head>
        <title>Claude Automated Portfolio</title>
        <meta name="description" content="Portfolio with Claude Code automation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <nav className="glass-effect shadow-lg sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-2xl font-bold text-gradient text-center flex-1 md:flex-initial md:text-left">My Portfolio</h2>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-white/10 dark:hover:bg-black/10 focus:outline-none transition-colors"
            >
              <svg className="w-6 h-6 text-gray-800 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            
            {/* Desktop menu */}
            <div className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition font-medium">About</a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition font-medium">Projects</a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition font-medium">Contact</a>
            </div>
          </div>
          
          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4 border-gray-200/20 dark:border-gray-700/20">
              <div className="flex flex-col space-y-3 text-center">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition py-2 font-medium">About</a>
                <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition py-2 font-medium">Projects</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition py-2 font-medium">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main>
        {/* Hero Section with Three.js */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HeroScene />
          </div>
          <div className="container mx-auto px-6 sm:px-8 md:px-4 py-16 md:py-24 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight animate-fade-in">
            <span className="text-gradient-animated">Welcome to My</span>
            <br />
            <span className="text-gradient">3D Portfolio</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-10 max-w-2xl mx-auto px-4">
            Full Stack Developer | Claude Code Automation Enthusiast
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <ModernButton href="#projects" variant="glow">
              View My Work
            </ModernButton>
            <ModernButton href="#contact" variant="secondary">
              Get In Touch
            </ModernButton>
          </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="glass-effect py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gradient mb-10">
              About Me
            </h2>
            <div className="max-w-3xl mx-auto text-center px-4">
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                I'm a passionate developer who loves creating innovative solutions. This portfolio 
                showcases my work and is powered by cutting-edge Claude Code automation.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed">
                I specialize in modern web technologies including Next.js, Three.js, and AI-powered 
                development workflows. My approach combines clean code with intelligent automation.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-20 relative overflow-hidden">
          <div className="container mx-auto px-6 sm:px-8 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gradient mb-12">
              Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-2 sm:px-0">
              <div className="modern-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-br from-lime-400 to-teal-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Project One</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    A full-stack application built with Next.js and modern tools.
                  </p>
                  <a href="#" className="inline-block text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
              <div className="modern-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-br from-teal-400 to-lime-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Project Two</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    Interactive 3D experiences using Three.js and WebGL.
                  </p>
                  <a href="#" className="inline-block text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
              <div className="modern-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="h-48 bg-gradient-to-br from-lime-500 to-teal-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Project Three</h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    AI-powered automation tools and workflows.
                  </p>
                  <a href="#" className="inline-block text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm transition-colors">
                    Learn More →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Claude Automation Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-20">
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
                  <div className="bg-gradient-to-br from-lime-500/20 to-lime-600/20 rounded-xl p-6 hover:from-lime-500/30 hover:to-lime-600/30 transition-all duration-300 border border-lime-500/20">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">Auto-Fix Issues</h3>
                    <p className="text-gray-400 text-sm">
                      Create tagged issues and get instant fixes
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-xl p-6 hover:from-teal-500/30 hover:to-teal-600/30 transition-all duration-300 border border-teal-500/20">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">Auto-Deploy</h3>
                    <p className="text-gray-400 text-sm">
                      Changes are pushed and deployed instantly
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-lime-600/20 to-teal-500/20 rounded-xl p-6 hover:from-lime-600/30 hover:to-teal-500/30 transition-all duration-300 border border-teal-500/20">
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
        <section id="contact" className="glass-effect py-16 md:py-20">
          <div className="container mx-auto px-6 sm:px-8 md:px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gradient mb-10">
              Get In Touch
            </h2>
            <div className="max-w-2xl mx-auto text-center px-4">
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg mb-8">
                I'm always open to discussing new projects and opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ModernButton href="mailto:hello@example.com" variant="primary">
                  Email Me
                </ModernButton>
                <ModernButton href="https://github.com" variant="secondary">
                  GitHub
                </ModernButton>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8">
        <div className="container mx-auto px-6 sm:px-8 md:px-4 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 My Portfolio. Powered by Claude Code Automation.
          </p>
        </div>
      </footer>
      
      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        icon={
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
          </svg>
        }
      />
    </div>
  );
}