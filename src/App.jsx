import react from "react";
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Home","About","Projects","Experience","Resume","Contact"];

const SKILLS = {
  Frontend: ["HTML5","CSS3","JavaScript (ES6+)","React.js","Responsive Design"],
  Backend:  ["Node.js","Express.js","RESTful APIs","JWT Auth","Socket Programming"],
  Database: ["MongoDB","Mongoose ODM"],
  Tools:    ["Git & GitHub","Postman","Java"],
};

const PROJECTS = [
  {
    title: "USDT Mining Platform",
    description: "Full-featured crypto mining simulation platform with real-time earnings tracker, wallet dashboard, and admin control panel.",
    stack: ["React.js","Node.js","Express.js","MongoDB","JWT"],
    live: "#",
    github: "https://github.com/f4farmaish",
  },
  {
    title: "Survey Earn Application",
    description: "A platform where users complete surveys to earn reward points — multi-step forms, conditional logic, and point tracking.",
    stack: ["React.js","Node.js","Express.js","MongoDB"],
    live: "#",
    github: "https://github.com/f4farmaish",
  },
  {
    title: "E-Commerce Website",
    description: "Complete e-commerce solution with product catalog, search & filter, shopping cart, checkout flow, and order management.",
    stack: ["React.js","Node.js","Express.js","MongoDB"],
    live: "#",
    github: "https://github.com/f4farmaish",
  },
  {
    title: "Lifeqs – UI Redesign",
    description: "Complete frontend redesign of the Lifeqs platform — improved navigation, visual hierarchy, and mobile responsiveness.",
    stack: ["React.js","CSS3"],
    live: "#",
    github: "https://github.com/f4farmaish",
  },
];

const EXPERIENCE = [
  {
    role: "Full Stack Developer",
    company: "Solution Givers",
    duration: "Oct 2025 – Feb 2026",
    location: "Lahore, Pakistan",
    points: [
      "Led full stack development of client projects including a USDT Mining Platform and Survey Earn application from design to production.",
      "Built RESTful APIs with Node.js & Express.js; designed MongoDB schemas for users, transactions, wallets, and reward systems.",
      "Implemented JWT authentication, role-based access control, and protected API endpoints.",
      "Communicated directly with clients to gather requirements, present demos, and iterate rapidly.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "Rafienthic",
    duration: "Jun 2025 – Oct 2025",
    location: "Lahore, Pakistan",
    points: [
      "Contributed to full stack development of multiple client web products over 4 months.",
      "Completely redesigned the frontend UI of the Lifeqs platform — improved navigation and responsiveness.",
      "Built and integrated backend APIs for an E-Commerce platform including cart, checkout, and orders.",
      "Participated in Agile sprints, code reviews, and team standups.",
    ],
  },
];

// ─── ICONS (inline SVGs) ──────────────────────────────────────────────────────
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
  </svg>
);

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height ? (scrollTop / height) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const ids = NAV_LINKS.map(l => l.toLowerCase());
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

