import usePost from "./hooks/usePost";
import { useState } from "react";

const PostList = () => {
  const [userId, setUserId] = useState<number>();
  const { data: posts, error, isLoading } = usePost(userId);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <select onChange={(event) => setUserId(parseInt(event?.target.value))} className="form-select mb-3">
        <option value=""> </option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.body}
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostList;
