import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";

import Layout from "../components/Layout";
import { AuthProvider } from "../contexts/AuthContext";
import { ResourceProvider } from "../contexts/ResourceContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Macaroons Demo",
  description: "A Next.js + FastApi demo application for macaroon tokens", // You can update this as needed
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
