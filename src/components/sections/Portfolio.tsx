import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionHeader } from "./About";
import { X, Maximize2, Download, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "OnlyCats Website",
    description: "A comprehensive cat rescue and adoption platform designed to connect rescuers with potential adopters. Features role-based access for Admin, Clinic, and Rescuer.",
    longDescription: "OnlyCats Website adalah platform manajemen rescue dan adopsi kucing yang terintegrasi. Website ini memfasilitasi tiga peran utama: Admin untuk manajemen sistem, Rescuer untuk pendataan kucing terlantar, dan Clinic untuk dukungan medis. Dibangun dengan fokus pada efisiensi alur kerja penyelamatan hewan.",
    tech: ["Laravel", "MySQL", "JavaScript", "Tailwind"],
    image: "/images/web-admin-role.jpg",
    gallery: [
      { url: "/images/web-admin-role.jpg", title: "Admin Dashboard" },
      { url: "/images/web-rescuer-role.jpg", title: "Rescuer Portal" },
      { url: "/images/web-clinic-role.jpg", title: "Clinic Interface" }
    ],
    color: "#E4A390",
    size: "large",
    features: ["Role-based access (Admin, Clinic, Rescuer)", "Full CRUD functionality", "Activity monitoring", "Medical history tracking"],
    challenges: "Synchronizing status updates across multiple user roles while maintaining data integrity.",
  },
  {
    title: "OnlyCats Mobile",
    description: "Mobile application for the OnlyCats ecosystem, providing a portable way to manage rescues and adoptions using Flutter and Firebase.",
    longDescription: "Aplikasi mobile yang melengkapi ekosistem OnlyCats. Dirancang untuk memberikan kemudahan bagi Rescuer di lapangan dalam mendata kucing secara real-time. Menggunakan Firebase untuk sinkronisasi data instan dan Cloudinary untuk penyimpanan foto dokumentasi yang efisien.",
    tech: ["Flutter", "Dart", "Firebase", "Cloudinary"],
    image: "/images/rescuerapb.png",
    gallery: [
      { url: "/images/adminapb.png", title: "Admin View" },
      { url: "/images/rescuerapb.png", title: "Rescuer View" }
    ],
    color: "#D49C68",
    size: "small",
    features: ["Real-time synchronization", "Media storage integration", "Firebase Authentication", "Optimized mobile UI"],
    challenges: "Optimizing image uploads and handling large media files over mobile networks.",
  },
  {
    title: "OnlyCats Java OOP",
    description: "A desktop implementation of the OnlyCats system focusing on robust Object-Oriented Programming principles and MySQL connectivity.",
    longDescription: "Implementasi desktop dari sistem OnlyCats yang menitikberatkan pada arsitektur perangkat lunak berbasis objek. Project ini mendemonstrasikan penerapan pola desain OOP dalam mengelola relasi data yang kompleks antara kucing, klinik, dan rescuer.",
    tech: ["Java", "OOP", "MySQL", "Swing"],
    image: "/images/admin-role.jpg",
    gallery: [
      { url: "/images/admin-role.jpg", title: "Dashboard Admin (Java)" },
      { url: "/images/rescuer-role.jpg", title: "Rescuer Page" },
      { url: "/images/clinic-role.jpg", title: "Clinic Page" }
    ],
    color: "#4A3F40",
    size: "large",
    features: ["Modular architecture", "Complex SQL relations", "User Authentication", "Desktop Swing UI"],
    challenges: "Mapping complex object relationships to a relational database using pure Java.",
  },
  {
    title: "IoT Monitoring System",
    description: "Hardware and software solution for monitoring workstation ergonomics, specifically monitor distance and sitting duration.",
    longDescription: "Project riset Internet of Things yang menggabungkan sensor hardware dengan pengolahan data untuk meningkatkan kesehatan kerja. Sistem ini memantau jarak pandang mata ke monitor dan durasi duduk pengguna untuk mencegah kelelahan fisik.",
    tech: ["IoT", "Hardware Integration", "C++", "Sensors"],
    image: "/images/iot-monitoring-paper.png",
    gallery: [
      { url: "/images/iot-monitoring-paper.png", title: "Research Documentation" }
    ],
    color: "#8A4F55",
    size: "small",
    features: ["Real-time distance measurement", "Ergonomic alerts", "Sitting duration tracking", "Research paper output"],
    challenges: "Ensuring sensor accuracy and low-latency feedback for real-time ergonomics monitoring.",
  },
  {
    title: "Ethical Hacking Bootcamp",
    description: "Intensive training on cybersecurity fundamentals, vulnerability assessment, and defensive strategies by JagoanSiber.",
    longDescription: "Program pelatihan intensif untuk mendalami cara berpikir seorang 'Ethical Hacker'. Mencakup pembelajaran tentang keamanan jaringan, identifikasi celah keamanan (vulnerability assessment), dan strategi pertahanan sistem digital.",
    tech: ["Cybersecurity", "Networking", "Penetration Testing"],
    image: "/images/jagoansiber-certificate.jpg",
    gallery: [
      { url: "/images/jagoansiber-certificate.jpg", title: "Completion Certificate" }
    ],
    color: "#E4A390",
    size: "small",
    features: ["Vulnerability assessment", "Network security fundamentals", "Defensive strategies", "Cybersecurity mindset"],
    challenges: "Identifying and mitigating security risks in controlled virtual environments.",
  },
];

