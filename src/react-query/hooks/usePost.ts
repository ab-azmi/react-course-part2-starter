import axios from "axios";
import { useQuery } from '@tanstack/react-query';

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

const usePost = (userId: number|undefined) => {
    const queryKeys = userId ? ["users", userId, "posts"] : ["posts"];
    
    const fetchPost = () =>
        axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
            params: {
                userId
            }
        })
        .then((res) => res.data);
    
    return useQuery<Post[], Error>({
        //users/1/posts
        queryKey: queryKeys,
        queryFn: fetchPost,
        staleTime: 10 * 1000
    });
}

export default usePost;