import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import hero from "@/assets/hero.jpg";
import heroVideo from "@/assets/hero-bg.mp4.asset.json";
import portfolio from "@/assets/portfolio.jpg";
import venues from "@/assets/venues.jpg";
import services from "@/assets/services.jpg";
import couple1 from "@/assets/couple1.jpg";
import couple2 from "@/assets/couple2.jpg";
import couple3 from "@/assets/couple3.jpg";
import article1 from "@/assets/article1.jpg";
import article2 from "@/assets/article2.jpg";
import article3 from "@/assets/article3.jpg";
import logo from "@/assets/logo.png";
import { Facebook, Instagram, Youtube, Search, Phone, Mail, Menu, ArrowUp } from "lucide-react";
import { AmbientAudio } from "@/components/AmbientAudio";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: Index,
});


function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

const navLeft = ["About", "Testimonials", "Services"];
const navRight = ["Portfolio", "Venues", "Contact"];

function TopBar() {
  return (
    <div className="hidden md:flex items-center justify-between px-8 py-2 text-[11px] tracking-widest-xl uppercase text-muted-foreground border-b border-border/60 bg-background/95">
      <div className="flex items-center gap-4">
        <a href="#" aria-label="Facebook"><Facebook className="h-3.5 w-3.5" strokeWidth={1.2} /></a>
        <a href="#" aria-label="Instagram"><Instagram className="h-3.5 w-3.5" strokeWidth={1.2} /></a>
        <a href="#" aria-label="Youtube"><Youtube className="h-3.5 w-3.5" strokeWidth={1.2} /></a>
      </div>
      <div className="flex items-center gap-6">
        <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-foreground"><Phone className="h-3 w-3" strokeWidth={1.2} /> +91 98765 43210</a>
        <a href="mailto:info@theindianwedding.com" className="flex items-center gap-2 hover:text-foreground"><Mail className="h-3 w-3" strokeWidth={1.2} /> info@theindianwedding.com</a>
        <a href="#appointment" className="border border-foreground/40 px-4 py-1.5 hover:bg-foreground hover:text-background transition">Book Appointment</a>
        <Search className="h-3.5 w-3.5" strokeWidth={1.2} />
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border/60">
      <TopBar />
      <div className="relative flex items-center justify-between md:justify-center px-6 md:px-10 py-4">
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-widest-xl uppercase text-foreground/80 flex-1 justify-end pr-16">
          {navLeft.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-foreground transition">{n}</a>
          ))}
        </nav>
        <a href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2 md:-mt-2">
          <img src={logo} alt="The Indian Wedding" className="h-24 md:h-32 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-10 text-[11px] tracking-widest-xl uppercase text-foreground/80 flex-1 pl-16">
          {navRight.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-foreground transition">{n}</a>
          ))}
        </nav>
        <button className="md:hidden" aria-label="Menu"><Menu className="h-6 w-6" /></button>
      </div>
    </header>
  );
}

function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        yPercent: 30,
        opacity: 0.4,
        ease: "none",
        scrollTrigger: { trigger: textRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: { trigger: videoRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
      <video
        ref={videoRef}
        src={heroVideo.url}
        poster={hero}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
      <div className="absolute inset-0 bg-black/35" />
      <motion.div
        ref={textRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex h-full items-center justify-center px-6"
      >
        <h1 className="font-script text-white text-center text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight drop-shadow-lg max-w-6xl">
          {"Luxury Weddings In India, Designed Just For You".split(" ").map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.3 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mr-[0.25em]"
            >
              {w}
            </motion.span>
          ))}
        </h1>
      </motion.div>
    </section>
  );
}

function Intro() {
  return (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-light tracking-wide text-foreground">
        We create luxury Indian weddings in stunning locations throughout India
      </h2>
      <p className="mt-8 text-muted-foreground leading-relaxed text-[15px]">
        The Indian Wedding will make your dream <a href="#" className="underline underline-offset-4">Indian wedding</a> come to life. With over 15 years of experience as a{" "}
        <a href="#" className="underline underline-offset-4">luxury wedding planner in India</a>,{" "}
        <a href="#" className="underline underline-offset-4">our thoughtful, award-winning team</a> support you, from the first moment we meet to the final phera.
      </p>
    </section>
  );
}

