import { ArrowRight, ExternalLink, Github, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const projects = [
  {
    id: 1,
    title: "Jspot - Motorcycle Parts Management System",
    description:
      "A full-featured inventory and point-of-sale system for a motorcycle parts shop. Includes admin dashboard, product management, inventory tracking, sales records, and a complete POS with cart and checkout.",
    tags: ["React", "PHP", "CodeIgniter", "MySQL", "Tailwind CSS", "Bootstrap"],
    githubUrl: "https://github.com/razorcheng03",
    images: [
      { src: "/projects/jspot-dashboard.png", label: "Admin Dashboard" },
      { src: "/projects/jspot-pos.png", label: "Product Management" },
      { src: "/projects/jspot-sales.png", label: "Sales Record" },
      { src: "/projects/jspot-4.png", label: "Point of Sale - Cart" },
      { src: "/projects/jspot-5.png", label: "Transaction History" },
      { src: "/projects/jspot-team.jpg", label: "The Team Behind Jspot" },
    ],
  },
];

export const ProjectsSection = () => {
  const [expandedProject, setExpandedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleExpand = (project) => {
    setExpandedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setExpandedProject(null);
    document.body.style.overflow = "";
  };

  const nextImage = useCallback(() => {
    if (expandedProject) {
      setCurrentImageIndex((prev) =>
        prev === expandedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  }, [expandedProject]);

  const prevImage = useCallback(() => {
    if (expandedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? expandedProject.images.length - 1 : prev - 1
      );
    }
  }, [expandedProject]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!expandedProject) return;
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expandedProject, nextImage, prevImage]);

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary"> Featured Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-card/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-white/5 hover:border-primary/20 transition-all duration-500"
            >
              {/* Image Preview with Click to Expand */}
              <div
                className="relative h-64 md:h-80 overflow-hidden cursor-pointer"
                onClick={() => handleExpand(project)}
              >
                <img
                  src={project.images[0].src}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white font-semibold text-sm tracking-wide">
                    <Maximize2 size={18} />
                    CLICK TO EXPAND
                  </div>
                </div>
                {/* Image count badge */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-xs text-white/80 font-medium">
                  {project.images.length} screenshots
                </div>
              </div>

              {/* Info */}
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold border border-primary/20 rounded-full bg-primary/5 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} GitHub repository`}
                    className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-300"
                  >
                    <Github size={18} />
                    <span>Source Code</span>
                  </a>
                  <button
                    onClick={() => handleExpand(project)}
                    className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors duration-300 ml-auto"
                  >
                    <Maximize2 size={18} />
                    <span>View Screenshots</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/razorcheng03"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>

      {/* Expanded Modal / Lightbox */}
      {expandedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/85 backdrop-blur-xl" />

          {/* Modal Content */}
          <div
            className="relative z-10 w-full max-w-5xl flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-2 right-0 md:-right-4 z-20 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>

            {/* Image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={expandedProject.images[currentImageIndex].src}
                alt={expandedProject.images[currentImageIndex].label}
                className="w-full h-auto max-h-[70vh] object-contain bg-black/50"
              />

              {/* Prev / Next Buttons */}
              {expandedProject.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 backdrop-blur-md rounded-full text-white transition-all duration-300 hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {/* Image Label & Dots */}
            <div className="mt-6 flex flex-col items-center gap-4">
              <p className="text-white font-semibold text-lg tracking-wide">
                {expandedProject.images[currentImageIndex].label}
              </p>

              {/* Dot Indicators */}
              <div className="flex items-center gap-3">
                {expandedProject.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentImageIndex
                        ? "bg-primary w-8 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.6)]"
                        : "bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`View ${img.label}`}
                  />
                ))}
              </div>

              {/* Counter */}
              <p className="text-white/50 text-xs tracking-widest uppercase">
                {currentImageIndex + 1} / {expandedProject.images.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
