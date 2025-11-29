import React from "react";
import {
  MapPin,
  Users,
  Star,
  GitFork,
  Book,
  Calendar,
  Github,
  ExternalLink,
} from "lucide-react";
import Dither from "./components/Dither";
import GlassSurface from "./components/GlassSurface";

// --- Data ---

const profile = {
  name: "Louie",
  handle: "NikkeTryHard",
  bio: "To be is to be perceived.",
  location: "Texas, US",
  stats: {
    repos: 21,
    stars: 21,
    followers: 1,
    following: 3,
  },
  contributions: 1108,
};

const repositories = [
  {
    name: "HackUTD2025",
    description: "HackUTD 2025 Project",
    language: "TypeScript",
    color: "#3178c6",
    stars: 1,
    forks: 1,
  },
  {
    name: "tenhou-to-mjai",
    description:
      "Converts Tenhou game logs into mjai format for Mortal AI training.",
    language: "C",
    color: "#555555",
    stars: 6,
    forks: 0,
  },
  {
    name: "AIstudioProxyAPI",
    description: "FastAPI + Playwright + Camoufox...",
    language: "Python",
    color: "#3572A5",
    stars: 1800,
    forks: 316,
  },
  {
    name: "CodebaseToText",
    description: "",
    language: "C++",
    color: "#f34b7d",
    stars: 1,
    forks: 0,
  },
  {
    name: "MotiAIPC",
    description: "",
    language: "JavaScript",
    color: "#f1e05a",
    stars: 0,
    forks: 0,
  },
  {
    name: "mathlab.github.io",
    description: "A website to share ideas with friends.",
    language: "JavaScript",
    color: "#f1e05a",
    stars: 1,
    forks: 1,
  },
];

// --- Components ---

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full text-white font-sans selection:bg-white/20 relative overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <Dither
          waveSpeed={0.05}
          waveFrequency={3}
          waveAmplitude={0.3}
          waveColor={[0.5, 0.5, 0.5]}
          colorNum={4}
          pixelSize={2}
          enableMouseInteraction={true}
          mouseRadius={0.3}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto p-6 md:p-12 space-y-16">
        {/* Header Section */}
        <header className="space-y-8">
          {/* Large Title with Difference Blend Mode */}
          <div className="mix-blend-difference">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white">
              {profile.handle}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/80 mt-2 ml-1">
              {profile.bio}
            </p>
          </div>

          {/* Profile Card */}
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={50}
            borderWidth={0.07}
            opacity={0.93}
            mixBlendMode="difference"
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            distortionScale={-180}
            className="p-8 md:p-10"
          >
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full mix-blend-difference text-white">
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-white flex items-center justify-center">
                  <Github size={48} />
                </div>
              </div>

              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h2 className="text-3xl font-bold">{profile.name}</h2>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-white/80 mt-1">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>{profile.stats.followers} followers</span>
                    <span>·</span>
                    <span>{profile.stats.following} following</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={18} />
                    <span>{profile.stats.stars} stars</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassSurface>
        </header>

        {/* Repositories Grid */}
        <section>
          <div className="mix-blend-difference mb-8">
            <h2 className="text-4xl font-bold text-white flex items-center gap-3">
              <Book className="stroke-[3px]" />
              Repositories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repositories.map((repo) => (
              <div key={repo.name} className="h-full group">
                <GlassSurface
                  width="100%"
                  height="100%"
                  borderRadius={50}
                  borderWidth={0.07}
                  opacity={0.93}
                  mixBlendMode="difference"
                  redOffset={0}
                  greenOffset={10}
                  blueOffset={20}
                  distortionScale={-180}
                  className="p-8 transition-transform duration-300 group-hover:-translate-y-2"
                >
                  <div className="flex flex-col h-full w-full mix-blend-difference text-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold truncate pr-4">
                        {repo.name}
                      </h3>
                      <ExternalLink size={18} className="opacity-50" />
                    </div>

                    <p className="text-sm text-white/80 mb-6 flex-1 leading-relaxed font-light">
                      {repo.description || "No description provided."}
                    </p>

                    <div className="flex items-center gap-4 text-xs font-bold mt-auto">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3 h-3 rounded-full border border-white"
                          style={{ backgroundColor: repo.color }}
                        />
                        <span>{repo.language}</span>
                      </div>
                      {repo.stars > 0 && (
                        <div className="flex items-center gap-1">
                          <Star size={14} />
                          <span>{repo.stars}</span>
                        </div>
                      )}
                      {repo.forks > 0 && (
                        <div className="flex items-center gap-1">
                          <GitFork size={14} />
                          <span>{repo.forks}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </GlassSurface>
              </div>
            ))}
          </div>
        </section>

        {/* Footer / Stats */}
        <footer className="pb-12">
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={50}
            borderWidth={0.07}
            opacity={0.93}
            mixBlendMode="difference"
            redOffset={0}
            greenOffset={10}
            blueOffset={20}
            distortionScale={-180}
            className="p-8"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full mix-blend-difference text-white">
              <div className="flex items-center gap-4">
                <div className="p-3 border-2 border-white rounded-full">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    {profile.contributions.toLocaleString()} Contributions
                  </h3>
                  <p className="text-sm opacity-70">in the last year</p>
                </div>
              </div>

              <div className="text-sm opacity-50 font-light">
                © {new Date().getFullYear()} NikkeTryHard
              </div>
            </div>
          </GlassSurface>
        </footer>
      </main>
    </div>
  );
};

export default App;
