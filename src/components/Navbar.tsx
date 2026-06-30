import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Briefcase, Mail, Cpu, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Cpu },
  { label: "Portfolio", href: "#portfolio", icon: Briefcase },
  { label: "Contact", href: "#contact", icon: Mail },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      // Basic active state detection
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveItem(navItems.find(item => item.href === `#${section}`)?.label || "Home");
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[5000] transition-all duration-500 px-6 py-5 ${
        scrolled ? "bg-background/40 backdrop-blur-xl border-b border-white/5 py-3.5" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1300px] mx-auto flex items-center justify-between relative">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-serif font-bold text-2xl text-white tracking-tighter cursor-pointer"
          onClick={() => {
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
            setActiveItem("Home");
            setMobileMenuOpen(false);
          }}
        >
          M<span className="text-[#E4A390]">.</span>N
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-3">
          {navItems.map((item) => (
            <NavLink 
              key={item.label} 
              item={item} 
              active={activeItem === item.label} 
              onClick={() => setActiveItem(item.label)}
            />
          ))}
        </div>

        {/* Mobile Navigation Trigger */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden w-12 h-12 rounded-xl bg-[#E4A390]/10 border border-[#E4A390]/20 flex items-center justify-center text-[#E4A390] hover:bg-[#E4A390]/20 transition-all cursor-pointer"
          aria-label="Toggle Menu"
          whileTap={{ scale: 0.95 }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-18 left-0 right-0 p-6 rounded-2xl bg-slate-950/95 backdrop-blur-2xl border border-white/5 flex flex-col gap-2 z-50 shadow-2xl md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
                    setActiveItem(item.label);
                  }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl transition-all ${
                    activeItem === item.label
                      ? "bg-[#E4A390]/10 border border-[#E4A390]/20 text-white"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  <item.icon size={18} className={activeItem === item.label ? "text-[#E4A390]" : ""} />
                  <span className="text-xs md:text-sm font-sans tracking-widest uppercase font-medium">{item.label}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

function NavLink({ item, active, onClick }: { item: typeof navItems[0], active: boolean, onClick: () => void }) {
  return (
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
        onClick();
      }}
      className="relative px-5 py-2.5 group"
    >
      <div className="relative z-10 flex items-center gap-2.5">
        <item.icon 
          size={16} 
          className={`transition-colors duration-300 ${active ? "text-[#E4A390]" : "text-white/40 group-hover:text-white/70"}`} 
        />
        <span className={`text-xs md:text-sm font-sans tracking-widest uppercase transition-colors duration-300 ${
          active ? "text-white font-medium" : "text-white/40 group-hover:text-white/70"
        }`}>
          {item.label}
        </span>
      </div>

      {active && (
        <motion.div
          layoutId="nav-active"
          className="absolute inset-0 bg-[#E4A390]/5 border border-[#E4A390]/20 rounded-xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      
      <motion.div 
        className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      />
    </a>
  );
}
