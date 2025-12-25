"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function HeroSection() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="
        hero-content 
        flex-col lg:flex-row items-stretch gap-8
        rounded-2xl
       bg-linear-to-br from-primary/10 via-base-100 to-accent/10
        shadow-lg
        px-6 py-8 lg:px-10 lg:py-12
      "
    >
      {/* Left */}
      <motion.div className="flex-1 space-y-4" variants={cardVariants}>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Caregiving made{" "}
          <span className="text-primary">easier</span>,{" "}
          <span className="text-primary">safer</span> and{" "}
          <span className="text-primary">trusted</span>.
        </h1>

        <p className="text-base lg:text-lg text-base-content/80">
          Book verified babysitters, elderly caregivers and home nurses
          through Care.xyz – choose your required time and location, and get
          support at your doorstep. All caregivers are ID‑verified and
          background checked.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="#services" className="btn btn-primary normal-case">
            Explore Services
          </Link>
          <Link
            href="/about"
            className="btn btn-outline normal-case border-base-300"
          >
            Learn More
          </Link>
        </div>

        <div className="flex gap-6 pt-4 text-sm text-base-content/70">
          <div>
            <p className="font-semibold text-base-content text-lg">1,200+</p>
            <p>Successful bookings</p>
          </div>
          <div>
            <p className="font-semibold text-base-content text-lg">300+</p>
            <p>Verified caregivers</p>
          </div>
        </div>
      </motion.div>

      {/* right image */}
      <motion.div
        className="flex-1 grid grid-cols-2 gap-4 lg:gap-5"
        variants={containerVariants}
      >
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg bg-base-100"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/hero/baby-care.jpg"
            alt="Baby care at home"
            className="w-full h-40 lg:h-48 object-cover"
            width={400}
            height={300}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Baby Sitting</p>
            <p className="text-xs text-base-content/70">
              Trained babysitters to take care of your little ones at home.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg bg-base-100 lg:mt-6"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/hero/elderly-care.jpg"
            alt="Elderly care at home"
            className="w-full h-40 lg:h-48 object-cover"
            width={400}
            height={300}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Elderly Care</p>
            <p className="text-xs text-base-content/70">
              Compassionate home care for your parents and grandparents.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg bg-base-100"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/hero/family-care.jpg"
            alt="Family caregiver support"
            className="w-full h-40 lg:h-48 object-cover"
            width={400}
            height={300}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Family Care</p>
            <p className="text-xs text-base-content/70">
              Flexible caregiving solutions for your whole family.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg bg-base-100 lg:-mt-4"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/hero/nurse-care.jpg"
            alt="Special and sick care"
            className="w-full h-40 lg:h-48 object-cover"
            width={400}
            height={300}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Special / Sick Care</p>
            <p className="text-xs text-base-content/70">
              Home nursing and special care for sick or recovering patients.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}