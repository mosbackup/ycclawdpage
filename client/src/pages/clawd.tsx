import { useState, useEffect } from "react";
import { Moon, Sun, Mail, Target } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import clawdLogoSrc from "@assets/ycclawd-logo.png";

const ACCENT = "#d97554";
const ACCENT2 = "#DA7757";

// Font stacks matching Claude's typographic style
const FONT_WORDMARK = '"Plus Jakarta Sans", sans-serif';   // replaces Playfair Display — geometric sans like Styrene B
const FONT_HEADING = '"EB Garamond", Georgia, serif'; // transitional serif like Galaxie Copernicus
const FONT_BODY     = '"Plus Jakarta Sans", sans-serif';   // clean geometric sans for UI
const FONT_MONO     = '"JetBrains Mono", monospace';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.338 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
  </svg>
);

const DiscordIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
  </svg>
);

const TelegramIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const PaperIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
  </svg>
);

const FAQ_ITEMS = [
  {
    q: "Why top 10%? Why not tracking the average of all YC startups?",
    a: "Although YC itself is very selective (99.5% rejection rate), most profits are concentrated in a tiny fraction of YC startups, following a Power law. The choice of 10% reflects a balance between concentration and diversification.",
    link: null,
  },
  {
    q: "How to know that YC Clawd is really picking the top YC startups?",
    a: "YC Clawd is constantly forward-tested on ",
    linkText: "YC Bench",
    linkHref: "https://www.ycbench.com/",
    aSuffix: ", a live benchmark of YC startups outperformance.",
  },
  {
    q: "What about access? Why do top YC founders accept YC Clawd on their cap table, alongside other top-tier VCs?",
    a: "YC Clawd backing is a strong signal of being a YC outperformer, according to ",
    linkText: "YC Bench startup leaderboard",
    linkHref: "https://www.ycbench.com/#startupsleaderboard",
    aSuffix:
      ". It shows belonging to an elite inside the elite. Likewise, Nobel Prize winners rarely refuse the prize.",
  },
  {
    q: "Is YC Clawd a crowdfunding platform?",
    a: "Yes, but specialized in automated investment in YC startups.",
    link: null,
  },
  {
    q: "Why YC Clawd and not plain Claude?",
    a: "Claude is still unreliable for this task. LLMs need to be embedded into an agentic deep research workflow to deliver non-random results. ",
    linkText: "That was discussed in this blog post",
    linkHref: "https://www.ycbench.com/blog/p26-startups-leaderboard",
    aSuffix: ".",
  },
  {
    q: "Is YC Clawd code open-source?",
    a: "Yes. View it on ",
    linkText: "GitHub",
    linkHref: "https://github.com/benstaf/ycclawd",
    aSuffix: ".",
  },
  {
    q: "Do I need to be accredited to invest in Y Combinator startups with YC Clawd?",
    a: "No. ",
    linkText: "US Regulation A+ (Title IV of the Jumpstart Our Business Startups Act)",
    linkHref: "https://www.sec.gov/rules-regulations/statutes-regulations/jumpstart-our-business-startups-jobs-act",
    aSuffix: " allows investors who do not qualify for accreditation to participate in startup funding, under some conditions.",
  },
  {
    q: "Do I need to be a US resident or citizen to invest with YC Clawd?",
    a: "No. ",
    linkText: "US regulations allow participation from international investors",
    linkHref: "https://home.treasury.gov/faq-item/international-affairs/can-foreign-investors-still-invest-in-the-united-states-technology-industry",
    aSuffix: " from most countries in the world, including in the tech sector.",
  },
];

