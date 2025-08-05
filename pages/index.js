import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <Head>
        <title>Claude Automated Portfolio</title>
        <meta name="description" content="Portfolio with Claude Code automation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Welcome to My Portfolio
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Powered by Claude Code Automation
          </p>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">🤖 Claude Automation Active</h2>
            <p className="text-gray-200">
              This portfolio is automatically maintained by Claude Code. 
              Create a GitHub issue starting with "(Claude)" and watch the magic happen!
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-500/20 p-4 rounded">
                <div className="font-semibold">Auto-Fix Issues</div>
                <div className="text-gray-300">Create tagged issues</div>
              </div>
              <div className="bg-blue-500/20 p-4 rounded">
                <div className="font-semibold">Auto-Deploy</div>
                <div className="text-gray-300">Changes pushed instantly</div>
              </div>
              <div className="bg-purple-500/20 p-4 rounded">
                <div className="font-semibold">Auto-Response</div>
                <div className="text-gray-300">Detailed fix reports</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}