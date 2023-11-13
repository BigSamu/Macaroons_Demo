import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head"; // Import the Head component

import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { ResourceProvider } from "../contexts/ResourceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Macaroons Demo",
  description: "A demo of macaroon tokens using First-Party Caveats built with NextJS and FastAPI", // You can update this as needed
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href={metadata.icons.icon} />

        {/* Add other SEO relevant tags here */}
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://macaroons-demo-starter.vercel.app" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.icons.icon} />
      </Head>
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