function ThreeCards() {
  const cards = [
    { img: portfolio, title: "Portfolio", sub: "Inspiration for your dream day", href: "#portfolio" },
    { img: venues, title: "Venues", sub: "Our hand-picked palaces & havelis", href: "#venues" },
    { img: services, title: "Services", sub: "How we plan your dream wedding", href: "#services" },
  ];
  return (
    <section className="grid md:grid-cols-3">
      {cards.map((c) => (
        <a key={c.title} href={c.href} className="group relative block overflow-hidden aspect-[4/5] md:aspect-[3/4]">
          <img src={c.img} alt={c.title} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-8">
            <h3 className="font-script text-6xl md:text-7xl">{c.title}</h3>
            <p className="mt-3 text-[11px] tracking-widest-xl uppercase">{c.sub}</p>
          </div>
        </a>
      ))}
    </section>
  );
}

function ElegantSection() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <img src={couple1} alt="Indian bride portrait" loading="lazy" className="w-full aspect-[4/5] object-cover" />
        </div>
        <div className="text-center md:text-left">
          <p className="font-script text-5xl text-primary">Elegant</p>
          <h2 className="mt-2 text-2xl md:text-3xl uppercase tracking-widest text-foreground">Indian Weddings by The Experts</h2>
          <div className="mt-6 w-16 h-px bg-primary/50 mx-auto md:mx-0" />
          <p className="mt-6 text-muted-foreground leading-relaxed text-[15px]">
            The Indian Wedding joins international trends and styles with our in-depth local knowledge of India. Whether you love stunning palaces nestled in the Rajasthani hills or heritage havelis overlooking Udaipur's lakes, we create{" "}
            <strong className="text-foreground font-medium">timeless Indian weddings</strong> for couples from all over the world.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-[15px]">
            Using our experience as a luxury wedding planner in India, our eye for detail and hand-picked suppliers, we craft unique, perfectly designed dream Indian weddings set in breathtaking landscapes.
          </p>
          <a href="#appointment" className="btn-outline mt-10">Book a Consultation</a>
        </div>
      </div>
    </section>
  );
}

function StartPlanning() {
  return (
    <section
      className="relative py-32 px-6 text-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${article2})` }}
    >
      <div className="absolute inset-0 bg-background/80" />
      <div className="relative">
        <p className="font-script text-5xl text-primary">Start Planning</p>
        <h2 className="mt-4 text-xl uppercase tracking-widest">Your Indian Wedding Journey</h2>
        <div className="mt-6 w-16 h-px bg-primary/50 mx-auto" />
        <a href="#" className="btn-outline mt-10">See Our Advice &amp; Inspiration</a>
      </div>
    </section>
  );
}