type Project = typeof projects[0];

function ProjectCard({ project, i, onClick }: { project: Project; i: number; onClick: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer"
      onClick={onClick}
      data-testid={`card-project-${i}`}
    >
      <div className="glass-card rounded-2xl overflow-hidden hover:border-[#E4A390]/30 transition-all duration-400">
        <div className="h-60 relative overflow-hidden bg-slate-900">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background: "rgba(40,34,44,0.7)", backdropFilter: "blur(4px)" }}
          >
            <div className="flex flex-col items-center gap-1.5">
               <span className="text-white/80 font-sans text-base tracking-widest uppercase">View Details</span>
               {project.gallery.length > 1 && (
                 <span className="text-white/40 text-[10px] font-sans">+{project.gallery.length - 1} more images</span>
               )}
            </div>
          </div>
          <div className="absolute bottom-4 left-4 flex gap-2 flex-wrap">
            {project.tech.map((t) => (
              <span key={t} className="px-2.5 py-0.5 text-[10px] font-sans tracking-wider text-white/60 rounded-full" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-7">
          <h3 className="text-white font-serif font-semibold text-lg md:text-xl leading-tight mb-2">{project.title}</h3>
          <p className="text-white/50 text-xs md:text-sm font-sans leading-relaxed line-clamp-3">{project.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight") {
        setActiveImage((prev) => (prev + 1) % project.gallery.length);
      } else if (e.key === "ArrowLeft") {
        setActiveImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, project.gallery.length, onClose]);

  // Robust Native Image Downloader
  const handleDownload = async (imgUrl: string, imgTitle: string) => {
    const extension = imgUrl.split('.').pop() || "jpg";
    const cleanedProjTitle = project.title.replace(/\s+/g, "_");
    const cleanedImgTitle = imgTitle.replace(/\s+/g, "_");
    const filename = `${cleanedProjTitle}_${cleanedImgTitle}.${extension}`;

    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Failed to download image via blob, using direct window open fallback", error);
      const link = document.createElement("a");
      link.href = imgUrl;
      link.target = "_blank";
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[5000] flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0" style={{ background: "rgba(40,34,44,0.85)", backdropFilter: "blur(16px)" }} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-5xl glass-card rounded-3xl overflow-y-auto md:overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-3d"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-project"
      >
        <button
          data-testid="button-close-modal"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image Gallery */}
        <div className="w-full md:w-3/5 bg-slate-950 flex flex-col relative border-r border-white/5 select-none">
          <div 
            onClick={() => setIsFullscreen(true)}
            className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[500px] cursor-zoom-in group/img"
          >
            {/* Click to expand overlay effect */}
            <div className="absolute inset-0 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 bg-black/40 flex items-center justify-center z-10">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-sans tracking-wide">
                <Maximize2 size={14} />
                Click to Expand
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={project.gallery[activeImage].url}
                alt={project.gallery[activeImage].title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full h-full object-contain"
              />
            </AnimatePresence>
            
            {/* Gallery Label Overlay */}
            <div className="absolute bottom-6 left-8 right-8 z-10">
               <p className="text-white/40 text-xs md:text-sm uppercase tracking-widest font-sans bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full w-fit">
                 {project.gallery[activeImage].title}
               </p>
            </div>
          </div>
          
          {/* Thumbnails */}
          {project.gallery.length > 1 && (
            <div className="h-24 border-t border-white/5 flex gap-2.5 p-3.5 overflow-x-auto scrollbar-hide">
              {project.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`h-full aspect-video rounded-lg overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === idx ? "border-[#E4A390]" : "border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Info */}
        <div className="w-full md:w-2/5 p-8 md:p-10 md:overflow-y-auto custom-scrollbar">
          <p className="text-[#E4A390] text-xs md:text-sm tracking-[0.3em] uppercase font-sans mb-2.5">Project Detail</p>
          <h2 className="text-white font-serif font-bold text-3xl md:text-4xl mb-5 leading-tight">{project.title}</h2>
          
          <div className="flex gap-2.5 flex-wrap mb-7">
            {project.tech.map((t) => (
              <span key={t} className="px-3.5 py-1 text-xs font-sans font-medium text-white/50 rounded-full border border-white/10">
                {t}
              </span>
            ))}
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-white/80 font-sans text-sm md:text-base leading-relaxed mb-5">
                {project.longDescription}
              </p>
            </div>

            <div>
              <p className="text-[#E4A390] text-xs md:text-sm tracking-[0.2em] uppercase font-sans mb-4">Key Features</p>
              <ul className="space-y-3">
                {project.features.map((f) => (
                  <li key={f} className="text-white/60 text-xs md:text-sm font-sans flex items-start gap-3">
                    <span className="mt-2 w-2 h-2 rounded-full bg-[#D49C68] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* View Fullscreen & Download Controls */}
            <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-white/95 border border-[#E4A390]/30 hover:border-[#E4A390]/60 hover:bg-[#E4A390]/15 hover:shadow-md hover:shadow-[#E4A390]/5 transition-all text-xs font-sans font-semibold bg-[#E4A390]/10 cursor-pointer"
              >
                <Maximize2 size={15} />
                View Fullscreen
              </button>
              <button
                onClick={() => handleDownload(project.gallery[activeImage].url, project.gallery[activeImage].title)}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[#28222C] hover:opacity-90 hover:shadow-lg hover:shadow-[#D49C68]/20 transition-all text-xs font-sans font-semibold cursor-pointer"
                style={{ background: "linear-gradient(135deg, #D49C68, #E4A390)" }}
              >
                <Download size={15} />
                Download Image
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Lightbox Fullscreen Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[6000] flex flex-col bg-black/95 backdrop-blur-xl"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Top Toolbar */}
            <div className="h-20 px-8 flex items-center justify-between z-50 pointer-events-none">
              <div className="text-white/60 font-sans text-sm md:text-base pointer-events-auto">
                <span className="font-semibold text-white">{project.gallery[activeImage].title}</span>
                <span className="mx-2 text-white/30">•</span>
                <span>{activeImage + 1} / {project.gallery.length}</span>
              </div>
              <div className="flex gap-4 pointer-events-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(project.gallery[activeImage].url, project.gallery[activeImage].title);
                  }}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  title="Download Image"
                >
                  <Download size={18} />
                </button>
                <button
                  onClick={() => setIsFullscreen(false)}
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white/70 hover:text-white bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  title="Close Fullscreen"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Central Content */}
            <div className="flex-1 relative flex items-center justify-center px-4 md:px-20 select-none">
              {/* Left Navigation Arrow */}
              {project.gallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
                  }}
                  className="absolute left-6 md:left-10 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                >
                  <ChevronLeft size={24} />
                </button>
              )}

              {/* High-res Image Wrapper */}
              <motion.div
                key={activeImage}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-full max-h-[80vh] flex items-center justify-center pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={project.gallery[activeImage].url}
                  alt={project.gallery[activeImage].title}
                  className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
                />
              </motion.div>

              {/* Right Navigation Arrow */}
              {project.gallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage((prev) => (prev + 1) % project.gallery.length);
                  }}
                  className="absolute right-6 md:right-10 z-50 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                >
                  <ChevronRight size={24} />
                </button>
              )}
            </div>

            {/* Bottom Caption Info */}
            <div className="h-20 flex items-center justify-center px-8 z-50 text-center">
              <p className="text-white/40 text-xs md:text-sm font-sans">
                {project.title} — Use Arrow keys or click arrows to navigate
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState<Project | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-28 px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader label="Work" title={<>Selected<br /><span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}>Projects</span></>} />
      </motion.div>

      <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} i={i} onClick={() => setSelected(p)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
