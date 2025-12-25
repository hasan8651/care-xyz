// src/app/contact/page.jsx

export const metadata = {
  title: "Contact Us | Care.xyz",
  description:
    "Get in touch with Care.xyz for booking help, caregiver support, partnership or general questions.",
};

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* Page header */}
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
        <p className="text-base text-base-content/70 max-w-2xl">
          Have questions about bookings, caregivers, or using Care.xyz?
          Reach out to us anytime. Our support team is here to help you
          arrange safe and trusted care at home.
        </p>
      </div>

      {/* Main layout: info + form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: contact details */}
        <section className="space-y-6">
          <div className="card bg-base-100 shadow-md">
            <div className="card-body space-y-4">
              <h2 className="card-title text-xl">Support &amp; Contact</h2>

              <div>
                <p className="font-semibold">Customer Support</p>
                <p className="text-sm text-base-content/70">
                  For help with bookings, payments or caregiver issues.
                </p>
                <p className="mt-1 text-sm">
                  Phone:{" "}
                  <a href="tel:+8801700000000" className="link">
                    +880 1700‑000000
                  </a>
                  <br />
                  Email:{" "}
                  <a
                    href="mailto:support@care.xyz"
                    className="link"
                  >
                    support@care.xyz
                  </a>
                </p>
              </div>

              <div>
                <p className="font-semibold">Office Address</p>
                <p className="text-sm text-base-content/70">
                  Care.xyz HQ<br />
                  12/A, Example Road, Dhaka<br />
                  Bangladesh
                </p>
              </div>

              <div>
                <p className="font-semibold">Support Hours</p>
                <p className="text-sm text-base-content/70">
                  Saturday – Thursday: 9:00 AM – 9:00 PM<br />
                  Friday &amp; Public Holidays: Limited online support only
                </p>
              </div>

              <div className="alert alert-info text-sm">
                <span>
                  For emergency medical situations, please contact your
                  local hospital or emergency number directly. Care.xyz is
                  not an emergency service.
                </span>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-md">
            <div className="card-body space-y-3">
              <h3 className="font-semibold text-base">
                For caregivers &amp; partners
              </h3>
              <p className="text-sm text-base-content/70">
                If you are a professional caregiver and want to join Care.xyz,
                or if you are a clinic / organization interested in
                partnership, please contact us at:
              </p>
              <p className="text-sm">
                Email:{" "}
                <a
                  href="mailto:partners@care.xyz"
                  className="link"
                >
                  partners@care.xyz
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Right: contact form */}
        <section>
          <div className="card bg-base-100 shadow-md">
            <div className="card-body space-y-4">
              <h2 className="card-title text-xl">Send us a message</h2>
              <p className="text-sm text-base-content/70">
                Fill out the form below and we&apos;ll get back to you within
                24 hours (usually much sooner during support hours).
              </p>

              {/* TODO: hook this to an API (zapshift) */}
              <form className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      className="input input-bordered w-full"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Phone (optional)</span>
                  </label>
                  <input
                    type="tel"
                    className="input input-bordered w-full"
                    placeholder="+8801XXXXXXXXX"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Subject</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full min-h-30"
                    placeholder="Please share details about your question or issue..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  Send Message
                </button>

                <p className="text-xs text-base-content/60 text-center">
                  By submitting this form you agree that we may contact you
                  regarding your request using the details provided.
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>

         <section className="space-y-2">
        <h2 className="text-xl font-semibold">Before you contact us</h2>
        <ul className="list-disc list-inside text-sm text-base-content/70 space-y-1">
          <li>
            For booking changes or cancellations, please include your booking
            ID in the message so we can help you faster.
          </li>
          <li>
            If you faced an issue with a specific caregiver, share the date,
            time and short description of what happened.
          </li>
          <li>
            For partnership or bulk corporate caregiving requests, mention
            your organization name and approximate care requirements.
          </li>
        </ul>
      </section>
    </div>
  );
}