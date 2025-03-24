import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css"; // Make sure globals.css is correctly imported for styling
import { Outfit } from "next/font/google"




export const metadata = {
  title: "moview",
  description: "A platform that lets you review the movies you've watched!",
};


// GOOGLE FONT OUTFIT
const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ["latin"],
})

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* SET GOOGLE FONT TO EVERY PAGE */}
      <body className={`${outfit.className} antialiased`}>
        {/* Fixed gradient background */}
        <div className="fixed inset-0 z-[-1]">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,255,0.2)_10%,_rgba(0,0,0,0.9)_90%)] blur-2xl"
            style={{ backgroundAttachment: "fixed" }}
          ></div>
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        </div>

        {/* Main content */}
        <main className="relative z-10">
          <Header />
        </main>
        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
