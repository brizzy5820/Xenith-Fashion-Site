import type { Metadata } from "next";
import "./global.css";
export const metadata: Metadata = {
  title: "ELM",
  description: "Education Lifecycle Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}