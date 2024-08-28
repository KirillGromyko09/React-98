import {useGetPostsQuery} from "../store/slices/apiSlice.js";
import {Button, Stack} from "@mui/material";

const PostsList = () =>{
    const {data: posts , error , isLoading, refetch} = useGetPostsQuery;
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>

    return(
        <Stack>
            <Button variant="contained" onClick={refetch}>Refresh</Button>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </Stack>
    )

}
export default PostsList;
