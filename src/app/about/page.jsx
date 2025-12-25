export default function About() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold mb-3">About Care.xyz</h2>

      <p className="text-base text-base-content/80">
        Care.xyz is a digital platform designed to make in‑home caregiving
        simple, safe and accessible for every family. Whether you need a
        trusted babysitter, daily support for elderly parents, or a trained
        caregiver for someone who is sick or recovering, Care.xyz connects you
        with verified professionals you can rely on.
      </p>

      <p className="text-base text-base-content/80">
        We understand that inviting someone into your home to look after your
        loved ones is a big decision. That’s why every caregiver on Care.xyz
        goes through ID verification and background checks, and is reviewed by
        real families who have booked them before. Our platform is built to
        give you both <span className="font-semibold">control</span> and{" "}
        <span className="font-semibold">peace of mind</span>.
      </p>

      <div className="grid md:grid-cols-3 gap-4 pt-2">
        <div>
          <h3 className="font-semibold mb-1">What we offer</h3>
          <ul className="list-disc list-inside text-sm text-base-content/80 space-y-1">
            <li>Baby sitting and child care at home</li>
            <li>Elderly care and companionship</li>
            <li>Support for sick or recovering patients</li>
            <li>Flexible hourly or daily bookings</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">How it works</h3>
          <ul className="list-disc list-inside text-sm text-base-content/80 space-y-1">
            <li>Browse services and see transparent rates</li>
            <li>Select your required duration and location</li>
            <li>Confirm and pay securely online with Stripe</li>
            <li>Track booking status from your dashboard</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-1">Our promise</h3>
          <ul className="list-disc list-inside text-sm text-base-content/80 space-y-1">
            <li>Verified caregivers with proper ID and checks</li>
            <li>Clear communication between families and caregivers</li>
            <li>Secure payments and simple cancellation policies</li>
            <li>Continuous improvement based on your feedback</li>
          </ul>
        </div>
      </div>

      <p className="text-base text-base-content/80 pt-2">
        Caregiving should not be stressful or confusing. Our goal is to give
        you a simple, technology‑driven way to arrange trusted care, so you can
        focus on what matters most – spending meaningful time with the people
        you love.
      </p>
    </section>
  );
}