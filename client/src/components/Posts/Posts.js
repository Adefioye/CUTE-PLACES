import React from "react";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  return (
    <>
      <h1>Posts</h1>
      {console.log(posts)}
      <Post />
      <Post />
    </>
  );
};

export default Posts;
