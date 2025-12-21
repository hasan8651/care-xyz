import nodemailer from "nodemailer";

export async function sendBookingInvoice({ to, booking }) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || "587", 10),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
    <h1>Care.xyz Booking Invoice</h1>
    <p>Thank you for your booking.</p>
    <p><strong>Service:</strong> ${booking.serviceName}</p>
    <p><strong>Duration:</strong> ${booking.duration} ${booking.unit}</p>
    <p><strong>Location:</strong> ${booking.location.division}, ${booking.location.district}, ${booking.location.city}, ${booking.location.area}</p>
    <p><strong>Address:</strong> ${booking.location.address}</p>
    <p><strong>Total Cost:</strong> ${booking.totalCost} ৳</p>
    <p>Status: ${booking.status}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "Care.xyz Booking Invoice",
    html,
  });
}