import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getSession } from "next-auth/react";
import Header from "../components/header/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/feed/Feed";
import Widgets from "../components/Widgets";
import Login from "../components/Login";

export default function Home({ user }) {
  if (!user) {
    return <Login />;
  } else {
    return (
      <div>
        <Head>
          <title>Maryams facebook</title>
        </Head>
        <Header />
        <main className="flex">
          <Sidebar />
          <Feed />
          <Widgets />
        </main>
      </div>
    );
  }
}
export async function getServerSideProps(context) {
  //get the user
  const session = await getSession(context);
  const user = session.user;
  return {
    props: {
      user,
    },
  };
}
