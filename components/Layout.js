import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Seo from "./Seo";
import Navbar from "./Navbar";
const name = "Stanley Yin";
export const siteTitle = "Next.js Sample Website";

export default function Layout({ children, home }) {
  return (
    <div>
      <Seo />
      <Navbar />
      <main className="py-16 wrapper">{children}</main>
      {!home && (
        <div className="wrapper py-10">
          <Link href="/">← Back</Link>
        </div>
      )}
    </div>
  );
}
