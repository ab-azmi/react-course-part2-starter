import axios from "axios";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

interface PostQuery {
    pageSize: number;
}

interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
  }

const usePost = ({pageSize}: PostQuery) => {
    const queryKeys = ["posts", {pageSize}];

    const fetchPost = ({pageParam = 1}) =>
        axios
        .get<Post[]>("https://jsonplaceholder.typicode.com/posts", {
            params: {
                _start: (pageParam - 1) * pageSize,
                _limit: pageSize,
            },
        
        })
        .then((res) => res.data);
    
    return useInfiniteQuery<Post[], Error>({
        //users/1/posts
        queryKey: queryKeys,
        queryFn: fetchPost,
        staleTime: 10 * 1000,
        keepPreviousData: true,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
        }
    });
}

export default usePost;