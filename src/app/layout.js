import "./globals.css";
import SiteLayout from "@/components/SiteLayout";

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
        <SiteLayout>{children}</SiteLayout>
      </body>
    </html>
  );
}