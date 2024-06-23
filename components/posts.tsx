import { db } from "@/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import Post from "./post";

type Props = {
  posts: any;
};

const Posts = ({ posts }: Props) => {
  const postsCollectionRef = collection(db, "posts");
  const postsQuery = query(postsCollectionRef, orderBy("timestamp", "desc"));
  const [realtimePosts] = useCollection(postsQuery);

  return (
    <div>
      {realtimePosts
        ? realtimePosts?.docs.map((post) => {
            return (
              <Post
                key={post.id}
                name={post.data().name}
                message={post.data().message}
                email={post.data().email}
                timestamp={post.data().timestamp}
                image={post.data().image}
                postImage={post.data().postImage}
              />
            );
          })
        : posts.map((post) => {
            <Post
              key={post.id}
              name={post.name}
              message={post.message}
              email={post.email}
              timestamp={post.timestamp}
              image={post.image}
              postImage={post.postImage}
            />;
          })}
    </div>
  );
};

export default Posts;
