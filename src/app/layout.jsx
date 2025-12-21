import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import Providers from "./providers";


export const metadata = {
  title: "Care.xyz – Reliable Care Service Platform",
  description:
    "Care.xyz এর মাধ্যমে আপনি বেবি কেয়ার, এল্ডারলি কেয়ার এবং অসুস্থ মানুষের জন্য নির্ভরযোগ্য সার্ভিস বুক করতে পারেন।",
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}