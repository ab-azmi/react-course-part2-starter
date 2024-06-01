import React from "react";
import usePost from "./hooks/usePost";

const PostList = () => {
  // const { data: posts, error, isLoading } = usePost({ page, pageSize: 10 });
  const { data, error, isLoading, fetchNextPage, isFetchingNextPage } = usePost({ pageSize: 10 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>

      <ul className="list-group">
        {data.pages.map((page, index) => (
          <React.Fragment key={index}>
            {page.map((post) => (
              <li key={post.id} className="list-group-item">{post.title}</li>
            ))}
          </React.Fragment>
        ))}
      </ul>
      <button 
        disabled={isFetchingNextPage}
        onClick={() => fetchNextPage()} className="btn btn-primary">
        {isFetchingNextPage ? "Loading..." : "Load More"}
      </button>
    </>
  );
};

export default PostList;