// ─── FADE-IN wrapper ──────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────
function SectionHeader({ tag, title, dark }) {
  return (
    <FadeIn className="mb-14 text-center">
      <span style={{ color: "var(--accent)", fontFamily:"var(--font-mono)", fontSize:"0.8rem", letterSpacing:"0.12em", textTransform:"uppercase" }}>
        {tag}
      </span>
      <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(2rem,5vw,3rem)", fontWeight:700, marginTop:"0.4rem",
        color: dark ? "var(--text-on-dark)" : "var(--text-primary)" }}>
        {title}
      </h2>
      <div style={{ width:48, height:3, background:"var(--accent)", margin:"1rem auto 0", borderRadius:2 }}/>
    </FadeIn>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const progress = useScrollProgress();
  const activeSection = useActiveSection();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = id => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
  };

  
  const handleSubmit = (e) => {
  e.preventDefault();

  emailjs.send(
    "service_49iroa6",        // your Service ID
    "template_blu52jn",       // your Template ID
    {
      user_name: form.name,
      user_email: form.email,
      message: form.message,
    },
    "your_public_key"         // replace with your EmailJS Public Key
  )
  .then((res) => {
    console.log("Email sent successfully!", res);
    setSent(true);
    setForm({ name:"", email:"", message:"" });
  })
  .catch((err) => {
    console.error("Email send failed:", err);
    alert("Oops! Something went wrong. Please try again.");
  });
};

  // ── CSS VARS ──
  const vars = dark ? {
    "--bg":           "#0f0f13",
    "--bg-surface":   "#17171f",
    "--bg-card":      "#1e1e28",
    "--border":       "rgba(255,255,255,0.08)",
    "--text-primary": "#f0f0f4",
    "--text-muted":   "#8888a0",
    "--accent":       "#6ee7b7",
    "--accent-dim":   "rgba(110,231,183,0.12)",
    "--text-on-dark": "#f0f0f4",
    "--font-display": "'Playfair Display', Georgia, serif",
    "--font-body":    "'DM Sans', sans-serif",
    "--font-mono":    "'JetBrains Mono', monospace",
    "--shadow":       "0 4px 32px rgba(0,0,0,0.45)",
  } : {
    "--bg":           "#fafaf8",
    "--bg-surface":   "#f2f2ef",
    "--bg-card":      "#ffffff",
    "--border":       "rgba(0,0,0,0.08)",
    "--text-primary": "#1a1a2e",
    "--text-muted":   "#666680",
    "--accent":       "#0d9488",
    "--accent-dim":   "rgba(13,148,136,0.10)",
    "--text-on-dark": "#1a1a2e",
    "--font-display": "'Playfair Display', Georgia, serif",
    "--font-body":    "'DM Sans', sans-serif",
    "--font-mono":    "'JetBrains Mono', monospace",
    "--shadow":       "0 4px 24px rgba(0,0,0,0.10)",
  };

  const base = {
    ...vars,
    background: "var(--bg)",
    color: "var(--text-primary)",
    fontFamily: "var(--font-body)",
    minHeight: "100vh",
    scrollBehavior: "smooth",
  };

  // ─── LOADING ────────────────────────────────────────────────────────────────
  if (loading) return (
    <>
      <style>{gfonts}</style>
      <div style={{ ...base, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100vh", gap:20 }}>
        <div style={{
          width:44, height:44, border:`3px solid var(--border)`, borderTop:`3px solid var(--accent)`,
          borderRadius:"50%", animation:"spin 0.8s linear infinite"
        }}/>
        <p style={{ color:"var(--text-muted)", fontFamily:"var(--font-mono)", fontSize:"0.8rem" }}>Loading portfolio…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </>
  );

  return (
    <>
      <style>{gfonts + globalCSS}</style>
      <div style={base}>

        {/* ── SCROLL PROGRESS ── */}
        <div style={{
          position:"fixed", top:0, left:0, height:2, width:`${progress}%`,
          background:"var(--accent)", zIndex:9999, transition:"width 0.1s"
        }}/>

        {/* ── NAVBAR ── */}
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          background: dark ? "rgba(15,15,19,0.88)" : "rgba(250,250,248,0.88)",
          backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
          borderBottom:`1px solid var(--border)`,
          padding:"0 clamp(1.5rem,5vw,4rem)", display:"flex",
          alignItems:"center", justifyContent:"space-between", height:64,
        }}>
          <span style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.2rem", color:"var(--accent)", cursor:"pointer" }}
            onClick={() => scrollTo("home")}>
            Farmaish<span style={{ color:"var(--text-primary)" }}>.</span>
          </span>

          {/* Desktop nav */}
          <div className="desktop-nav" style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{
                  background:"none", border:"none", cursor:"pointer",
                  fontFamily:"var(--font-body)", fontSize:"0.9rem",
                  color: activeSection === l ? "var(--accent)" : "var(--text-muted)",
                  fontWeight: activeSection === l ? 600 : 400,
                  transition:"color 0.2s", padding:"4px 0",
                  borderBottom: activeSection === l ? "2px solid var(--accent)" : "2px solid transparent",
                }}>
                {l}
              </button>
            ))}
            <button onClick={() => setDark(d => !d)}
              style={{ background:"var(--accent-dim)", border:"1px solid var(--border)", borderRadius:8,
                padding:"6px 10px", cursor:"pointer", color:"var(--text-primary)", transition:"background 0.2s" }}>
              {dark ? <SunIcon/> : <MoonIcon/>}
            </button>
          </div>

          {/* Mobile */}
          <div className="mobile-nav-btn" style={{ display:"none", alignItems:"center", gap:12 }}>
            <button onClick={() => setDark(d => !d)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-primary)" }}>
              {dark ? <SunIcon/> : <MoonIcon/>}
            </button>
            <button onClick={() => setMenuOpen(o => !o)}
              style={{ background:"none", border:"none", cursor:"pointer", color:"var(--text-primary)" }}>
              {menuOpen ? <CloseIcon/> : <MenuIcon/>}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position:"fixed", top:64, left:0, right:0, zIndex:99,
            background:"var(--bg-surface)", borderBottom:`1px solid var(--border)`,
            padding:"1.5rem 2rem", display:"flex", flexDirection:"column", gap:"1.2rem",
          }}>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => scrollTo(l)}
                style={{ background:"none", border:"none", cursor:"pointer", fontFamily:"var(--font-body)",
                  fontSize:"1rem", color: activeSection===l ? "var(--accent)" : "var(--text-primary)",
                  fontWeight: activeSection===l ? 600 : 400, textAlign:"left" }}>
                {l}
              </button>
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* HOME */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="home" style={{
          minHeight:"100vh", display:"flex", alignItems:"center",
          padding:"0 clamp(1.5rem,8vw,8rem)", paddingTop:80,
        }}>
          <div style={{ maxWidth:1100, margin:"0 auto", width:"100%",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            gap:"4rem", flexWrap:"wrap" }}>

            {/* Text */}
            <div style={{ flex:"1 1 320px" }}>
              <FadeIn delay={0}>
                <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.85rem", color:"var(--accent)",
                  letterSpacing:"0.1em", marginBottom:"1rem", textTransform:"uppercase" }}>
                  Hey, I'm
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <h1 style={{ fontFamily:"var(--font-display)", fontWeight:700,
                  fontSize:"clamp(2.8rem,7vw,5rem)", lineHeight:1.08, marginBottom:"0.5rem" }}>
                  Farmaish Ali
                </h1>
              </FadeIn>
              <FadeIn delay={200}>
                <h2 style={{ fontSize:"clamp(1.2rem,3vw,1.6rem)", color:"var(--text-muted)",
                  fontWeight:400, marginBottom:"1.2rem" }}>
                  Full Stack Developer &middot; MERN Stack
                </h2>
              </FadeIn>
              <FadeIn delay={300}>
                <p style={{ color:"var(--text-muted)", lineHeight:1.8, maxWidth:480, marginBottom:"2rem", fontSize:"1rem" }}>
                  I build fast, clean web applications from database to UI.
                  8+ months delivering real-world products in fintech, e-commerce, and SaaS.
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                <div style={{ display:"flex", gap:"1rem", flexWrap:"wrap" }}>
                  <button className="btn-primary" onClick={() => scrollTo("projects")}
                    style={{ background:"var(--accent)", color:"#0f0f13", border:"none",
                      padding:"0.8rem 1.8rem", borderRadius:8, fontWeight:600,
                      cursor:"pointer", fontSize:"0.95rem", transition:"opacity 0.2s, transform 0.15s" }}
                    onMouseEnter={e => e.target.style.opacity=0.85}
                    onMouseLeave={e => e.target.style.opacity=1}>
                    View Projects
                  </button>
                  <button onClick={() => scrollTo("contact")}
                    style={{ background:"none", border:`1.5px solid var(--accent)`, color:"var(--accent)",
                      padding:"0.8rem 1.8rem", borderRadius:8, fontWeight:600,
                      cursor:"pointer", fontSize:"0.95rem", transition:"background 0.2s" }}
                    onMouseEnter={e => { e.target.style.background="var(--accent-dim)"; }}
                    onMouseLeave={e => { e.target.style.background="none"; }}>
                    Contact Me
                  </button>
                </div>
              </FadeIn>
            </div>

            {/* Avatar */}
            <FadeIn delay={200} className="">
              <div style={{
                width: "clamp(200px,25vw,280px)",
                height:"clamp(200px,25vw,280px)",
                borderRadius:"50%",
                background:"var(--accent-dim)",
                border:`2px solid var(--accent)`,
                display:"flex", alignItems:"center", justifyContent:"center",
                flexShrink:0, overflow:"hidden",
                boxShadow:`0 0 60px var(--accent-dim)`,
              }}>
