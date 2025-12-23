import Providers from "@/components/providers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Care.xyz | Babysitting & Elderly Care",
  description:
    "Care.xyz – বুক করুন trusted babysitting, elderly care এবং home care services সহজে এবং নিরাপদে।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className="min-h-screen max-w-7xl mx-auto flex flex-col bg-base-100">
        <Providers>
          <Navbar />

          <main className="flex-1">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
