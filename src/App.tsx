import { useState, useEffect, useRef, type RefObject } from "react";
import {
  Menu,
  X,
  Zap,
  CreditCard,
  Shield,
  BarChart3,
  Users,
  Smartphone,
  FileText,
  ChevronRight,
  Star,
  ArrowRight,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

// Custom hook for intersection observer
function useInView(options?: IntersectionObserverInit): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
      { threshold: 0.15, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }: {
  children: React.ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right"; className?: string;
}) {
  const [ref, inView] = useInView();
  const dirs: Record<string, string> = {
    up: "translate-y-10", down: "-translate-y-10", left: "translate-x-10", right: "-translate-x-10",
  };
  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${dirs[direction]}`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function App() {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [text, setText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Typing effect
  useEffect(() => {
    const sentence = "Take Your Life-Progressing Step with 100% Digital Personal Loan";
    let i = 0;
    const typing = setInterval(() => {
      setText(sentence.slice(0, i + 1));
      i++;
      if (i === sentence.length) clearInterval(typing);
    }, 35);
    return () => clearInterval(typing);
  }, []);

  // Scroll effects
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ["home", "services", "why", "partners", "contact"];
      for (const s of sections.reverse()) {
        const el = document.getElementById(s);
        if (el && el.getBoundingClientRect().top <= 200) { setActiveSection(s); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const emi = Math.round(loanAmount / tenure);
  const loanPct = ((loanAmount - 10000) / (500000 - 10000)) * 100;
  const tenurePct = ((tenure - 6) / (60 - 6)) * 100;

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "why", label: "Why Us" },
    { id: "partners", label: "Partners" },
    { id: "contact", label: "Contact" },
  ];

  const services = [
    { icon: <Zap className="w-7 h-7" />, tag: "Fast Approval", title: "Instant Personal Loans", desc: "Get approved quickly and receive funds directly in your account within minutes.", color: "from-amber-400 to-orange-500" },
    { icon: <CreditCard className="w-7 h-7" />, tag: "Flexible", title: "Flexible EMIs", desc: "Choose repayment plans that fit your budget and pay at your convenience.", color: "from-emerald-400 to-teal-500" },
    { icon: <Shield className="w-7 h-7" />, tag: "Secure", title: "Secure Processing", desc: "Your personal and financial data is protected with bank-level encryption.", color: "from-blue-400 to-indigo-500" },
    { icon: <BarChart3 className="w-7 h-7" />, tag: "Low CIBIL", title: "Low CIBIL Loan Options", desc: "Even with a low credit score, you can still avail loan options tailored for you.", color: "from-purple-400 to-violet-500" },
  ];

  const whyUs = [
    { icon: <Users className="w-7 h-7" />, tag: "5+ Years Experience", title: "Trusted Experts", desc: "Our team has years of experience in finance and lending, ensuring you get the best advice.", color: "from-rose-400 to-pink-500" },
    { icon: <Shield className="w-7 h-7" />, tag: "256-bit Encryption", title: "Secure Platform", desc: "Your personal and financial data is always protected with bank-level encryption.", color: "from-cyan-400 to-blue-500" },
    { icon: <Smartphone className="w-7 h-7" />, tag: "User Friendly", title: "User Friendly", desc: "Our platform is simple, intuitive, and designed for all users, regardless of tech skills.", color: "from-lime-400 to-green-500" },
    { icon: <FileText className="w-7 h-7" />, tag: "Detailed Reports", title: "Comprehensive Reports", desc: "Track your loans, repayments, and financial performance with clear, detailed reports.", color: "from-orange-400 to-red-500" },
  ];

  const partners = [
    { name: "Fullerton India", rating: 4.5 },
    { name: "HeroFinCorp", rating: 4.3 },
    { name: "PaySense", rating: 4.4 },
    { name: "Piramal Finance", rating: 4.6 },
    { name: "Upwards", rating: 4.2 },
    { name: "MoneyTap", rating: 4.1 },
  ];

  return (
    <div className="app-root">
      {/* ─── NAVBAR ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-slate-200/50" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B3A6A] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-shadow duration-300">
              F
            </div>
            <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? "text-[#1B3A6A]" : "text-[#1B3A6A]"}`}>
              FL<span className="text-blue-500">P</span>
            </span>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-[#1B3A6A] bg-blue-50"
                      : "text-slate-600 hover:text-[#1B3A6A] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("home")}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#1B3A6A] to-[#2563eb] text-white text-sm font-semibold rounded-full shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Apply Now <ArrowRight className="w-4 h-4" />
            </button>
            <button
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="w-6 h-6 text-[#1B3A6A]" /> : <Menu className="w-6 h-6 text-[#1B3A6A]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 top-[72px] bg-white/95 backdrop-blur-xl transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
          <ul className="flex flex-col items-center gap-2 pt-10">
            {navItems.map((item, i) => (
              <li key={item.id} className={`transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`px-8 py-3 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                    activeSection === item.id ? "bg-blue-50 text-[#1B3A6A]" : "text-slate-600 hover:text-[#1B3A6A]"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
            <li className={`mt-4 transition-all duration-500 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`} style={{ transitionDelay: "400ms" }}>
              <button
                onClick={() => scrollTo("home")}
                className="px-8 py-3 bg-gradient-to-r from-[#1B3A6A] to-[#2563eb] text-white font-semibold rounded-full shadow-lg"
              >
                Apply Now
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section id="home" className="relative min-h-screen pt-28 pb-20 px-6 overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-cyan-100/20 to-blue-100/20 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left */}
          <div className="flex-1 space-y-8">
            <FadeIn>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 text-blue-700 text-sm font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                100% Online Process
              </span>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-tight text-slate-900 tracking-tight">
                {text}
                <span className="inline-block w-[3px] h-[1em] bg-blue-500 ml-1 align-middle animate-blink" />
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                Pre-Approved Offers From Multiple NBFCs. Get your loan approved in minutes with minimal documentation.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <div className="flex flex-wrap gap-4">
                {["Flexible EMI Options", "Lowest Interest Rate", "Low CIBIL Allowed"].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span className="text-sm font-semibold text-slate-700">{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={400}>
              <div className="flex items-center gap-6 pt-2">
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-md">
                      {["A", "R", "S", "K"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">Trusted by <span className="font-semibold text-slate-700">10,000+</span> customers</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right – Loan Form */}
          <FadeIn direction="right" delay={200} className="flex-1 w-full max-w-md">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur-xl opacity-20" />
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 p-8 border border-white/50">
                <h2 className="text-xl font-bold text-[#1B3A6A] mb-6 text-center">Calculate Your EMI</h2>

                {/* Loan Amount */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-600">Loan Amount</label>
                    <span className="text-lg font-bold text-[#1B3A6A]">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#1B3A6A] to-blue-500 rounded-full transition-all duration-200" style={{ width: `${loanPct}%` }} />
                  </div>
                  <input
                    type="range" min={10000} max={500000} step={5000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="range-input"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>₹10K</span><span>₹5L</span>
                  </div>
                </div>

                {/* Tenure */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-600">Tenure</label>
                    <span className="text-lg font-bold text-[#1B3A6A]">{tenure} months</span>
                  </div>
                  <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-200" style={{ width: `${tenurePct}%` }} />
                  </div>
                  <input
                    type="range" min={6} max={60} step={1}
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="range-input"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>6 mo</span><span>60 mo</span>
                  </div>
                </div>

                {/* EMI Display */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-6 text-center border border-blue-100">
                  <p className="text-sm text-slate-500 mb-1">Your Monthly EMI</p>
                  <p className="text-3xl font-extrabold text-[#1B3A6A]">₹{emi.toLocaleString()}</p>
                  <p className="text-xs text-slate-400 mt-1">*Approximate calculation</p>
                </div>

                {/* Mobile Input */}
                <div className="mb-4">
                  <label className="text-sm font-semibold text-slate-600 mb-2 block">Mobile Number</label>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
                    <span className="text-slate-400 text-sm">+91</span>
                    <input
                      type="tel"
                      placeholder="Enter your mobile number"
                      className="flex-1 outline-none bg-transparent text-sm"
                      maxLength={10}
                    />
                  </div>
                </div>

                {/* Agreements */}
                <div className="space-y-3 mb-6">
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600" />
                    <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                      By submitting the form, you agree to the Terms of Use and Privacy Policy of FLP.
                    </span>
                  </label>
                  <label className="flex items-start gap-2 cursor-pointer group">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-slate-300 text-blue-600 accent-blue-600" />
                    <span className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                      I agree to receive promotional communications from FLP.
                    </span>
                  </label>
                </div>

                {/* Apply Button */}
                <button className="w-full py-4 bg-gradient-to-r from-[#1B3A6A] to-[#2563eb] text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group">
                  Apply Now
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full">
            <path d="M0 40 C360 100 720 0 1080 50 C1260 75 1380 60 1440 40 V100 H0 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-4">Our Services</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Everything You Need for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A6A] to-blue-500">Financial Goals</span>
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We offer a range of financial services designed to help you achieve your goals with ease and confidence.</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  {/* Hover gradient bg */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        {s.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-semibold group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#1B3A6A] transition-colors duration-300">{s.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#1B3A6A] to-[#2563eb] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { val: "10K+", label: "Happy Customers" },
            { val: "₹50Cr+", label: "Loans Disbursed" },
            { val: "15+", label: "NBFC Partners" },
            { val: "4.8★", label: "Customer Rating" },
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div>
                <p className="text-3xl md:text-4xl font-extrabold mb-1">{stat.val}</p>
                <p className="text-blue-200 text-sm font-medium">{stat.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── WHY CHOOSE ─── */}
      <section id="why" className="py-24 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-4">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B3A6A] to-blue-500">FLP</span> Stands Out
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We combine technology and trust to deliver a seamless lending experience.</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map((w, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${w.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${w.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                        {w.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-xs font-semibold group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                        {w.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-[#1B3A6A] transition-colors duration-300">{w.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-sm font-semibold mb-4">Simple Process</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Get Your Loan in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">3 Easy Steps</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Apply Online", desc: "Fill in your basic details and loan requirements in our simple online form.", icon: "📝" },
              { step: "02", title: "Get Approved", desc: "Our system matches you with the best NBFC offer and gets instant approval.", icon: "✅" },
              { step: "03", title: "Receive Funds", desc: "Once approved, funds are transferred directly to your bank account.", icon: "💰" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="relative text-center group">
                  {i < 2 && (
                    <div className="hidden md:block absolute top-12 left-[calc(50%+50px)] w-[calc(100%-100px)] border-t-2 border-dashed border-slate-200" />
                  )}
                  <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 border-2 border-slate-100 mb-6 text-4xl group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                    {s.icon}
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#1B3A6A] to-blue-500 text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">{s.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNERS ─── */}
      <section id="partners" className="py-24 px-6 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 text-amber-600 text-sm font-semibold mb-4">Our Partners</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Trusted <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">NBFC Partners</span>
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto">We work with India's most trusted NBFCs to bring you the best loan offers.</p>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((p, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="group flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-lg transition-all duration-400 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-[#1B3A6A] font-extrabold text-xl border border-blue-100 group-hover:from-[#1B3A6A] group-hover:to-blue-500 group-hover:text-white transition-all duration-500 shrink-0">
                    {p.name[0]}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800 group-hover:text-[#1B3A6A] transition-colors duration-300">{p.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3.5 h-3.5 ${j < Math.floor(p.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}`} />
                      ))}
                      <span className="text-xs text-slate-400 ml-1">{p.rating}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1B3A6A] via-[#1e4a8a] to-[#2563eb] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-60 h-60 border-2 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-white rounded-full" />
        </div>
        <FadeIn>
          <div className="relative max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-200 text-lg mb-8 max-w-xl mx-auto">Apply for a personal loan in just a few minutes and get instant approval from our trusted NBFC partners.</p>
            <button
              onClick={() => scrollTo("home")}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#1B3A6A] font-bold rounded-full shadow-2xl hover:shadow-white/25 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </FadeIn>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="contact" className="bg-slate-900 text-white pt-20 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1B3A6A] to-[#2563eb] flex items-center justify-center text-white font-bold text-lg">F</div>
                <span className="text-xl font-bold">FL<span className="text-blue-400">P</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Your trusted partner for digital personal loans. Fast, secure, and hassle-free lending experience with FLP.</p>
              <div className="flex gap-3">
                {["f", "in", "tw", "ig"].map((s, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-blue-600 flex items-center justify-center text-slate-400 hover:text-white text-xs font-bold cursor-pointer transition-all duration-300 hover:-translate-y-1">
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {["Home", "Services", "About Us", "Partners", "Contact"].map((l, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200 hover:translate-x-1 inline-block">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-4">Services</h4>
              <ul className="space-y-3">
                {["Personal Loan", "Business Loan", "Education Loan", "Home Loan", "Loan Against Property"].map((l, i) => (
                  <li key={i}>
                    <a href="#" className="text-slate-400 hover:text-white text-sm transition-colors duration-200">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-white mb-4">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">info@flploans.com</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">+91 11-2345-6789</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <span className="text-slate-400 text-sm">42 Finance Tower, Connaught Place, New Delhi – 110001, India</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">© 2025 FLP. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-slate-500 hover:text-white text-sm transition-colors duration-200">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
