import React, {useEffect, useState} from 'react';
import {useAddPostMutation, useGetPostsQuery} from "../store/slices/apiSlice.js";
import * as Yup from "yup";
import {useFormik} from "formik";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    FormHelperText,
    Grid2,
    TextField,
    Typography
} from "@mui/material";


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
    const {data: posts} = useGetPostsQuery();
    const post = posts?.find(post => post.id === postId);
    const [updatePost , {isLoading , isSuccess , isError}] = useAddPostMutation;

    const formik = useFormik({
        initialValues: {
            title: post?.title || '' ,
            description: post?.description || ''
        }
        validationSchema,
        onSubmit: (values) => {
            updatePost({id:postId , updatedPost: values})
        }
    })
    useEffect(() => {
        if (post){
            formik.setValues({title: post.title , description: post.description})
        }

    }, [post , formik]);

    return (

        <Container>
            <Card>
                <form onSubmit={formik.handleSubmit}>
                    <CardContent>
                        <Typography variant="h5">Edit post</Typography>
                        <Grid2 container spacing={2}>
                            <Grid2 item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                />
                                {formik.touched.title && formik.errors.title && (
                                    <FormHelperText>{formik.errors.title}</FormHelperText>
                                )}
                            </Grid2>
                            <Grid2 item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="phoneNumber"
                                    label="Phone Number"
                                    variant="outlined"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <FormHelperText>{formik.errors.description}</FormHelperText>
                                )}
                            </Grid2>
                        </Grid2>
                    </CardContent>
                    <CardActions>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                        <Button color="error" variant="contained">
                            Cancel
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Container>
    );
};

export default EditPostForm;
