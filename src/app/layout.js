
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: {
    default: "Skik International | Your Global Education Journey",
    template: "%s | Skik International",
  },
  description:
    "Explore international education opportunities, visa guidance, IELTS and PTE coaching with Skik International in Surat, Gujarat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* FLOATING WHATSAPP */}
        <a
          href="https://wa.me/918000576969"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Skik International on WhatsApp"
          className="fixed bottom-7 right-7 z-40 flex items-center justify-center rounded-full  shadow-lg transition hover:scale-105 animate-bounce"
        >
          <img
            src="/whatsapp.png"
            alt="WhatsApp Icon"
            className="h-13 w-13 "
          />
        </a>

      </body>
    </html>
  );
}
