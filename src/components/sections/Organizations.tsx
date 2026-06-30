import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeader } from "./About";
import { NetworkNodes } from "@/components/FloatingGeometry";

const orgs = [
  {
    name: "Telkom University Choir",
    role: "Head of Events - Recruitment",
    period: "Sep 2024 — Oct 2024",
    desc: "Designed event workflows, managed core concepts, and coordinated across multiple divisions to ensure a seamless recruitment experience.",
  },
  {
    name: "Telkom University Choir Academy",
    role: "Head of Events",
    period: "Oct 2024 — Nov 2024",
    desc: "Spearheaded planning and management for the Academy series, focusing on training workflow and cross-member coordination.",
  },
  {
    name: "Telkom University Choir Aestimatio",
    role: "Head of Events",
    period: "Sep 2024",
    desc: "Managed event logistics and conceptual development, ensuring all organizational needs were met within a tight schedule.",
  },
  {
    name: "TUC External Concert",
    role: "Event Division Member",
    period: "Mar 2024 — Jul 2024",
    desc: "Contributed to the preparation and execution of large-scale external concerts, supporting logistics and on-site coordination.",
  },
];

export default function Organizations() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section id="organizations" className="relative py-28 px-8 md:px-16 max-w-6xl mx-auto overflow-hidden">
      {/* Animated network nodes decoration — positioned in the section corners */}
      <div className="absolute top-8 right-4 opacity-40 pointer-events-none">
        <NetworkNodes />
      </div>
      <div
        className="absolute bottom-8 left-4 opacity-25 pointer-events-none"
        style={{ transform: "rotate(180deg) scaleX(-1)" }}
      >
        <NetworkNodes />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <SectionHeader
          label="Community"
          title={
            <>
              Organizations &amp;
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: "linear-gradient(135deg, #E4A390, #D49C68)" }}
              >
                Involvement
              </span>
            </>
          }
        />
      </motion.div>

      <div ref={ref} className="relative">
        {/* Animated timeline line */}
        <motion.div
          className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 w-[1px] origin-top"
          style={{
            background: "linear-gradient(to bottom, #E4A390, #8A4F55, transparent)",
            height: "100%",
          }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="space-y-14">
          {orgs.map((org, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={org.name} className="relative flex flex-col md:flex-row md:items-center">
                {/* Timeline dot with pulse animation */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-3 h-3 rounded-full border-2 border-[#E4A390] bg-[#28222C]"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border border-[#E4A390]/30"
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-full md:w-[calc(50%-1.5rem)] pl-10 md:pl-0 ${
                    isLeft ? "md:mr-auto md:pr-6 md:text-right" : "md:ml-auto md:pl-6"
                  }`}
                  data-testid={`card-org-${i}`}
                >
                  <div className="glass-card rounded-2xl p-7 group hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3 text-left">
                      <div>
                        <h3 className="text-white font-serif font-semibold text-lg md:text-xl leading-tight">
                          {org.name}
                        </h3>
                        <p className="text-[#D49C68] text-sm md:text-base mt-1.5 font-sans">{org.role}</p>
                      </div>
                      <span className="text-[#E4A390]/40 text-xs md:text-sm font-sans whitespace-nowrap mt-1 shrink-0">
                        {org.period}
                      </span>
                    </div>
                    <p className="text-white/50 text-xs md:text-sm font-sans leading-relaxed text-left mt-2.5">{org.desc}</p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
