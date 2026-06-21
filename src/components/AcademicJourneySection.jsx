import { useState } from "react";
import { BookOpen, GraduationCap, School, X } from "lucide-react";

const journeyItems = [
  {
    year: "2012",
    title: "Elementary School Graduate",
    description:
      "Graduated from Tablon Elementary School. This was the first big step in my academic journey, filled with fun memories and foundational learning.",
    icon: School,
    image: "/images/elementary-graduation.jpg",
    caption:
      "Graduated from Tablon Elementary School. This was the first big step in my academic journey, filled with fun memories and foundational learning.",
  },
  {
    year: "2018",
    title: "High School Graduate",
    description:
      "Completed my studies at Tablon National High School. Here, I discovered my love for technology and made lifelong friends.",
    icon: BookOpen,
    image: "/images/high-school-graduation.jpg",
    caption:
      "Completed my studies at Tablon National High School. Here, I discovered my love for technology and made lifelong friends.",
  },
  {
    year: "2020",
    title: "Senior High School Graduate",
    description:
      "Graduated from Tablon Senior High School, majoring in EIM (Electrical Installation and Maintenance). This period shaped my technical skills and hands-on experience with electrical systems.",
    icon: GraduationCap,
    image: "/images/senior-high-graduation.jpg",
    caption:
      "Graduated from Tablon Senior High School, majoring in EIM (Electrical Installation and Maintenance). This period shaped my technical skills and hands-on experience with electrical systems.",
  },
  {
    year: "Current",
    title: "College (Tagoloan Community College)",
    description:
      "Currently pursuing a Bachelor of Science in Information Technology. I am excited for the future and the opportunities ahead!",
    icon: GraduationCap,
    image: "/images/college.jpg",
    caption:
      "Currently pursuing a Bachelor of Science in Information Technology at Tagoloan Community College. I am excited for the future and the opportunities ahead!",
  },
];

export const AcademicJourneySection = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <section
        id="academic"
        className="relative min-h-screen flex items-center px-4 py-24"
      >
        <div className="absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-primary/10 blur-3xl" />

        <div className="container mx-auto max-w-5xl">
          <div className="px-5 py-10 text-left sm:px-8 md:px-12">
            <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-5xl">
              My{" "}
              <span className="text-primary">Academic Journey</span>
            </h2>

            <div className="relative mx-auto max-w-3xl">
              <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-primary to-primary/60" />

              <div className="space-y-8">
                {journeyItems.map((item) => {
                  const Icon = item.icon;
                  const hasMemory = Boolean(item.image);

                  return (
                    <div key={item.year} className="relative pl-16">
                      {hasMemory ? (
                        <button
                          type="button"
                          onClick={() => setSelectedItem(item)}
                          className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-card shadow-[0_0_0_3px_rgba(139,92,246,0.5)] transition-transform duration-300 hover:scale-110 focus:outline-hidden focus:ring-2 focus:ring-primary"
                          aria-label={`View ${item.title} memory`}
                        >
                          <img
                            src={item.image}
                            alt=""
                            aria-hidden="true"
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ) : (
                        <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-card shadow-[0_0_0_3px_rgba(139,92,246,0.5)]">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                      )}

                      {hasMemory ? (
                        <button
                          type="button"
                          onClick={() => setSelectedItem(item)}
                          className="block w-full rounded-lg border border-border bg-card p-6 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 focus:outline-hidden focus:ring-2 focus:ring-primary"
                        >
                          <p className="mb-4 text-lg font-bold text-foreground">{item.year}</p>
                          <h3 className="mb-3 font-semibold text-primary">
                            {item.title}
                          </h3>
                          <p className="leading-relaxed text-foreground/70">
                            {item.description}
                          </p>
                        </button>
                      ) : (
                        <article className="rounded-lg border border-border bg-card p-6 shadow-md">
                          <p className="mb-4 text-lg font-bold text-foreground">{item.year}</p>
                          <h3 className="mb-3 font-semibold text-primary">
                            {item.title}
                          </h3>
                          <p className="leading-relaxed text-foreground/70">
                            {item.description}
                          </p>
                        </article>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030712]/80 px-4 py-8 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
          aria-labelledby="academic-memory-title"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-primary/20 bg-card/95 p-6 text-center shadow-2xl shadow-primary/20 backdrop-blur-sm sm:p-10"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedItem(null)}
              className="absolute right-4 top-4 z-10 rounded-full p-2 text-foreground/50 transition-all duration-300 hover:bg-primary/10 hover:text-primary focus:outline-hidden focus:ring-2 focus:ring-primary"
              aria-label="Close academic memory"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative overflow-hidden rounded-xl">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="mx-auto max-h-[60vh] w-auto rounded-xl object-contain"
              />
            </div>

            <div className="mt-6 space-y-2">
              <span className="inline-block rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                {selectedItem.year}
              </span>
              <h3
                id="academic-memory-title"
                className="text-2xl font-bold text-foreground"
              >
                {selectedItem.title}
              </h3>
              <p className="mx-auto max-w-lg leading-relaxed text-foreground/70">
                {selectedItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
