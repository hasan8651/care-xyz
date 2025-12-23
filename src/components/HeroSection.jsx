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
      className="hero-content flex-col lg:flex-row items-stretch gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Left text */}
      <motion.div className="flex-1 space-y-4" variants={cardVariants}>
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
          Caregiving এখন আরও সহজ, <span className="text-primary">নিরাপদ</span>{" "}
          এবং <span className="text-primary">trusted</span>
        </h1>

        <p className="text-base lg:text-lg text-base-content/80">
          Care.xyz থেকে বুক করুন শিশু, বৃদ্ধ বা অসুস্থ ব্যক্তির জন্য নির্ভরযোগ্য
          caregiver – আপনার প্রয়োজন অনুযায়ী সময় ও লোকেশন সিলেক্ট করে। সব
          caregiver NID-verified এবং background checked।
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href="#services" className="btn btn-primary">
            Explore Services
          </Link>
          <Link href="/about" className="btn btn-ghost">
            Learn More
          </Link>
        </div>

        <div className="flex gap-6 pt-4 text-sm text-base-content/70">
          <div>
            <p className="font-semibold text-base-content">1,200+</p>
            <p>Successful bookings</p>
          </div>
          <div>
            <p className="font-semibold text-base-content">300+</p>
            <p>Verified caregivers</p>
          </div>
        </div>
      </motion.div>

      {/* Right image */}
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
            alt="Baby Care"
            className="w-full h-40 lg:h-48 object-cover"
            width={100}
            height={100}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Baby Sitting</p>
            <p className="text-xs text-base-content/70">
              অভিজ্ঞ babysitter আপনার শিশুর নিরাপদ যত্নে।
            </p>
          </div>
        </motion.div>

        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg bg-base-100 lg:mt-6"
          variants={cardVariants}
          whileHover={{ scale: 1.03 }}
        >
          <Image
            src="/hero/family-care.jpg"
            alt="Elderly Care"
            className="w-full h-40 lg:h-48 object-cover"
            width={100}
            height={100}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Elderly Care</p>
            <p className="text-xs text-base-content/70">
              বৃদ্ধ মা–বাবার জন্য সহানুভূতিশীল হোম কেয়ার।
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
            alt="Family Support"
            className="w-full h-40 lg:h-48 object-cover"
            width={100}
            height={100}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Family Care</p>
            <p className="text-xs text-base-content/70">
              পুরো পরিবারের জন্য flexible caregiving সল্যুশন।
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
            alt="Special Care"
            className="w-full h-40 lg:h-48 object-cover"
            width={100}
            height={100}
            unoptimized
          />
          <div className="p-3 text-sm">
            <p className="font-semibold">Special / Sick Care</p>
            <p className="text-xs text-base-content/70">
              অসুস্থ রোগীর জন্য trained caregiver at home।
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