export default function Clawd() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen selection:text-white"
      style={{
        backgroundColor: theme === "dark" ? "#141412" : "#FAF9F5",
        color: theme === "dark" ? "#F5F3EE" : "#1a1916",
        fontFamily: FONT_BODY,
        "--clawd-accent": ACCENT,
        "--clawd-accent2": ACCENT2,
      } as React.CSSProperties}
    >
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-200 border-b`}
        style={{
          background: isScrolled
            ? theme === "dark"
              ? "rgba(20,20,18,0.85)"
              : "rgba(250,249,245,0.85)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(12px)" : undefined,
          borderColor: isScrolled
            ? theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"
            : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={clawdLogoSrc}
              alt="YC Clawd"
              className="w-24 h-24 object-contain"
            />
            {/* Wordmark: geometric sans (like Claude's Styrene B nav font) */}
            <span
              className="text-2xl tracking-tight"
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 700,
                marginLeft: "-12px",
              }}
            >
              Clawd
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { href: "https://discord.gg/ekrySuRBf4", label: "Discord", icon: <DiscordIcon />, testId: "link-discord" },
              { href: "https://t.me/ycclawd",           label: "Telegram", icon: <TelegramIcon />, testId: "link-telegram" },
              { href: "https://github.com/benstaf/ycclawd", label: "GitHub", icon: <GithubIcon />, testId: "link-github" },
              { href: "https://arxiv.org/abs/2604.02378", label: "Paper", icon: <PaperIcon />, testId: "link-paper" },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors flex items-center gap-1.5"
                style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
                onMouseEnter={e => (e.currentTarget.style.color = ACCENT)}
                onMouseLeave={e => (e.currentTarget.style.color = theme === "dark" ? "#a09e98" : "#6b6963")}
                data-testid={item.testId}
              >
                {item.icon} {item.label}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
              aria-label="Toggle theme"
              data-testid="button-toggle-theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <a
              href="#register"
              className="px-6 py-2 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
              data-testid="button-register-nav"
            >
              Register
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-md transition-colors"
            style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden border-t px-4 py-4 flex flex-col gap-4"
            style={{
              background: theme === "dark" ? "rgba(20,20,18,0.97)" : "rgba(250,249,245,0.97)",
              borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
            }}
          >
            {[
              { href: "https://discord.gg/ekrySuRBf4", label: "Discord", icon: <DiscordIcon /> },
              { href: "https://t.me/ycclawd", label: "Telegram", icon: <TelegramIcon /> },
              { href: "https://github.com/benstaf/ycclawd", label: "GitHub", icon: <GithubIcon /> },
              { href: "https://arxiv.org/abs/2604.02378", label: "Paper", icon: <PaperIcon /> },
            ].map(item => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="text-sm font-medium flex items-center gap-2 py-1"
                style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
              >
                {item.icon} {item.label}
              </a>
            ))}
            <button
              onClick={() => { toggleTheme(); setMenuOpen(false); }}
              className="p-2 rounded-lg self-start transition-colors"
              style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="https://forms.gle/QCmqpN3F5yVJwi8x7"
              onClick={() => setMenuOpen(false)}
              className="px-6 py-2 rounded-full text-sm font-semibold text-white text-center transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              Register
            </a>
          </div>
        )}
      </nav>

      <main className="pt-24">
        {/* Hero */}
        <section className="px-4 sm:px-6 lg:px-8 pt-20 pb-16 max-w-5xl mx-auto text-center">
          {/* h1: transitional serif like Claude's Galaxie Copernicus headings */}
          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight"
            style={{
              fontFamily: FONT_HEADING,
              color: theme === "dark" ? "#F5F3EE" : "#1a1916",
            }}
          >
            Let YC Clawd invest in top{" "}
            <span style={{ color: ACCENT }}>YC startups</span>{" "}
            for you
          </h1>

          <p
            className="text-xl mb-6 max-w-2xl mx-auto leading-relaxed"
            style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
          >
            YC Clawd is an agentic VC that automatically invests in the top 10% of each YC batch.
          </p>

          <p
            className="text-base mb-12 max-w-2xl mx-auto leading-relaxed"
            style={{ color: theme === "dark" ? "#7a7873" : "#8a8880" }}
          >
            Think of YC Clawd as a kind of YC-10 ETF, tracking the top 10% of Y Combinator startups, like ETFs tracking Nasdaq 100 and S&P 500.
          </p>

          <div id="register" className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://forms.gle/QCmqpN3F5yVJwi8x7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-10 py-4 rounded-lg text-base font-semibold text-white transition-opacity hover:opacity-90 shadow-lg"
              style={{ background: ACCENT }}
              data-testid="button-register"
            >
              Register
            </a>
            <a
              href="https://t.me/ycclawd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg text-base font-semibold transition-all border"
              style={{
                color: ACCENT,
                borderColor: ACCENT,
                background: "transparent",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = ACCENT;
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.color = ACCENT;
              }}
              data-testid="button-telegram"
            >
              <TelegramIcon className="w-5 h-5" />
              Join Telegram group
            </a>
          </div>
        </section>

        {/* Credibility Strip */}
        <section
          className="border-y py-4"
          style={{
            borderColor: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
            background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          }}
        >
          <div
            className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 md:gap-16 text-sm uppercase tracking-wider"
            style={{
              fontFamily: FONT_MONO,
              color: theme === "dark" ? "#6b6963" : "#9a9891",
            }}
          >
            <span>Agentic VC</span>
            <span className="hidden sm:inline">•</span>
            <span>Top 10% YC Startups</span>
            <span className="hidden sm:inline">•</span>
            <span>Powered by Claude</span>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{
              fontFamily: FONT_HEADING,
              color: theme === "dark" ? "#F5F3EE" : "#1a1916",
            }}
          >
            Invest in a YC-10 ETF
          </h2>
          <div className="space-y-6">
            <p
              className="text-2xl font-medium"
              style={{ color: theme === "dark" ? "#F5F3EE" : "#1a1916" }}
            >
              Power law investing, automated.
            </p>
            <p
              className="text-lg leading-relaxed max-w-2xl mx-auto"
              style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
            >
              YC startup returns follow a power law - the top 10% generate most of the returns. YC Clawd uses an agentic deep research workflow to identify these outperformers, then automatically invests in them.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Startups analyzed", value: "200+", desc: "per YC batch" },
              { label: "Target allocation", value: "Top 10%", desc: "per cohort" },
              { label: "Check size", value: "$1M", desc: "per deal" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-8 border"
                style={{
                  background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                  borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                }}
              >
                <div
                  className="text-4xl font-bold mb-2"
                  style={{ color: ACCENT, fontFamily: FONT_HEADING }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-sm font-semibold mb-1"
                  style={{ color: theme === "dark" ? "#F5F3EE" : "#1a1916" }}
                >
                  {stat.label}
                </div>
                <div
                  className="text-xs"
                  style={{ color: theme === "dark" ? "#6b6963" : "#9a9891" }}
                >
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section
          className="py-24"
          style={{
            background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{
                  fontFamily: FONT_HEADING,
                  color: theme === "dark" ? "#F5F3EE" : "#1a1916",
                }}
              >
                How It Works
              </h2>
              <p className="text-lg" style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}>
                Three steps from YC batch to your portfolio.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div
                className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[2px]"
                style={{ background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
              />
              {[
                { step: "1", title: "YC Clawd Due Diligence", desc: "An agentic Claude workflow performs deep research across each YC batch, scoring startups on cohort-relative signals." },
                { step: "2", title: "Top 10% Selected", desc: "The system selects the top 10% of each cohort - those with the strongest execution velocity." },
                { step: "3", title: "Automatic Investment", desc: "YC Clawd automatically invests for you in the selected startups, building a diversified YC outperformer portfolio." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="relative rounded-2xl pt-8 px-6 pb-8 border text-center group transition-shadow hover:shadow-lg"
                  style={{
                    background: theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff",
                    borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                  }}
                >
                  <div
                    className="absolute top-4 left-4 text-xs font-bold px-2 py-1 rounded"
                    style={{
                      fontFamily: FONT_MONO,
                      color: theme === "dark" ? "#6b6963" : "#9a9891",
                      background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                    }}
                  >
                    STEP {item.step}
                  </div>
                  <div
                    className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-6 text-2xl font-bold text-white group-hover:-translate-y-1 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT2})` }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-3"
                    style={{
                      fontFamily: FONT_HEADING,
                      color: theme === "dark" ? "#F5F3EE" : "#1a1916",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
            style={{
              fontFamily: FONT_HEADING,
              color: theme === "dark" ? "#F5F3EE" : "#1a1916",
            }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border overflow-hidden transition-all"
                style={{
                  borderColor: openFaq === i
                    ? ACCENT
                    : theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)",
                  background: theme === "dark" ? "rgba(255,255,255,0.03)" : "#fff",
                }}
              >
                <button
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-base transition-colors"
                  style={{ color: theme === "dark" ? "#F5F3EE" : "#1a1916" }}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`button-faq-${i}`}
                >
                  <span>{item.q}</span>
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm transition-transform"
                    style={{
                      background: openFaq === i ? ACCENT : theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                      color: openFaq === i ? "#fff" : theme === "dark" ? "#a09e98" : "#6b6963",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div
                    className="px-6 pb-6 text-sm leading-relaxed"
                    style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
                    data-testid={`text-faq-answer-${i}`}
                  >
                    {item.a}
                    {item.linkText && (
                      <a
                        href={item.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2 transition-opacity hover:opacity-80"
                        style={{ color: ACCENT }}
                      >
                        {item.linkText}
                      </a>
                    )}
                    {item.aSuffix}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className="py-20 mx-4 sm:mx-8 lg:mx-16 rounded-3xl mb-24"
          style={{
            background: `linear-gradient(135deg, ${ACCENT} 0%, ${ACCENT2} 100%)`,
          }}
        >
          <div className="max-w-3xl mx-auto px-8 text-center">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: FONT_HEADING }}
            >
              Ready to invest in the top 10% of YC?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Register now for early access to YC Clawd and start building your YC outperformer portfolio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://forms.gle/QCmqpN3F5yVJwi8x7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-white rounded-lg text-base font-semibold transition-opacity hover:opacity-90"
                style={{ color: ACCENT }}
                data-testid="button-register-cta"
              >
                Register for Early Access
              </a>
              <a
                href="https://t.me/ycclawd"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border-2 border-white/60 rounded-lg text-base font-semibold text-white transition-colors hover:bg-white/10"
                data-testid="button-telegram-cta"
              >
                <TelegramIcon className="w-5 h-5" />
                Join Telegram
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-t"
          style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="text-3xl font-bold mb-8"
                style={{
                  fontFamily: FONT_HEADING,
                  color: theme === "dark" ? "#F5F3EE" : "#1a1916",
                }}
              >
                Contact Us
              </h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4 text-lg">
                  <Mail className="w-6 h-6 shrink-0 mt-1" style={{ color: ACCENT }} />
                  <div>
                    <div className="font-semibold mb-1" style={{ color: theme === "dark" ? "#F5F3EE" : "#1a1916" }}>Email</div>
                    <a
                      href="mailto:info@ycclawd.com"
                      className="transition-colors hover:opacity-80"
                      style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}
                      data-testid="link-email"
                    >
                      info@ycclawd.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4 text-lg">
                  <Target className="w-6 h-6 shrink-0 mt-1" style={{ color: ACCENT }} />
                  <div>
                    <div className="font-semibold mb-1" style={{ color: theme === "dark" ? "#F5F3EE" : "#1a1916" }}>Address</div>
                    <address className="not-italic" style={{ color: theme === "dark" ? "#a09e98" : "#6b6963" }}>
                      YC Clawd<br />
                      548 Market St PMB 41382<br />
                      San Francisco, CA 94104<br />
                      USA
                    </address>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="rounded-2xl overflow-hidden border shadow-md"
              style={{ height: 380, borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0336215160846!2d-122.4018898!3d37.7891283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b8b30531f%3A0x6a0f4435987a049d!2s548%20Market%20St%20%2341382%2C%20San%20Francisco%2C%20CA%2094104!5e0!3m2!1sen!2sus!4v1709999999999!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-12"
        style={{
          borderColor: theme === "dark" ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
          background: theme === "dark" ? "#141412" : "#FAF9F5",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center">
            <img src={clawdLogoSrc} alt="YC Clawd" className="w-28 h-28 object-contain" />
            {/* Footer wordmark: same geometric sans as nav */}
            <span
              className="text-2xl tracking-tight"
              style={{
                fontFamily: FONT_HEADING,
                fontWeight: 700,
                color: theme === "dark" ? "#F5F3EE" : "#1a1916",
                marginLeft: "-14px",
              }}
            >
              Clawd
            </span>
          </div>
          <p className="text-sm text-center" style={{ color: theme === "dark" ? "#6b6963" : "#9a9891" }}>
            An agentic VC that automatically invests in the top 10% of each Y Combinator batch.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://discord.gg/ekrySuRBf4" target="_blank" rel="noopener noreferrer" style={{ color: theme === "dark" ? "#6b6963" : "#9a9891" }} className="hover:opacity-80 transition-opacity"><DiscordIcon className="w-5 h-5" /></a>
            <a href="https://t.me/ycclawd" target="_blank" rel="noopener noreferrer" style={{ color: theme === "dark" ? "#6b6963" : "#9a9891" }} className="hover:opacity-80 transition-opacity"><TelegramIcon className="w-5 h-5" /></a>
            <a href="https://github.com/benstaf/ycclawd" target="_blank" rel="noopener noreferrer" style={{ color: theme === "dark" ? "#6b6963" : "#9a9891" }} className="hover:opacity-80 transition-opacity"><GithubIcon className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
