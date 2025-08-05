import Head from 'next/head';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('../components/HeroScene'), {
  ssr: false,
  loading: () => <div className="h-screen bg-black" />
});

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>Portfolio | Full Stack Developer</title>
        <meta name="description" content="Professional portfolio showcasing modern web development" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Three.js Background */}
      <HeroScene />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-40 mix-blend-difference">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-light tracking-wider">PORTFOLIO</h2>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="hover:text-blue-400 transition-colors duration-300">About</a>
              <a href="#work" className="hover:text-blue-400 transition-colors duration-300">Work</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors duration-300">Skills</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a>
            </div>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-50 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-6 p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light">About</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light">Work</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light">Skills</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-light">Contact</a>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center">
          <div className="text-center z-10 px-6">
            <h1 className="text-5xl md:text-7xl font-extralight tracking-wide mb-4">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                CREATIVE
              </span>
              <span className="block mt-2">DEVELOPER</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mt-6 font-light">
              Building digital experiences with code and creativity
            </p>
            <div className="mt-12">
              <a 
                href="#work" 
                className="inline-flex items-center gap-2 px-8 py-3 border border-gray-700 hover:border-blue-500 transition-all duration-300 group"
              >
                <span>View Projects</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
              <span className="text-gray-500">01.</span> About
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  I'm a full-stack developer passionate about creating immersive digital experiences. 
                  With expertise in modern web technologies, I bridge the gap between design and functionality.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  My approach combines clean code architecture with thoughtful user experience, 
                  leveraging cutting-edge tools and frameworks to build scalable solutions.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-blue-400 mb-2">Frontend</h3>
                  <p className="text-gray-400">React, Next.js, Three.js, TypeScript</p>
                </div>
                <div>
                  <h3 className="text-blue-400 mb-2">Backend</h3>
                  <p className="text-gray-400">Node.js, Python, PostgreSQL, MongoDB</p>
                </div>
                <div>
                  <h3 className="text-blue-400 mb-2">Tools</h3>
                  <p className="text-gray-400">Docker, AWS, Git, CI/CD</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="work" className="relative py-32 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
              <span className="text-gray-500">02.</span> Work
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "E-Commerce Platform",
                  tech: "Next.js, Stripe, PostgreSQL",
                  description: "Full-stack e-commerce solution with real-time inventory management"
                },
                {
                  title: "3D Product Visualizer",
                  tech: "Three.js, React, WebGL",
                  description: "Interactive 3D product customization tool with real-time rendering"
                },
                {
                  title: "Data Analytics Dashboard",
                  tech: "D3.js, Python, Redis",
                  description: "Real-time data visualization platform for business intelligence"
                },
                {
                  title: "AI Content Generator",
                  tech: "OpenAI API, Node.js, React",
                  description: "AI-powered content creation tool with custom training models"
                }
              ].map((project, index) => (
                <div 
                  key={index}
                  className="group relative border border-gray-800 p-8 hover:border-blue-500 transition-all duration-300"
                >
                  <div className="absolute top-4 right-4 text-gray-700 text-4xl font-light">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-light mb-2">{project.title}</h3>
                  <p className="text-blue-400 text-sm mb-4">{project.tech}</p>
                  <p className="text-gray-400">{project.description}</p>
                  <div className="mt-6">
                    <a 
                      href="#" 
                      className="inline-flex items-center gap-2 text-sm group-hover:text-blue-400 transition-colors"
                    >
                      View Project
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="relative py-32 px-6">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-light mb-16 text-center">
              <span className="text-gray-500">03.</span> Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                'JavaScript', 'TypeScript', 'React', 'Next.js',
                'Three.js', 'Node.js', 'Python', 'PostgreSQL',
                'MongoDB', 'Docker', 'AWS', 'Git',
                'Tailwind', 'GraphQL', 'Redis', 'WebGL'
              ].map((skill, index) => (
                <div 
                  key={index}
                  className="text-center py-4 border border-gray-800 hover:border-blue-500 transition-colors duration-300"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative py-32 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-light mb-8">
              <span className="text-gray-500">04.</span> Let's Connect
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. 
              Feel free to reach out if you'd like to work together.
            </p>
            <div className="flex justify-center gap-8">
              <a 
                href="mailto:hello@example.com" 
                className="px-8 py-3 border border-blue-500 hover:bg-blue-500 hover:text-black transition-all duration-300"
              >
                Get In Touch
              </a>
              <a 
                href="https://github.com" 
                className="px-8 py-3 border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-gray-800">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Portfolio. Built with Next.js & Three.js
          </p>
        </div>
      </footer>
    </div>
  );
}