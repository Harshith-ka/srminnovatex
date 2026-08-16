import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/innovatex-logo.png.asset.json";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Rocket, Brain, Leaf, HeartPulse, GraduationCap, Coins, Sparkles,
  Trophy, Award, Medal, Users, Briefcase, FileBadge, Code2, Network,
  MapPin, Mail, Phone, Instagram, Linkedin, Calendar, Clock, ArrowRight,
  Menu, X, Github, Twitter,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: InnovateXLanding,
});

const TARGET_DATE = new Date("2026-09-26T09:00:00+05:30").getTime();

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, TARGET_DATE - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  return t;
}

function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40 animate-grid" />
      <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-primary/30 blur-[120px] animate-glow-pulse" />
      <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-purple/30 blur-[140px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />
      <div className="absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-cyan/25 blur-[120px] animate-glow-pulse" style={{ animationDelay: "3s" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "#home"], ["About", "#about"], ["Tracks", "#tracks"],
    ["Prizes", "#prizes"], ["Timeline", "#timeline"], ["Venue", "#venue"],
    ["FAQ", "#faq"], ["Contact", "#contact"],
  ];
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-4">
        <nav className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all ${scrolled ? "glass-strong" : "glass"}`}>
          <a href="#home" className="flex items-center gap-2">
            <img src={logoAsset.url} alt="SRM InnovateX logo" className="h-9 w-9 rounded-xl object-contain bg-white/90 p-0.5" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold tracking-tight">SRM InnovateX</span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">SRM · 2026</span>
            </div>
          </a>
          <div className="hidden lg:flex items-center gap-1">
            {links.map(([label, href]) => (
              <a key={href} href={href} className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="#register" className="hidden sm:inline-flex items-center gap-1.5 rounded-full btn-glow btn-glow-hover px-5 py-2 text-sm font-medium text-white">
              Register <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <button onClick={() => setOpen(!open)} aria-label="Menu" className="lg:hidden grid h-9 w-9 place-items-center rounded-full glass">
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
        {open && (
          <div className="lg:hidden mt-2 glass-strong rounded-2xl p-3 animate-fade-up">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5">
                {label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

function Hero() {
  const t = useCountdown();
  const stats = [
    { v: "₹60K", l: "Prize Pool" },
    { v: "5", l: "Tracks" },
    { v: "24", l: "Hours" },
    { v: "PAN", l: "India" },
  ];
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16">
      <AuroraBackground />
      <div className="relative mx-auto max-w-7xl px-4 w-full">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs text-muted-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
              National Hackathon · September 26-27, 2026
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.02]">
              <span className="text-gradient">SRM</span>{" "}
              <span className="text-gradient-brand">InnovateX</span>
              <br />
              <span className="text-foreground">2026</span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-xl">
              24-Hour National Hackathon.{" "}
              <span className="text-foreground font-medium">Innovate. Build. Transform.</span>
            </p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xl">
              Build tomorrow in 24 hours — join India's most ambitious student builders.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#register" className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm font-semibold text-white">
                Register Now <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#tracks" className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold hover:bg-white/10 transition">
                Explore Tracks
              </a>
            </div>
            <div className="mt-10 grid grid-cols-4 gap-3 max-w-lg">
              {stats.map((s) => (
                <div key={s.l} className="glass rounded-xl p-3 text-center">
                  <div className="font-display text-xl font-bold text-gradient-brand">{s.v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center min-h-[420px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-80 w-80 rounded-full bg-gradient-to-br from-primary/40 via-purple/40 to-cyan/40 blur-3xl animate-glow-pulse" />
            </div>
            <div className="relative w-72 h-72 animate-float" style={{ perspective: "1000px" }}>
              <div className="absolute inset-0 rounded-3xl glass-strong shadow-2xl rotate-6" />
              <div className="absolute inset-0 rounded-3xl glass-strong -rotate-3 translate-x-4 translate-y-4" />
              <div className="absolute inset-0 rounded-3xl glass-strong bg-gradient-to-br from-primary/20 via-purple/20 to-cyan/20 flex flex-col justify-between p-6">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-red-400" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                  <div className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="font-mono text-xs space-y-1.5 text-cyan">
                  <div><span className="text-purple">const</span> <span className="text-white">event</span> = {"{"}</div>
                  <div className="pl-4">name: <span className="text-green-300">"InnovateX"</span>,</div>
                  <div className="pl-4">year: <span className="text-orange-300">2026</span>,</div>
                  <div className="pl-4">prize: <span className="text-green-300">"₹60K"</span>,</div>
                  <div className="pl-4">tracks: <span className="text-orange-300">5</span>,</div>
                  <div>{"}"};</div>
                  <div className="pt-2 text-muted-foreground">// build.tomorrow()</div>
                </div>
                <div className="text-[10px] text-muted-foreground text-right">/* hack _</div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass rounded-2xl p-3 animate-float-slow">
              <Code2 className="h-6 w-6 text-cyan" />
            </div>
            <div className="absolute -bottom-2 -left-2 glass rounded-2xl p-3 animate-float" style={{ animationDelay: "1s" }}>
              <Rocket className="h-6 w-6 text-purple" />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="glass-strong rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary to-purple">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Hackathon Begins</div>
                <div className="font-display font-semibold">26 September 2026 · 09:00 AM IST</div>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              {[["Days", t.d], ["Hours", t.h], ["Mins", t.m], ["Secs", t.s]].map(([l, v]) => (
                <div key={l as string} className="glass rounded-xl px-3 sm:px-4 py-2 min-w-[60px] text-center">
                  <div className="font-display text-xl sm:text-2xl font-bold text-gradient-brand tabular-nums">
                    {String(v).padStart(2, "0")}
                  </div>
                  <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{l as string}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children, subtitle }: { id?: string; eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="max-w-2xl mb-14">
          {eyebrow && (
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan mb-4">
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-[1.05]">
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  const pillars = [
    { icon: Sparkles, label: "Innovation", desc: "Push boundaries with bold ideas." },
    { icon: Network, label: "Collaboration", desc: "Team up with the brightest builders." },
    { icon: GraduationCap, label: "Learning", desc: "Workshops & mentorship from experts." },
    { icon: Users, label: "Networking", desc: "Meet founders, engineers, and investors." },
  ];
  return (
    <Section id="about" eyebrow="About the event" title="A 24-hour arena for the next generation of builders.">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="glass-strong rounded-3xl p-8 aspect-square relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-gradient-to-br from-primary to-purple blur-3xl opacity-60" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center">
              <div className="font-display text-8xl font-bold text-gradient-brand">24h</div>
              <div className="mt-3 text-muted-foreground">of pure building</div>
              <div className="mt-8 flex justify-center gap-2">
                {["React", "AI", "Web3", "Cloud"].map((t) => (
                  <span key={t} className="glass rounded-full px-3 py-1 text-xs">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            SRM InnovateX 2026 is a flagship national hackathon that brings together the sharpest student minds across India — engineers, designers, and founders — to spend 24 hours turning ideas into shipping products.
          </p>
          <div className="mt-6 space-y-4">
            <div className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-cyan mb-1">Mission</div>
              <div>Empower students to solve real-world problems through code and creativity.</div>
            </div>
            <div className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-purple mb-1">Vision</div>
              <div>Build India's most vibrant student innovation ecosystem.</div>
            </div>
          </div>
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {pillars.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="glass rounded-2xl p-4 hover:bg-white/[0.08] transition group">
                <Icon className="h-5 w-5 text-primary group-hover:text-cyan transition" />
                <div className="mt-2 font-medium">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

function WhyParticipate() {
  const items = [
    { icon: Trophy, title: "Win Cash Prizes", desc: "Compete for a ₹60,000 prize pool across all tracks." },
    { icon: Code2, title: "Build Real Projects", desc: "Ship functional products in 24 hours, not just decks." },
    { icon: Network, title: "Network", desc: "Connect with peers, mentors, and industry leaders." },
    { icon: FileBadge, title: "Certificates", desc: "Every participant receives a verified certificate." },
    { icon: Briefcase, title: "Internship Opportunities", desc: "Get noticed by our partner startups and companies." },
    { icon: Rocket, title: "Showcase Skills", desc: "Demo your work in front of a live audience of judges." },
  ];
  return (
    <Section id="why" eyebrow="Why participate" title="Six reasons you'll want to be here.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="group relative glass rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.09]">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-primary/10 via-purple/10 to-cyan/10 pointer-events-none" />
            <div className="relative">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-purple/20 group-hover:from-primary group-hover:to-purple transition">
                <Icon className="h-5 w-5 text-primary group-hover:text-white transition" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Prizes() {
  const prizes = [
    { icon: Trophy, place: "Winner", amount: "₹35,000", color: "from-yellow-400 to-orange-500" },
    { icon: Award, place: "Runner Up", amount: "₹15,000", color: "from-slate-300 to-slate-500" },
    { icon: Medal, place: "Second Runner Up", amount: "₹10,000", color: "from-orange-400 to-amber-700" },
  ];
  return (
    <section id="prizes" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-primary/30 via-purple/30 to-cyan/30 blur-[120px] animate-glow-pulse" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan mb-4">
          Prize Pool
        </div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">Take home your share of</h2>
        <div className="mt-6 font-display text-7xl sm:text-9xl font-bold text-gradient-brand leading-none">
          ₹60,000
        </div>
        <p className="mt-4 text-muted-foreground">plus internship offers & swag from our sponsors.</p>

        <div className="mt-16 grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {prizes.map(({ icon: Icon, place, amount, color }, i) => (
            <div key={place} className={`glass-strong rounded-3xl p-8 text-center hover:-translate-y-2 transition-all duration-500 ${i === 0 ? "md:scale-110 md:-translate-y-4" : ""}`}>
              <div className={`mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br ${color}`}>
                <Icon className="h-8 w-8 text-white" />
              </div>
              <div className="mt-5 text-sm text-muted-foreground uppercase tracking-wider">{place}</div>
              <div className="mt-2 font-display text-4xl font-bold text-gradient">{amount}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tracks() {
  const tracks = [
    { icon: Leaf, name: "Sustainability & Climate", desc: "Tech that helps the planet breathe easier.", tag: "01", stats: "8 mentors" },
    { icon: HeartPulse, name: "Healthcare & MedTech", desc: "Reimagine diagnostics, care, and access.", tag: "02", stats: "10 mentors" },
    { icon: GraduationCap, name: "Education Technology", desc: "Rethink how the next billion learners learn.", tag: "03", stats: "6 mentors" },
    { icon: Coins, name: "FinTech", desc: "Banking, payments, and finance for a new era.", tag: "04", stats: "9 mentors" },
    { icon: Rocket, name: "Open Innovation", desc: "No rules. Just build something audacious.", tag: "05", stats: "15 mentors" },
  ];
  return (
    <Section id="tracks" eyebrow="Innovation tracks" title="Pick a lane. Ship something incredible." subtitle="Five focused tracks — each with dedicated mentors and problem statements.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map(({ icon: Icon, name, desc, tag, stats }) => (
          <div
            key={name}
            className="group relative rounded-3xl p-[1px] overflow-hidden transition-all duration-500 hover:-translate-y-2"
            style={{ background: "linear-gradient(140deg, rgba(6,78,59,0.18), rgba(201,168,76,0.28), rgba(6,78,59,0.10))" }}
          >
            {/* animated conic sheen on hover */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                 style={{ background: "conic-gradient(from_0deg,transparent,rgba(201,168,76,0.35),transparent_40%)" }} />
            <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] backdrop-blur-xl p-7 overflow-hidden">
              {/* corner glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full blur-3xl opacity-40 group-hover:opacity-90 transition-opacity duration-700"
                   style={{ background: "radial-gradient(circle, rgba(201,168,76,0.55), transparent 70%)" }} />
              {/* grid pattern */}
              <div className="pointer-events-none absolute inset-0 opacity-[0.05] group-hover:opacity-[0.09] transition"
                   style={{ backgroundImage: "linear-gradient(var(--primary) 1px,transparent 1px),linear-gradient(90deg,var(--primary) 1px,transparent 1px)", backgroundSize: "22px 22px" }} />

              <div className="relative flex items-start justify-between">
                <div className="relative">
                  <div className="absolute inset-0 blur-xl bg-accent/30 rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/25 transition-all duration-500 group-hover:rotate-[-6deg] group-hover:scale-110">
                    <Icon className="h-7 w-7 text-primary" strokeWidth={1.6} />
                  </div>
                </div>
                <span className="font-display text-4xl font-bold text-primary/10 group-hover:text-accent/40 transition-colors duration-500">
                  {tag}
                </span>
              </div>

              <h3 className="mt-6 font-display text-xl font-semibold leading-tight">{name}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>

              <div className="mt-6 flex items-center justify-between pt-5 border-t border-primary/10">
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground font-medium">{stats}</span>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-primary transition-all duration-300 group-hover:gap-2.5">
                  Explore
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 group-hover:rotate-[-45deg]">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const [ref, setRef] = useState<T | null>(null);
  useEffect(() => {
    if (!ref) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      ref.classList.add("in-view");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ref.classList.add("in-view");
            io.unobserve(ref);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(ref);
    return () => io.disconnect();
  }, [ref]);
  return setRef;
}

function TimelineRow({
  s, i, right,
}: {
  s: { date: string; time: string; title: string; desc: string; icon: any };
  i: number;
  right: boolean;
}) {
  const setRef = useReveal<HTMLDivElement>();
  const Icon = s.icon;
  // Cap stagger so mobile doesn't wait forever
  const delay = Math.min(i, 3) * 90;
  return (
    <div
      ref={setRef}
      className="reveal relative pl-16 sm:pl-20 md:pl-0 md:grid md:grid-cols-2 md:gap-16 items-center"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* card */}
      <div className={`${right ? "md:col-start-2" : "md:col-start-1 md:text-right"}`}>
        <div className={`group relative inline-block max-w-md text-left transition-all duration-500 md:hover:-translate-y-1 ${right ? "" : "md:ml-auto"}`}>
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 via-accent/30 to-primary/30 opacity-0 md:group-hover:opacity-100 blur-xl transition duration-500 motion-reduce:hidden" />
          <div className="relative rounded-2xl p-5 sm:p-6 bg-[color-mix(in_oklab,var(--surface)_92%,transparent)] backdrop-blur-xl border border-primary/15 shadow-[0_20px_50px_-25px_rgba(6,78,59,0.35)]">
            <div className="flex items-center gap-3 mb-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-500">
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-bold">{s.date}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{s.time}</div>
              </div>
            </div>
            <div className="font-display text-lg md:text-xl font-semibold leading-tight">{s.title}</div>
            <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</div>
          </div>
        </div>
      </div>

      {/* node */}
      <div className="absolute left-6 sm:left-8 md:left-1/2 top-6 md:top-8 -translate-x-1/2 z-10">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-accent/40 blur-md animate-[glow-pulse_4s_ease-in-out_infinite] motion-reduce:hidden" />
          <div className="relative grid h-5 w-5 md:h-6 md:w-6 place-items-center rounded-full bg-background border-2 border-accent shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_10%,transparent)]">
            <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-gradient-to-br from-primary to-accent" />
          </div>
        </div>
      </div>

      <div className={right ? "md:col-start-1 md:row-start-1" : "md:col-start-2 md:row-start-1"} />
    </div>
  );
}

function Timeline() {
  const steps = [
    { date: "Aug 01", time: "00:00 IST", title: "Registration Opens", desc: "Applications go live to teams across India.", icon: Sparkles },
    { date: "Sep 15", time: "23:59 IST", title: "Registration Closes", desc: "Final teams confirmed and shortlisted.", icon: FileBadge },
    { date: "Sep 26", time: "09:00 IST", title: "Hackathon Starts", desc: "The 24-hour clock officially begins.", icon: Rocket },
    { date: "Sep 27", time: "09:00 IST", title: "Project Evaluation", desc: "Live demos to a panel of industry judges.", icon: Code2 },
    { date: "Sep 27", time: "18:00 IST", title: "Prize Distribution", desc: "Winners announced. Champions crowned.", icon: Trophy },
  ];
  return (
    <Section id="timeline" eyebrow="Timeline" title="Mark your calendar.">
      <div className="relative">
        {/* rail */}
        <div className="absolute left-6 sm:left-8 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-accent/40 to-primary/10" />
          <div
            className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-accent to-transparent animate-[shimmer_3s_linear_infinite] motion-reduce:hidden"
            style={{ backgroundSize: "100% 300%" }}
          />
        </div>

        <div className="space-y-10 sm:space-y-12 md:space-y-16">
          {steps.map((s, i) => (
            <TimelineRow key={i} s={s} i={i} right={i % 2 === 1} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Venue() {
  return (
    <Section id="venue" eyebrow="Venue" title="Where it all goes down.">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-strong rounded-3xl p-8">
          <div className="flex items-center gap-2 text-cyan text-sm">
            <MapPin className="h-4 w-4" /> On-campus · Offline event
          </div>
          <h3 className="mt-4 font-display text-3xl font-bold">SRM University</h3>
          <p className="mt-1 text-muted-foreground">Ramapuram Campus, Chennai — Tamil Nadu, India</p>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex items-start gap-3"><MapPin className="h-4 w-4 text-primary mt-0.5" /> Bharathi Salai, Ramapuram, Chennai — 600089</div>
            <div className="flex items-start gap-3"><Clock className="h-4 w-4 text-primary mt-0.5" /> 26 Sep 09:00 AM → 27 Sep 09:00 AM IST</div>
            <div className="flex items-start gap-3"><Users className="h-4 w-4 text-primary mt-0.5" /> Open to students across India</div>
          </div>
          <a href="https://maps.google.com/?q=SRM+University+Ramapuram" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm hover:bg-white/10 transition">
            Open in Maps <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="glass rounded-3xl overflow-hidden min-h-[380px] relative">
          <iframe
            title="SRM University Ramapuram"
            src="https://www.google.com/maps?q=SRM+University+Ramapuram+Chennai&output=embed"
            className="absolute inset-0 h-full w-full grayscale contrast-125"
            loading="lazy"
          />
        </div>
      </div>
    </Section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Who can participate?", a: "Any undergraduate or postgraduate student in India with a valid ID card." },
    { q: "What is the team size?", a: "Teams of 2 to 4 members. Solo participants can find teammates on our Discord." },
    { q: "Can beginners participate?", a: "Absolutely. We have mentors on-ground and beginner-friendly problem statements." },
    { q: "Can we use AI tools?", a: "Yes, AI tools like Copilot, Cursor, and Lovable are welcome — build with the modern stack." },
    { q: "What should we bring?", a: "Your laptop, chargers, ID card, and boundless energy. Food and workspace are on us." },
    { q: "Is accommodation provided?", a: "Yes — accommodation is provided for participants traveling from outside Chennai." },
  ];
  return (
    <Section id="faq" eyebrow="Frequently asked" title="Everything you wanted to ask.">
      <div className="max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="glass rounded-2xl px-5 border-0">
              <AccordionTrigger className="text-left font-display text-base hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}

function Sponsors() {
  const logos = ["Paryan Technologies Private Limited", "Big Bucks Innovation Private Limited"];
  return (
    <Section id="sponsors" eyebrow="Sponsors & partners" title="Backed by industry leaders.">
      <div className="relative overflow-hidden py-6 mask-fade">
        <div className="flex gap-10 animate-marquee w-max">
          {[...logos, ...logos, ...logos, ...logos].map((name, i) => (
            <div key={i} className="glass rounded-2xl px-8 py-5 min-w-[280px] flex items-center justify-center text-center">
              <div className="font-display text-xl font-semibold text-muted-foreground hover:text-foreground transition">{name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-10 text-center">
        <a href="#contact" className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-6 py-3 text-sm font-semibold text-white">
          Become a Sponsor <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </Section>
  );
}

function Team() {
  const team = [
    { name: "K. Harshith", role: "Lead Organizer" },
    { name: "P. Pranush", role: "Tech Lead" },
    { name: "U. Veerendra", role: "Finance Lead" },
  ];
  return (
    <Section id="team" eyebrow="Organizing team" title="Meet the crew behind InnovateX.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {team.map((m) => (
          <div key={m.name} className="glass rounded-2xl p-6 hover:-translate-y-1 transition">
            <div className="h-40 rounded-xl bg-gradient-to-br from-primary/30 via-purple/30 to-cyan/30 flex items-center justify-center">
              <div className="font-display text-5xl font-bold text-white/80">{m.name.split(" ").map((s) => s[0]).join("")}</div>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <div className="font-display font-semibold">{m.name}</div>
                <div className="text-sm text-muted-foreground">{m.role}</div>
              </div>
              <a href="#" aria-label={`${m.name} LinkedIn`} className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-primary/20 transition">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ContactCTA() {
  return (
    <section id="register" className="relative py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div id="contact" className="relative glass-strong rounded-3xl p-10 sm:p-14 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple/30 blur-[120px]" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
                Ready to <span className="text-gradient-brand">build tomorrow</span>?
              </h2>
              <p className="mt-4 text-muted-foreground text-lg">
                Grab your spot before registrations close on September 15th.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#" className="inline-flex items-center gap-2 rounded-full btn-glow btn-glow-hover px-7 py-3.5 text-sm font-semibold text-white">
                  Register Your Team <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#tracks" className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold hover:bg-white/10">
                  View Tracks
                </a>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { icon: Mail, label: "innovatex@srmist.edu.in" },
                { icon: Phone, label: "+91 98765 43210" },
                { icon: MapPin, label: "SRM Ramapuram, Chennai" },
                { icon: Instagram, label: "@srm.innovatex" },
                { icon: Linkedin, label: "SRM InnovateX" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 glass rounded-xl px-4 py-3">
                  <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary/30 to-purple/30">
                    <Icon className="h-4 w-4 text-cyan" />
                  </div>
                  <span className="text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <img src={logoAsset.url} alt="SRM InnovateX logo" className="h-9 w-9 rounded-xl object-contain bg-white/90 p-0.5" />
            <div>
              <div className="font-display font-bold">SRM InnovateX 2026</div>
              <div className="text-xs text-muted-foreground">Ideate | Innovate | Impact</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            India's most ambitious student hackathon — organized by SRM University, Ramapuram.
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Quick links</div>
          <ul className="space-y-2 text-sm">
            {["About", "Tracks", "Prizes", "Timeline", "FAQ"].map((l) => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="text-muted-foreground hover:text-foreground">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Follow</div>
          <div className="flex gap-2">
            {[Instagram, Linkedin, Twitter, Github].map((Icon, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full glass hover:bg-white/10 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-white/5 mx-auto max-w-7xl px-4 flex flex-wrap justify-between gap-3 text-xs text-muted-foreground">
        <div>© 2026 SRM InnovateX. All rights reserved.</div>
        <div>Crafted with care by the InnovateX team.</div>
      </div>
    </footer>
  );
}

function InnovateXLanding() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <WhyParticipate />
        <Prizes />
        <Tracks />
        <Timeline />
        <Venue />
        <FAQ />
        <Sponsors />
        <Team />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}
