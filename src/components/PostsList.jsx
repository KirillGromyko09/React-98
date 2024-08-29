import {useGetPostsQuery} from "../store/slices/apiSlice.js";
import {Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";

const PostsList = () =>{
    const {data: posts , error , isLoading, refetch} = useGetPostsQuery();
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    return (
        <Stack>
            <Button variant="contained" onClick={refetch}>Refresh</Button>
            <ul>
                {posts && posts.length > 0 ? ( // Додана перевірка на наявність даних
                    posts.map(post => (
                        <li key={post.id}>
                            <Link to={`/edit/${post.id}`}>{post.title}</Link>
                        </li>
                    ))
                ) : (
                    <li>No posts available</li>
                )}
            </ul>
        </Stack>
    );

}
export default PostsList;
