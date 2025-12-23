"use client";

import { motion } from "framer-motion";

const statsData = [
  { title: "Total Bookings", value: "1,200+", desc: "Last 12 months" },
  {
    title: "Verified Caregivers",
    value: "300+",
    desc: "NID & background checked",
  },
  { title: "Avg. Rating", value: "4.8", desc: "Based on user feedback" },
  { title: "Cities Covered", value: "25+", desc: "Across Bangladesh" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Stats() {
  return (
    <section className="w-full py-16 bg-base-200/60">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <p className="text-xs md:text-sm uppercase tracking-wide text-primary font-semibold">
            Why families trust Care.xyz
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">
            Numbers that show our care impact
          </h2>
        </motion.div>

        <div className="stats stats-vertical md:stats-horizontal shadow-lg bg-base-100 rounded-3xl w-full p-6 md:p-8">
          {statsData.map((stat) => (
            <motion.div
              key={stat.title}
              className="stat text-center"
              variants={itemVariants}
              whileHover={{ scale: 1.04, translateY: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <div className="stat-title text-sm md:text-base">
                {stat.title}
              </div>
              <div className="stat-value text-primary text-3xl md:text-4xl font-extrabold">
                {stat.value}
              </div>
              <div className="stat-desc text-xs md:text-sm opacity-70 mt-1">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
