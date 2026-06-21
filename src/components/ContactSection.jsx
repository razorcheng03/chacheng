import { useState } from "react";
import { Mail, MapPin, Github, Youtube, Facebook, Instagram, Send, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { cn } from "../lib/utils";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Get access key from env or fallback placeholder
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

    if (accessKey === "YOUR_ACCESS_KEY_HERE") {
      // Simulate success and display guidance if key is not configured yet
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsLoading(false);
      toast({
        title: "Demo Mode: Message Sent!",
        description: "To receive real emails, please request a free key at web3forms.com and add it to your .env file.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `New message from ${formData.name}`,
          message: formData.message,
          from_name: "Portfolio Contact Form",
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for getting in touch. I will get back to you soon!",
        });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Submission Failed",
          description: result.message || "Something went wrong. Please check your Access Key.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Could not connect to the mail service. Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Me",
      value: "archierlacson@example.com",
      href: "mailto:archierlacson@example.com",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Cagayan De Oro City, Philippines",
      href: "https://maps.google.com/?q=Cagayan+De+Oro+City",
    },
  ];

  const socialLinks = [
    { icon: Github, url: "https://github.com/razorcheng03", label: "GitHub" },
    { icon: Youtube, url: "https://www.youtube.com/@chacheng4034", label: "YouTube" },
    { icon: Facebook, url: "https://www.facebook.com/Chengmats", label: "Facebook" },
    { icon: Instagram, url: "https://www.instagram.com/archyyyyyyy_/", label: "Instagram" },
  ];

  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Have a question or want to work together? Feel free to reach out using the form or through my social links.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Contact Details & Socials (Left side - 2 cols) */}
          <div className="md:col-span-2 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-tight">Contact Information</h3>
              <p className="text-muted-foreground leading-relaxed text-left">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>

              <div className="space-y-4 pt-4">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <a
                      key={idx}
                      href={info.href}
                      target={info.icon === MapPin ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-card/40 backdrop-blur-md hover:border-primary/30 transition-all duration-300 group text-left"
                    >
                      <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                          {info.title}
                        </p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                          {info.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Socials Connection */}
            <div className="space-y-4 pt-6">
              <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground text-left">
                Connect with me
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className="p-3.5 rounded-full border border-white/5 bg-card/40 backdrop-blur-md text-foreground/80 hover:text-primary hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form container (Right side - 3 cols) */}
          <div className="md:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl border border-white/5 bg-card/30 backdrop-blur-md space-y-6 shadow-2xl"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2 text-left">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Archier Lacson"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2 text-left">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="archier@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2 text-left">
                <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about project design"
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-2 text-left">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-lg border border-white/10 bg-background/50 text-foreground placeholder:text-muted-foreground/50 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  "w-full cosmic-button py-3 text-sm cursor-pointer flex items-center justify-center gap-2",
                  isLoading && "opacity-80 cursor-not-allowed"
                )}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
