import React, {useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    Container,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    TextField,
} from "@mui/material";
import {useAddPostMutation} from "../store/slices/apiSlice.js";

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

const AddPostFrom = () => {
    const [title ,setTitle] = useState('');
    const [description ,setDescription] = useState('');
    const [addPost , {isLoading , isSuccess , isError}] = useAddPostMutation;


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
        },
        validationSchema,
        onSubmit: (e) => {
           e.preventDefault()
            addPost({title, description})
            setTitle('')
            setDescription('')
        },
    });
    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <InputLabel margin="normal" htmlFor="name">
                        Name
                    </InputLabel>
                    <Input
                        id="title"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.touched.title && formik.errors.title && (
                        <FormHelperText>{formik.errors.title}</FormHelperText>
                    )}
                    <TextField
                        label="Description"
                        margin="normal"
                        id="description"
                        type="text"
                        multiline
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <FormHelperText>{formik.errors.description}</FormHelperText>
                    )}
                </FormControl>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={({ marginTop: "10px" }, { display: "block" })}
                >
                    Submit
                </Button>
                {isSuccess && <div>Post added successfully!</div>}
                {isError && <div>Something went wrong.</div>}
            </form>
        </Container>
    );
};

export default AddPostFrom;
