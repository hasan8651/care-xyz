import About from "@/components/About";
import HeroSection from "@/components/HeroSection";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import { getDb } from "@/lib/db";

export const metadata = {
  title: "Care.xyz | Trusted Care Services at Home",
  description:
    "Find and book trusted babysitting, elderly care, এবং home care services – নিরাপদ, সহজ এবং সাশ্রয়ী।",
};

export default async function HomePage() {
  const db = await getDb();
  const rawServices = await db.collection("services").find({}).toArray();
  const services = rawServices.map((s) => ({
  ...s,
  _id: s._id.toString(),
}));

  return (
    <div className="flex flex-col gap-12">
        <section className="hero bg-base-200">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <HeroSection />
        </div>
      </section>

      {/* About */}
      <section>
        <div className="container mx-auto px-4">
          <About />
        </div>
      </section>

      {/* Services overview */}
      <section>
        <div className="container mx-auto px-4">
          <Services services={services} />
        </div>
      </section>

      {/* Stats / Testimonials */}
      <section>
        <div className="container mx-auto px-4">
          <Stats />
        </div>
      </section>
    </div>
  );
}