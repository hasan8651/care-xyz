import nodemailer from "nodemailer";

export async function sendBookingEmail({ to, booking }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <h2>Your Booking is Confirmed</h2>
    <p>Service: <strong>${booking.serviceName}</strong></p>
    <p>Duration: ${booking.durationValue} ${booking.durationUnit}</p>
    <p>Location: ${booking.location.address}, ${booking.location.area}, 
      ${booking.location.city}, ${booking.location.district}, ${booking.location.division}
    </p>
    <p>Total Paid: ৳${booking.totalCost}</p>
    <p>Status: ${booking.status}</p>
    <p>Thank you for using Care.xyz</p>
  `;

  await transporter.sendMail({
    from: `"Care.xyz" <${process.env.EMAIL_FROM}>`,
    to,
    subject: `Booking Confirmed - ${booking.serviceName}`,
    html,
  });
}