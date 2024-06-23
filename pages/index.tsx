import Head from "next/head";
import Header from "@/components/header";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { GetServerSidePropsContext } from "next";
import Login from "@/components/login";
import Sidebar from "@/components/sidebar";
import Feed from "@/components/feed";
import Widgets from "@/components/widgets";
import { db } from "@/firebase";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";

export type PostType = {
  id: string;
  name: string;
  message: string;
  email: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  } | null;
  image: string;
  postImage: string;
};

type PostsSessionType = {
  session: Session | null;
  posts: PostType[];
};

export default function Home({ session, posts }: PostsSessionType) {
  if (!session) return <Login />;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Facebook Clone</title>
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  const firestore = getFirestore();
  const postsQuery = query(
    collection(firestore, "posts"),
    orderBy("timestamp", "desc")
  );
  const postsSnapshot = await getDocs(postsQuery);

  const docs = postsSnapshot.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: docs,
    },
  };
}