function Destination() {
  return (
    <section
      id="venues"
      className="relative py-32 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${venues})` }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative max-w-3xl mx-auto text-center text-white">
        <p className="font-script text-5xl">Destination</p>
        <h2 className="mt-2 text-2xl uppercase tracking-widest">The Perfect Luxury Wedding</h2>
        <div className="mt-6 w-16 h-px bg-white/70 mx-auto" />
        <p className="mt-8 leading-relaxed text-[15px]">
          India's romantic energy, breathtaking heritage, and celebrated cuisine create the perfect atmosphere for an elegant and unforgettable wedding. It's no wonder India is one of the top wedding destinations in the world.
        </p>
        <p className="mt-4 leading-relaxed text-[15px]">
          As a <strong className="font-medium">luxury wedding planner in India</strong>, our inside knowledge ensures the best of Indian culture paired with expert suppliers. Whether you love regal palaces, coastal shores or Himalayan retreats, we will find the perfect location for your perfectly designed day.
        </p>
        <a href="#contact" className="btn-ghost-light mt-10">Contact Us</a>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      names: "Aanya & Arjun",
      img: couple2,
      title: "A true luxury wedding planner in India",
      body: "We reached out to this lovely team and within less than 24 hours they came back to us. They were detail-driven, professional, attentive, and truly listened to what we wanted our dream Indian wedding to be — reflected in every moment of our day. For couples who want a team that looks after every detail, we could not recommend The Indian Wedding enough.",
    },
    {
      names: "Priya & John",
      img: couple3,
      title: "When in doubt — please contact The Indian Wedding!",
      body: "My husband and I had a fusion wedding in Udaipur in 2023. The team immediately coordinated our conference call and explained every detail of the planning stages. Planning remotely, they put my mind completely at ease. Professional, organized and thoughtful in every suggestion. We will remember our special day for the rest of our lives.",
    },
    {
      names: "Shreya & Abraham",
      img: couple1,
      title: "Our wedding day was better than we imagined",
      body: "We really enjoyed working with The Indian Wedding company! The team is responsive, professional, and deeply experienced. Our wedding day was better than we imagined and our guests couldn't have enjoyed it more. Everything was seamless — such a calming and kind team to work with.",
    },
  ];
  return (
    <section id="testimonials" className="py-28 px-6 bg-secondary/40">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs tracking-widest-xl uppercase text-muted-foreground">Swipe to see more</p>
        <div className="mt-12 grid md:grid-cols-3 gap-10">
          {items.map((t) => (
            <article key={t.names} className="text-center">
              <p className="font-script text-4xl text-primary">{t.names}</p>
              <img src={t.img} alt={t.names} loading="lazy" className="mt-6 w-full aspect-square object-cover" />
              <h3 className="mt-6 text-lg tracking-wide">{t.title}</h3>
              <div className="mt-4 w-10 h-px bg-primary/50 mx-auto" />
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              <a href="#" className="mt-6 inline-block text-[11px] tracking-widest-xl uppercase border-b border-foreground/40 pb-1 hover:border-foreground">See Their Wedding</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Articles() {
  const items = [
    { img: article1, title: "A Complete Guide to Planning a Luxury Wedding in Udaipur: Costs, Timelines & Tips", tag: "Wedding Planning", excerpt: "Planning a luxury wedding in Udaipur is a dream for many couples — and for good reason. From royal palaces to serene lake views and heritage havelis, Udaipur offers an unforgettable setting…" },
    { img: article2, title: "How a Wedding Planner in India Personalises Every Detail: From Florals to Fireworks", tag: "Wedding Planning", excerpt: "Every couple has a unique love story, and your wedding day should feel like a reflection of that — not just another event. When you choose India as your destination, you're surrounded by beauty…" },
    { img: article3, title: "Why Hiring a Wedding Planner in India Makes Your Destination Wedding Stress-Free", tag: "Wedding Planning", excerpt: "Planning a wedding is exciting, but when it's a destination celebration, things can become overwhelming. India is one of the most romantic countries — filled with heritage, colour and timeless venues…" },
  ];
  return (
    <section id="portfolio" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-2xl uppercase tracking-widest">Latest Articles</h2>
        <div className="mt-4 w-16 h-px bg-primary/50 mx-auto" />
        <p className="mt-3 text-center text-xs tracking-widest-xl uppercase text-muted-foreground">Swipe to see more</p>
        <div className="mt-14 grid md:grid-cols-3 gap-10">
          {items.map((a) => (
            <article key={a.title}>
              <a href="#" className="block overflow-hidden">
                <img src={a.img} alt={a.title} loading="lazy" className="w-full aspect-[3/2] object-cover transition-transform duration-700 hover:scale-105" />
              </a>
              <p className="mt-6 text-[11px] tracking-widest-xl uppercase text-primary">{a.tag}</p>
              <h3 className="mt-3 text-xl leading-snug">{a.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.excerpt}</p>
              <a href="#" className="mt-4 inline-block text-[11px] tracking-widest-xl uppercase border-b border-foreground/40 pb-1">Read More</a>
            </article>
          ))}
        </div>
        <div className="mt-14 text-center">
          <a href="#" className="btn-outline">See All</a>
        </div>
      </div>
    </section>
  );
}

function Ceremony() {
  return (
    <section
      id="services"
      className="relative py-32 px-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${couple2})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative max-w-3xl mx-auto text-center text-white">
        <p className="font-script text-5xl">Your Ideal Ceremony</p>
        <div className="mt-6 w-16 h-px bg-white/70 mx-auto" />
        <p className="mt-8 leading-relaxed text-[15px]">
          We cater for a whole range of personal ceremonies to ensure your Indian wedding represents your faith, family and love. Whether you want a traditional Hindu, Sikh, Christian, or fusion ceremony, we plan your day from mehendi to vidaai.
        </p>
        <p className="mt-6 text-lg">
          Find out more about the <a href="#" className="underline underline-offset-4">different types of ceremonies and Indian weddings</a> we have planned.
        </p>
      </div>
    </section>
  );
}

function Appointment() {
  return (
    <section id="appointment" className="py-28 px-6 bg-secondary/30">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-script text-5xl text-primary">Appointment Enquiry</h2>
        <div className="mt-4 w-16 h-px bg-primary/50 mx-auto" />
        <p className="mt-6 text-muted-foreground leading-relaxed">
          We would love to hear from you about your dream day and start planning your elegant Indian wedding.
        </p>
        <form className="mt-12 grid gap-6 text-left" onSubmit={(e) => e.preventDefault()}>
          <Field label="Your Name *"><input required className="input" /></Field>
          <Field label="Email *"><input required type="email" className="input" /></Field>
          <Field label="Phone Number"><input type="tel" className="input" /></Field>
          <Field label="Ceremony Date (if known)"><input type="date" className="input" /></Field>
          <Field label="Approximate Budget (if known)"><input className="input" placeholder="₹ / $ / £" /></Field>
          <Field label="Number of Guests (if known)"><input type="number" className="input" /></Field>
          <Field label="Any Details"><textarea rows={4} className="input" /></Field>
          <button className="btn-outline mt-4 justify-self-center">Send Enquiry</button>
        </form>
        <p className="mt-8 text-xs text-muted-foreground">
          By filling in this form you agree to be contacted by The Indian Wedding about your enquiry. We're often out creating weddings &amp; events, but will get back to you within 48 hours.
        </p>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-widest-xl uppercase text-muted-foreground">{label}</span>
      <div className="mt-2">{children}</div>
      <style>{`.input{width:100%;background:transparent;border:0;border-bottom:1px solid var(--border);padding:0.5rem 0;outline:none;font-family:inherit;color:inherit}
.input:focus{border-color:var(--primary)}`}</style>
    </label>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background/90 pt-16 pb-8 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <img src={logo} alt="The Indian Wedding" className="h-24 w-auto mx-auto invert-[.92]" />
        <div className="mt-8 flex items-center justify-center gap-6 text-background/70">
          <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" strokeWidth={1.2} /></a>
          <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" strokeWidth={1.2} /></a>
          <a href="#" aria-label="Youtube"><Youtube className="h-4 w-4" strokeWidth={1.2} /></a>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs tracking-widest-xl uppercase text-background/70">
          <a href="tel:+919876543210">+91 98765 43210</a>
          <a href="mailto:info@theindianwedding.com">info@theindianwedding.com</a>
        </div>
        <div className="mt-10 pt-6 border-t border-background/15 text-[11px] tracking-widest-xl uppercase text-background/50">
          © {new Date().getFullYear()} The Indian Wedding — Luxury Indian Wedding Planners
        </div>
      </div>
      <a href="#top" className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:opacity-90" aria-label="Go to top">
        <ArrowUp className="h-4 w-4" />
      </a>
    </footer>
  );
}

function Index() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <AmbientAudio />
      <Header />
      <main>
        <Hero />
        <Reveal><Intro /></Reveal>
        <Reveal><ThreeCards /></Reveal>
        <Reveal><ElegantSection /></Reveal>
        <Reveal><StartPlanning /></Reveal>
        <Reveal><Destination /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><Articles /></Reveal>
        <Reveal><Ceremony /></Reveal>
        <Reveal><Appointment /></Reveal>
      </main>
      <Footer />
    </div>
  );
}
