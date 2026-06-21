import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 pt-20"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/images/archier-portrait.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-[78vh] min-h-[460px] w-auto -translate-x-1/2 object-contain opacity-[0.16] grayscale saturate-0 contrast-125 sm:h-[88vh] md:left-[60%] md:h-[96vh] md:-translate-x-0 lg:left-[55%] lg:h-[108vh]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-[#020617] via-[#020617]/75 to-transparent" />
      </div>

      <div className="container max-w-5xl mx-auto text-left z-10">
        <div className="max-w-3xl space-y-6">
          <p className="text-xl md:text-2xl font-semibold text-primary opacity-0 animate-fade-in">
            Hi, I am
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-none">
            <span className="block opacity-0 animate-fade-in-delay-1">
              Archier
            </span>
            <span className="block text-primary opacity-0 animate-fade-in-delay-2">
              Lacson
            </span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/70 max-w-2xl opacity-0 animate-fade-in-delay-3">
            I am a College Student passionate about creating stellar web
            experiences. I build interfaces that are both beautiful and
            functional.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
