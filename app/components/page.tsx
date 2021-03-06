import { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
interface HeaderProps {
  isAdmin?: boolean;
  AdminBox?: () => JSX.Element;
}

const Header = ({ isAdmin, AdminBox }: HeaderProps) => (
  <header>
    <Link href="/">スタジオナビ</Link>
    {isAdmin && AdminBox ? <AdminBox /> : ""}
  </header>
);

const Footer = () => (
  <footer>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by{" "}
      <span className={styles.logo}>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </span>
    </a>
  </footer>
);

interface PageProps extends HeaderProps {
  children: ReactNode;
  title: string;
}
const Page = ({ children, title, isAdmin = false, AdminBox }: PageProps) => {
  return (
    <>
      <Head>
        <title>{title} | リハスタナビ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header isAdmin={isAdmin} AdminBox={AdminBox} />
      <div id="container">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};
export default Page;
