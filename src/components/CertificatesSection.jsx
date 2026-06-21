import { useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const certificates = [
  {
    id: 1,
    category: "AI & LITERACY",
    title: "Combating Fake News, Hoax, and Misinformation",
    issuer: "AI Ready ASEAN / SmartCT",
    date: "APRIL 07, 2026",
    image: "/images/certificates/fake-news.png",
  },
  {
    id: 2,
    category: "AI & EDUCATION",
    title:
      "Awareness-Raising Campaign on AI Through Hour of Code and AI Class ASEAN",
    issuer: "Break The Fake Movement / ASEAN Foundation",
    date: "MARCH 24, 2026",
    image: "/images/certificates/ai-class.png",
  },
  {
    id: 3,
    category: "INTELLECTUAL PROPERTY",
    title: "Intellectual Property Strategy: Protection and Registration Essentials",
    issuer: "DICT - CAR",
    date: "APRIL 21, 2026",
    image: "/images/certificates/ip-strategy.png",
  },
  {
    id: 4,
    category: "CYBERSECURITY",
    title: "Digital Bayanihan: Para sa Kabataang Ligtas at Protektado Online",
    issuer: "DICT-CAR",
    date: "MARCH 14, 2026",
    image: "/images/certificates/digital-bayanihan.png",
  },
  {
    id: 5,
    category: "AI LITERACY",
    title: "AI Learning Modules (AI Ready ASEAN)",
    issuer: "ASEAN Foundation / Google.org",
    date: "APRIL 08, 2026",
    image: "/images/certificates/ai-modules.png",
  },
];

export const CertificatesSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center gap-4 mb-12">
          <h2 className="text-xl font-bold tracking-[0.2em] text-primary whitespace-nowrap">
            CERTIFICATES
          </h2>
          <div className="h-px w-full bg-primary/20" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {certificates.map((cert) => (
            <motion.button
              key={cert.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="group cursor-pointer text-left"
              onClick={() => setSelectedCert(cert)}
            >
              <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-lg transition-all duration-300 group-hover:border-primary/30 group-hover:shadow-primary/10">
                <div className="absolute top-3 right-3 z-10">
                  <span className="rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold tracking-widest text-white backdrop-blur-md border border-white/10 uppercase">
                    {cert.category}
                  </span>
                </div>

                <div className="aspect-[1.4/1] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full border border-white/30 bg-white/10 px-6 py-2 backdrop-blur-md shadow-xl">
                    <span className="text-sm font-semibold text-white">
                      CLICK TO EXPAND
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-3 px-1">
                <h3 className="text-lg font-bold leading-tight text-foreground line-clamp-2 uppercase tracking-tight transition-colors group-hover:text-primary">
                  {cert.title}
                </h3>
                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-t border-primary/10 pt-3">
                  <span className="flex items-center gap-1.5 max-w-[65%] truncate">
                    {cert.issuer}
                  </span>
                  <span className="flex items-center gap-1.5">
                    {cert.date}
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-primary/20 bg-card p-4 shadow-2xl shadow-primary/20"
              onClick={(event) => event.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="certificate-title"
            >
              <div className="flex items-start justify-between mb-4 px-2">
                <div className="space-y-1">
                  <h3
                    id="certificate-title"
                    className="text-xl font-bold text-foreground line-clamp-1"
                  >
                    {selectedCert.title}
                  </h3>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      {selectedCert.issuer}
                    </span>
                    <span>/</span>
                    <span className="flex items-center gap-1">
                      {selectedCert.date}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                  aria-label="Close certificate"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="relative overflow-hidden rounded-lg bg-black/40">
                <img
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  className="mx-auto max-h-[75vh] w-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
