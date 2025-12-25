import Providers from "@/components/providers";
import "./globals.css";
import AppShell from "@/components/AppShell";


export const metadata = {
  title: "Care.xyz | Babysitting & Elderly Care",
  description:
 "Care.xyz - Book trusted babysitting, elderly care and home care services easily and safely.",
icons: {    icon: "/logo.png",     },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="max-w-7xl mx-auto min-h-screen flex flex-col bg-base-100">
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}