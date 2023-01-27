import {
  Box,
  CircularProgress,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from "../FileUpload/FileUpload";
import { LoadingButton } from "@mui/lab";
import { FC, useEffect } from "react";
import { pickBy } from "lodash";
import { toast } from "react-toastify";
import { useUpdatePostMutation } from "../../redux/api/postApi";
import { IPostResponse } from "../../redux/api/types";

interface IUpdatePostProp {
  setOpenPostModal: (openPostModal: boolean) => void;
  post: IPostResponse;
}

const updatePostSchema = object({
  title: string(),
  content: string(),
  category: string().max(50),
  image: z.instanceof(File),
}).partial();

type IUpdatePost = TypeOf<typeof updatePostSchema>;

const UpdatePost: FC<IUpdatePostProp> = ({ setOpenPostModal, post }) => {
  const [updatePost, { isLoading, isError, error, isSuccess }] =
    useUpdatePostMutation();

  const methods = useForm<IUpdatePost>({
    resolver: zodResolver(updatePostSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Post updated successfully");
      setOpenPostModal(false);
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: "top-right",
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: "top-right",
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    if (methods.formState.isSubmitting) {
      methods.reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods.formState.isSubmitting]);

  useEffect(() => {
    if (post) {
      methods.reset({
        title: post.title,
        category: post.category,
        content: post.content,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const onSubmitHandler: SubmitHandler<IUpdatePost> = (values) => {
    const formData = new FormData();
    const filteredFormData = pickBy(
      values,
      (value) => value !== "" && value !== undefined
    );
    const { image, ...otherFormData } = filteredFormData;
    if (image) {
      formData.append("image", image);
    }
    formData.append("data", JSON.stringify(otherFormData));
    updatePost({ id: post?.id!, post: formData });
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1">
          Edit Post
        </Typography>
        {isLoading && <CircularProgress size="1rem" color="primary" />}
      </Box>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <TextField
            label="Title"
            fullWidth
            sx={{ mb: "1rem" }}
            focused
            {...methods.register("title")}
          />
          <TextField
            label="Category"
            fullWidth
            focused
            sx={{ mb: "1rem" }}
            {...methods.register("category")}
          />
          <Controller
            name="content"
            control={methods.control}
            defaultValue=""
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder="Post Details"
                minRows={8}
                style={{
                  width: "100%",
                  border: "1px solid #c8d0d4",
                  fontFamily: "Roboto, sans-serif",
                  marginBottom: "1rem",
                  outline: "none",
                  fontSize: "1rem",
                  padding: "1rem",
                }}
              />
            )}
          />
          <FileUpload limit={1} name="image" multiple={false} />
          <LoadingButton
            variant="contained"
            fullWidth
            sx={{ py: "0.8rem", mt: 4, backgroundColor: "#2363eb" }}
            type="submit"
            loading={isLoading}
          >
            Edit Post
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default UpdatePost;
