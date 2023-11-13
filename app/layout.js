import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { ResourceProvider } from "../contexts/ResourceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Macaroons Demo",
  description:
    "A demo of macaroons, tokens with contextual caveats for decentralized authorization and delegation. Application introduce the use of first-party caveats built with NextJS and FastAPI frameworks", // You can update this as needed
  icons: {
    icon: "/assets/favicon.ico",
  },
  image: "/assets/macaroon_logo.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      <link rel="icon" href={metadata.icons.icon} />

      {/* Add other SEO relevant tags here */}
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://macaroons-demo-starter.vercel.app"
      />
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.image} />

      <body className={inter.className}>
        <AuthProvider>
          <ResourceProvider>
            <Layout>{children}</Layout>
          </ResourceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
