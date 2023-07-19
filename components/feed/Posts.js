import React from "react";
import Post from "./Post";
import { db } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

function Posts({ posts }) {
  const [realTimePosts, loading, error] = useCollection(
    db.collection("posts").orderBy("timestamp", "desc")
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {realTimePosts
        ? realTimePosts.docs.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))
        : posts.map((post) => (
            <Post
              key={post.id}
              name={post.data().name}
              message={post.data().message}
              email={post.data().email}
              timestamp={post.data().timestamp}
              image={post.data().image}
              postImage={post.data().postImage}
            />
          ))}
    </div>
  );
}

export default Posts;