<img 
  src="src/assets/image.png" 
  alt="Farmaish Ali"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }}
/>              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* ABOUT */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="about" style={{
          padding:"6rem clamp(1.5rem,8vw,8rem)",
          background:"var(--bg-surface)",
        }}>
          <div style={{ maxWidth:1000, margin:"0 auto" }}>
            <SectionHeader tag="01 / About" title="Who I Am"/>

            <div style={{ display:"flex", gap:"4rem", flexWrap:"wrap", alignItems:"flex-start" }}>
              <FadeIn className="" style={{ flex:"1 1 280px" }}>
                <div style={{ flex:"1 1 280px" }}>
                  <p style={{ color:"var(--text-muted)", lineHeight:1.9, fontSize:"1rem", marginBottom:"1rem" }}>
                    I'm a Full Stack Developer based in Lahore, Pakistan, currently pursuing my BSIT from the University of the Punjab (graduating 2026).
                  </p>
                  <p style={{ color:"var(--text-muted)", lineHeight:1.9, fontSize:"1rem" }}>
                    With 8+ months of professional experience, I specialize in the MERN stack — building everything from auth systems and REST APIs to pixel-perfect React frontends. I care about clean code, fast delivery, and real client communication.
                  </p>
                  <div style={{ marginTop:"1.5rem", display:"flex", gap:"1rem" }}>
                    <a href="https://github.com/f4farmaish" target="_blank" rel="noreferrer"
                      style={{ color:"var(--accent)", display:"flex", alignItems:"center", gap:6, fontSize:"0.9rem", textDecoration:"none" }}>
                      <GithubIcon/> github.com/f4farmaish
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Skills */}
              <div style={{ flex:"1 1 320px", display:"flex", flexDirection:"column", gap:"1.5rem" }}>
                {Object.entries(SKILLS).map(([cat, items], i) => (
                  <FadeIn key={cat} delay={i * 80}>
                    <div style={{ background:"var(--bg-card)", borderRadius:12,
                      padding:"1.2rem 1.4rem", border:`1px solid var(--border)` }}>
                      <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem",
                        color:"var(--accent)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.8rem" }}>
                        {cat}
                      </p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem" }}>
                        {items.map(s => (
                          <span key={s} style={{
                            background:"var(--accent-dim)", border:`1px solid var(--border)`,
                            color:"var(--text-primary)", borderRadius:6,
                            padding:"3px 10px", fontSize:"0.82rem" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* PROJECTS */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="projects" style={{ padding:"6rem clamp(1.5rem,8vw,8rem)" }}>
          <div style={{ maxWidth:1100, margin:"0 auto" }}>
            <SectionHeader tag="02 / Projects" title="Things I've Built"/>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:"1.5rem" }}>
              {PROJECTS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 80}>
                  <div className="project-card" style={{
                    background:"var(--bg-card)", border:`1px solid var(--border)`,
                    borderRadius:14, padding:"1.6rem",
                    display:"flex", flexDirection:"column", height:"100%",
                    transition:"transform 0.22s, box-shadow 0.22s, border-color 0.22s",
                    cursor:"default",
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform="translateY(-5px)";
                      e.currentTarget.style.boxShadow="var(--shadow)";
                      e.currentTarget.style.borderColor="var(--accent)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform="translateY(0)";
                      e.currentTarget.style.boxShadow="none";
                      e.currentTarget.style.borderColor="var(--border)";
                    }}>
                    <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700,
                      fontSize:"1.15rem", marginBottom:"0.7rem" }}>{p.title}</h3>
                    <p style={{ color:"var(--text-muted)", fontSize:"0.9rem",
                      lineHeight:1.7, flex:1, marginBottom:"1rem" }}>{p.description}</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"0.4rem", marginBottom:"1.2rem" }}>
                      {p.stack.map(t => (
                        <span key={t} style={{
                          background:"var(--accent-dim)", color:"var(--accent)",
                          fontFamily:"var(--font-mono)", fontSize:"0.72rem",
                          borderRadius:4, padding:"2px 8px", border:`1px solid var(--accent-dim)` }}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:"1rem" }}>
                      <a href={p.github} target="_blank" rel="noreferrer"
                        style={{ display:"flex", alignItems:"center", gap:5, color:"var(--text-muted)",
                          fontSize:"0.85rem", textDecoration:"none", transition:"color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
                        onMouseLeave={e => e.currentTarget.style.color="var(--text-muted)"}>
                        <GithubIcon/> Code
                      </a>
                      <a href={p.live} target="_blank" rel="noreferrer"
                        style={{ display:"flex", alignItems:"center", gap:5, color:"var(--text-muted)",
                          fontSize:"0.85rem", textDecoration:"none", transition:"color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
                        onMouseLeave={e => e.currentTarget.style.color="var(--text-muted)"}>
                        <ExternalIcon/> Live
                      </a>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* EXPERIENCE */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="experience" style={{
          padding:"6rem clamp(1.5rem,8vw,8rem)",
          background:"var(--bg-surface)",
        }}>
          <div style={{ maxWidth:820, margin:"0 auto" }}>
            <SectionHeader tag="03 / Experience" title="Where I've Worked"/>
            <div style={{ position:"relative", paddingLeft:"2rem" }}>
              {/* vertical line */}
              <div style={{
                position:"absolute", left:0, top:8, bottom:8,
                width:2, background:"var(--border)", borderRadius:2,
              }}/>
              {EXPERIENCE.map((exp, i) => (
                <FadeIn key={exp.company} delay={i * 100} className="">
                  <div style={{ position:"relative", marginBottom: i < EXPERIENCE.length-1 ? "3rem" : 0 }}>
                    {/* dot */}
                    <div style={{
                      position:"absolute", left:"-2.5rem", top:6,
                      width:14, height:14, borderRadius:"50%",
                      background:"var(--accent)", border:`2px solid var(--bg-surface)`,
                      boxShadow:`0 0 0 3px var(--accent-dim)`,
                    }}/>
                    <div style={{
                      background:"var(--bg-card)", border:`1px solid var(--border)`,
                      borderRadius:12, padding:"1.5rem 1.6rem",
                    }}>
                      <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"0.5rem", marginBottom:"0.3rem" }}>
                        <h3 style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.1rem" }}>
                          {exp.role}
                        </h3>
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.78rem",
                          color:"var(--accent)", background:"var(--accent-dim)",
                          padding:"2px 10px", borderRadius:5, whiteSpace:"nowrap" }}>
                          {exp.duration}
                        </span>
                      </div>
                      <p style={{ color:"var(--accent)", fontSize:"0.92rem", marginBottom:"1rem", fontWeight:500 }}>
                        {exp.company} · {exp.location}
                      </p>
                      <ul style={{ paddingLeft:"1.2rem", margin:0 }}>
                        {exp.points.map((pt, j) => (
                          <li key={j} style={{ color:"var(--text-muted)", fontSize:"0.9rem",
                            lineHeight:1.75, marginBottom:"0.4rem" }}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* RESUME */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="resume" style={{ padding:"6rem clamp(1.5rem,8vw,8rem)" }}>
          <div style={{ maxWidth:720, margin:"0 auto", textAlign:"center" }}>
            <SectionHeader tag="04 / Resume" title="My Resume"/>
            <FadeIn>
              <p style={{ color:"var(--text-muted)", marginBottom:"2.5rem", lineHeight:1.8 }}>
                View or download my latest resume. It covers my experience, skills, education, and projects.
              </p>
              <div style={{ display:"flex", gap:"1rem", justifyContent:"center", flexWrap:"wrap" }}>
                <a href="https://drive.google.com/file/d/1cDJHsx-3G3UZX4Y76Rnbjw4REr_2QEbZ/view?usp=sharing" target="_blank" rel="noreferrer"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:8,
                    background:"var(--accent)", color:"#0f0f13", fontWeight:600,
                    padding:"0.85rem 2rem", borderRadius:8, textDecoration:"none",
                    fontSize:"0.95rem", transition:"opacity 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity=0.85}
                  onMouseLeave={e => e.currentTarget.style.opacity=1}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:18,height:18}}>
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                  </svg>
                  Download Resume
                </a>
                <a href="https://drive.google.com/file/d/1cDJHsx-3G3UZX4Y76Rnbjw4REr_2QEbZ/view?usp=sharing" target="_blank" rel="noreferrer"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:8,
                    background:"none", border:`1.5px solid var(--accent)`, color:"var(--accent)",
                    fontWeight:600, padding:"0.85rem 2rem", borderRadius:8,
                    textDecoration:"none", fontSize:"0.95rem", transition:"background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background="var(--accent-dim)"}
                  onMouseLeave={e => e.currentTarget.style.background="none"}>
                  <ExternalIcon/> View Online
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════ */}
        {/* CONTACT */}
        {/* ══════════════════════════════════════════════════════════════════ */}
        <section id="contact" style={{
          padding:"6rem clamp(1.5rem,8vw,8rem)",
          background:"var(--bg-surface)",
        }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <SectionHeader tag="05 / Contact" title="Let's Talk"/>
            <div style={{ display:"flex", gap:"3rem", flexWrap:"wrap" }}>
              {/* Form */}
              <FadeIn style={{ flex:"1 1 320px" }} className="">
                <div style={{ flex:"1 1 320px" }}>
                  {sent ? (
                    <div style={{
                      background:"var(--accent-dim)", border:`1px solid var(--accent)`,
                      borderRadius:12, padding:"2rem", textAlign:"center",
                    }}>
                      <p style={{ color:"var(--accent)", fontWeight:600, fontSize:"1.1rem" }}>✓ Message sent!</p>
                      <p style={{ color:"var(--text-muted)", marginTop:"0.5rem" }}>I'll get back to you soon.</p>
                      <button onClick={() => setSent(false)}
                        style={{ marginTop:"1rem", background:"none", border:`1px solid var(--accent)`,
                          color:"var(--accent)", borderRadius:6, padding:"6px 16px", cursor:"pointer" }}>
                        Send another
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
                      {["name","email"].map(field => (
                        <input key={field} type={field==="email"?"email":"text"}
                          placeholder={field.charAt(0).toUpperCase()+field.slice(1)}
                          value={form[field]}
                          onChange={e => setForm(f => ({...f,[field]:e.target.value}))}
                          required
                          style={{
                            background:"var(--bg-card)", border:`1px solid var(--border)`,
                            borderRadius:8, padding:"0.8rem 1rem", color:"var(--text-primary)",
                            fontFamily:"var(--font-body)", fontSize:"0.95rem", outline:"none",
                            transition:"border-color 0.2s",
                          }}
                          onFocus={e => e.target.style.borderColor="var(--accent)"}
                          onBlur={e => e.target.style.borderColor="var(--border)"}
                        />
                      ))}
                      <textarea placeholder="Your message…" rows={5} value={form.message}
                        onChange={e => setForm(f => ({...f,message:e.target.value}))} required
                        style={{
                          background:"var(--bg-card)", border:`1px solid var(--border)`,
                          borderRadius:8, padding:"0.8rem 1rem", color:"var(--text-primary)",
                          fontFamily:"var(--font-body)", fontSize:"0.95rem", outline:"none",
                          resize:"vertical", transition:"border-color 0.2s",
                        }}
                        onFocus={e => e.target.style.borderColor="var(--accent)"}
                        onBlur={e => e.target.style.borderColor="var(--border)"}
                      />
                      <button type="submit"
                        style={{
                          background:"var(--accent)", color:"#0f0f13", border:"none",
                          borderRadius:8, padding:"0.85rem", fontWeight:600,
                          fontSize:"0.95rem", cursor:"pointer", transition:"opacity 0.2s",
                        }}
                        onMouseEnter={e => e.target.style.opacity=0.85}
                        onMouseLeave={e => e.target.style.opacity=1}>
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </FadeIn>

              {/* Info */}
              <FadeIn delay={120} className="" style={{ flex:"0 1 240px" }}>
                <div style={{ flex:"0 1 240px", display:"flex", flexDirection:"column", gap:"1.4rem" }}>
                  {[
                    { label:"Email", val:"farmaishali@gmail.com", href:"mailto:farmaishali@gmail.com" },
                    { label:"Phone", val:"03289428437", href:"tel:+923289428437" },
                    { label:"GitHub", val:"github.com/f4farmaish", href:"https://github.com/f4farmaish" },
                    { label:"Location", val:"Lahore, Pakistan", href:null },
                  ].map(item => (
                    <div key={item.label}>
                      <p style={{ fontFamily:"var(--font-mono)", fontSize:"0.72rem",
                        color:"var(--accent)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"0.3rem" }}>
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} target={item.href.startsWith("http")?"_blank":undefined}
                          rel="noreferrer"
                          style={{ color:"var(--text-primary)", textDecoration:"none", fontSize:"0.95rem",
                            transition:"color 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
                          onMouseLeave={e => e.currentTarget.style.color="var(--text-primary)"}>
                          {item.val}
                        </a>
                      ) : (
                        <p style={{ color:"var(--text-primary)", fontSize:"0.95rem", margin:0 }}>{item.val}</p>
                      )}
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          padding:"2rem clamp(1.5rem,8vw,8rem)",
          background:"var(--bg)", borderTop:`1px solid var(--border)`,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          flexWrap:"wrap", gap:"1rem",
        }}>
          <p style={{ color:"var(--text-muted)", fontSize:"0.88rem" }}>
            © {new Date().getFullYear()} Farmaish Ali. Built with React.
          </p>
          <div style={{ display:"flex", gap:"1.2rem" }}>
            <a href="https://github.com/f4farmaish" target="_blank" rel="noreferrer"
              style={{ color:"var(--text-muted)", transition:"color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color="var(--accent)"}
              onMouseLeave={e => e.currentTarget.style.color="var(--text-muted)"}>
              <GithubIcon/>
            </a>
          </div>
        </footer>

      </div>
    </>
  );
}

// ── GOOGLE FONTS ──────────────────────────────────────────────────────────────
const gfonts = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
`;

// ── GLOBAL CSS ────────────────────────────────────────────────────────────────
const globalCSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { overflow-x: hidden; }
  ::selection { background: var(--accent); color: #0f0f13; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

  @media (max-width: 700px) {
    .desktop-nav { display: none !important; }
    .mobile-nav-btn { display: flex !important; }
  }
`;
