import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getSession } from "next-auth/react";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Feed from "../components/feed/Feed";
import Widgets from "../components/Widgets";
import Login from "../components/Login";
import { db } from "../firebase";
export default function Home({ user, posts }) {
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
          <Feed posts={posts} />
          <Widgets />
        </main>
      </div>
    );
  }
}
export async function getServerSideProps(context) {
  //get the user
  const session = await getSession(context);
  const posts = await db.collection("posts").orderBy("timestamp", "desc").get();
  // for fast refreshing posts
  const docs = posts.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  const sess = session;
  const user = sess && sess.user;

  return {
    props: {
      user,
      posts: docs,
    },
  };
}
