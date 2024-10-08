import React, {useEffect} from 'react';
import { useGetPostsQuery, useUpdatePostMutation} from "../store/api/postsApi/index.js";
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    FormHelperText,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";


const validationSchema = Yup.object({
    title: Yup.string()
        .min(2, "Must be at least 2 characters")
        .max(15, "Must be 15 characters of less")
        .required("Title is required"),
    description: Yup.string()
        .min(8, "Must be at least 8 characters")
        .max(15, "Must be 15 characters or less")
        .required("Description is required"),
});

const EditPostForm = ({postId}) => {
    const {data: posts, isLoading, isError, isFetching} = useGetPostsQuery();
    const post = posts?.find(post => post.id === postId);
    const [updatePost, {isLoading: isUpdating}] = useUpdatePostMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isFetching && !post && !isError) {
            navigate('/');
        }
    }, [isLoading, isFetching, post, isError, navigate]);


    const formik = useFormik({
        initialValues: {
            title: post?.title || '' ,
            description: post?.description || ''
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values) => {
            await updatePost({id: postId, ...values});
            navigate('/');
        }
    })


    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }
    if (isError) {
        return <div>Error loading post data.</div>;
    }
    return (

        <Container>
            <Card>
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <Typography variant="h5">Edit post</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="title"
                                    label="Title"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <FormHelperText>{formik.errors.title}</FormHelperText>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <FormHelperText>{formik.errors.description}</FormHelperText>
                                )}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                            Save
                        </Button>
                        <Button color="error" variant="contained"  onClick={() => navigate('/')}>
                            Cancel
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Container>
    );
};

export default EditPostForm;
