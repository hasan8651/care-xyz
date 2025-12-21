import Link from "next/link";

export const metadata = {
  title: "Care.xyz – Baby Sitting & Elderly Care Platform",
  description:
    "Care.xyz এর মাধ্যমে শিশু, বৃদ্ধ ও অসুস্থ ব্যক্তির জন্য নির্ভরযোগ্য কেয়ার সার্ভিস বুক করুন।",
};

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <section className="hero bg-base-200 rounded-xl p-6 mt-4">
        <div className="hero-content flex-col lg:flex-row">
          <div>
            <h1 className="text-4xl font-bold">
              Caregiving এখন আরও সহজ, নিরাপদ এবং অ্যাক্সেসেবল
            </h1>
            <p className="py-4">
              শিশু, বৃদ্ধ বা অসুস্থ প্রিয়জনের জন্য Trusted Caregiver বুক করুন
              কয়েকটি ক্লিকেই।
            </p>
            <Link href="#services" className="btn btn-primary">
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section>
        <h2 className="text-2xl font-bold mb-2">About Care.xyz</h2>
        <p>
          Care.xyz হলো একটি ওয়েব প্ল্যাটফর্ম যেখানে verified caregiver দের
          মাধ্যমে আপনি Baby Sitting, Elderly Care ও Sick People Care বুক করতে
          পারবেন। আমাদের লক্ষ্য হচ্ছে caregiving কে সহজ, নিরাপদ এবং সবার
          জন্য সহজলভ্য করা।
        </p>
      </section>

      {/* Services Overview */}
      <section id="services">
        <h2 className="text-2xl font-bold mb-4">Our Services</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              id: "baby-care",
              title: "Baby Care",
              desc: "দক্ষ বেবি সিটার দ্বারা শিশুদের যত্ন।",
            },
            {
              id: "elderly-care",
              title: "Elderly Care",
              desc: "বৃদ্ধ মানুষদের জন্য নিরাপদ ও সম্মানজনক কেয়ার।",
            },
            {
              id: "sick-care",
              title: "Sick People Care",
              desc: "অসুস্থ ব্যক্তিদের জন্য বাড়িতে কেয়ার সেবা।",
            },
          ].map((s) => (
            <div key={s.id} className="card bg-base-100 shadow">
              <div className="card-body">
                <h3 className="card-title">{s.title}</h3>
                <p>{s.desc}</p>
                <div className="card-actions justify-end">
                  <Link
                    href={`/services/${s.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials / Metrics (placeholder) */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Trusted by Families</h2>
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Bookings</div>
            <div className="stat-value">1.2K+</div>
          </div>
          <div className="stat">
            <div className="stat-title">Verified Caregivers</div>
            <div className="stat-value">150+</div>
          </div>
        </div>
      </section>
    </div>
  );
}