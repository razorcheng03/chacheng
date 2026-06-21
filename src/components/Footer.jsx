import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Footer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  return (
    <footer className="py-12 px-6 relative border-t border-white/5 mt-12 bg-background/30 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Logo & Time */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex flex-col mb-5">
              <h3 className="font-black text-lg uppercase tracking-tighter">Archier Lacson</h3>
              <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-medium">Student & Developer</p>
            </div>
            
            <div className="mt-8">
              <p className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-2 font-semibold">Local Time (PHT)</p>
              <div className="flex items-center gap-3">
                <span className="text-xl font-mono font-light tracking-tighter">{formatTime(time)}</span>
                <span className="px-2 py-0.5 rounded-full border border-primary/30 bg-primary/5 text-[8px] text-primary uppercase tracking-[0.1em] font-bold flex items-center gap-1.5">
                  <span className="w-1 h-1 bg-primary rounded-full animate-pulse shadow-[0_0_5px_rgba(139,92,246,0.8)]" />
                  Focused
                </span>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="md:pl-8">
            <h4 className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-6 font-semibold">Explore</h4>
            <ul className="space-y-3">
              {[
                { name: 'Home', href: '#hero' },
                { name: 'Academic Journey', href: '#academic' },
                { name: 'Certificates', href: '#certificates' },
                { name: 'About', href: '#about' }
              ].map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="text-[11px] font-bold uppercase tracking-[0.1em] hover:text-primary transition-all duration-300 hover:pl-1">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-6 font-semibold">Socials</h4>
            <ul className="space-y-3">
              {[
                { name: 'Github', url: 'https://github.com/razorcheng03' },
                { name: 'Youtube', url: 'https://www.youtube.com/@chacheng4034' },
                { name: 'Facebook', url: 'https://www.facebook.com/Chengmats' },
                { name: 'Instagram', url: 'https://www.instagram.com/archyyyyyyy_/' }
              ].map((social) => (
                <li key={social.name}>
                  <a href={social.url} target="_blank" rel="noreferrer" className="text-[11px] font-bold uppercase tracking-[0.1em] hover:text-primary transition-all duration-300 hover:pl-1">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:text-right">
            <h4 className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mb-6 font-semibold">Get in touch</h4>
            <a href="mailto:archierlacson@example.com" className="text-sm md:text-base font-black tracking-tight hover:text-primary transition-colors block mb-1 break-all">
              archierlacson@example.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[8px] text-muted-foreground uppercase tracking-[0.3em] font-medium">
            &copy; {new Date().getFullYear()} ARCHIER LACSON. ALL RIGHTS RESERVED.
          </p>
          <a href="#hero" className="flex items-center gap-2 text-[8px] text-muted-foreground uppercase tracking-[0.2em] font-bold hover:text-white transition-all duration-300 group">
            Back to Top
            <ArrowUp size={12} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};
