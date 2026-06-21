import { motion } from "framer-motion";

const skillsRow1 = [
  { name: "HTML5", icon: "html" },
  { name: "CSS3", icon: "css" },
  { name: "JavaScript", icon: "js" },
  { name: "React", icon: "react" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Bootstrap", icon: "bootstrap" },
  { name: "PHP", icon: "php" },
  { name: "Laravel", icon: "laravel" },
];

const skillsRow2 = [
  { name: "Node.js", icon: "nodejs" },
  { name: "MySQL", icon: "mysql" },
  { name: "Python", icon: "python" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Vite", icon: "vite" },
  { name: "NPM", icon: "npm" },
  { name: "Docker", icon: "docker" },
];

// Duplicate for seamless loop
const duplicatedSkills1 = [...skillsRow1, ...skillsRow1, ...skillsRow1];
const duplicatedSkills2 = [...skillsRow2, ...skillsRow2, ...skillsRow2];

export const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-4 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
          My <span className="text-primary"> Skills</span>
        </h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          The technologies and tools I use to bring ideas to life.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {/* Row 1: Left to Right */}
        <div className="relative flex whitespace-nowrap">
          <motion.div
            className="flex gap-8 items-center"
            animate={{
              x: ["0%", "-33.33%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {duplicatedSkills1.map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-card/20 backdrop-blur-xl rounded-[2rem] border border-white/5 flex items-center justify-center group hover:bg-card/40 transition-all duration-500 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={`https://skillicons.dev/icons?i=${skill.icon}`}
                  alt={skill.name}
                  className="w-12 h-12 md:w-16 md:h-16 group-hover:scale-115 transition-transform duration-500 relative z-10"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="relative flex whitespace-nowrap">
          <motion.div
            className="flex gap-8 items-center"
            initial={{ x: "-33.33%" }}
            animate={{
              x: ["-33.33%", "0%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {duplicatedSkills2.map((skill, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 bg-card/20 backdrop-blur-xl rounded-[2rem] border border-white/5 flex items-center justify-center group hover:bg-card/40 transition-all duration-500 shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={`https://skillicons.dev/icons?i=${skill.icon}`}
                  alt={skill.name}
                  className="w-12 h-12 md:w-16 md:h-16 group-hover:scale-115 transition-transform duration-500 relative z-10"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Side Fades */}
      <div className="absolute inset-y-0 left-0 w-40 bg-linear-to-r from-[#020617] via-[#020617]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-40 bg-linear-to-l from-[#020617] via-[#020617]/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
