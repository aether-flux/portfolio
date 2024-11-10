import { Montserrat } from "next/font/google";
import "./globals.css";

//const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  weights: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--var(font-mont)",
});

const siteUrl = process.env.SITE_URL || "https://amartya-dev.vercel.app";

const structuredData = {
  "@context": "http://schema.org",
  "@type": "Person",
  name: "Amartya Chowdhury",
  jobTitle: "Web Developer",
  url: siteUrl,
  sameAs: [
    "https://www.linkedin.com/in/amartya-chowdhury",
    "https://github.com/xerctia",
  ],
};

export const metadata = {
  title: "Amartya Chowdhury",
  description:
    "Portfolio website of Amartya Chowdhury, a web developer in React and Next js, and Express. See all of Amartya's skills, works, projects, experience and other professional aspects.",
  icons: {
    icon: "/faviconPort.ico",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Amartya Chowdhury's Portfolio",
    description: "Showcasing web development projects, skills, and more.",
    images: [
      {
        url: `${siteUrl}/og-img.jpg`,
        width: 1200,
        height: 630,
        alt: "My Portfolio Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amartya Chowdhury's Portfolio",
    description: "Showcasing web development projects, skills, and more.",
    image: `${siteUrl}/og-img.jpg`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </head>
      <body
        className={`${montserrat.className} bg-primary text-primary-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
