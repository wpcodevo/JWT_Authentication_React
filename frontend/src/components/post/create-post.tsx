import {
  Box,
  CircularProgress,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { object, string, TypeOf, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from '../FileUpload/FileUpload';
import { LoadingButton } from '@mui/lab';
import { FC, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useCreatePostMutation } from '../../redux/api/postApi';

interface ICreatePostProp {
  setOpenPostModal: (openPostModal: boolean) => void;
}

const createPostSchema = object({
  title: string().min(1, 'Title is required'),
  content: string().min(1, 'Content is required'),
  category: string().max(20).min(1, 'Category is required'),
  image: z.instanceof(File),
});

export type ICreatePost = TypeOf<typeof createPostSchema>;

const CreatePost: FC<ICreatePostProp> = ({ setOpenPostModal }) => {
  const [createPost, { isLoading, isError, error, isSuccess }] =
    useCreatePostMutation();

  const methods = useForm<ICreatePost>({
    resolver: zodResolver(createPostSchema),
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success('Post created successfully');
      setOpenPostModal(false);
    }

    if (isError) {
      if (Array.isArray((error as any).data.error)) {
        (error as any).data.error.forEach((el: any) =>
          toast.error(el.message, {
            position: 'top-right',
          })
        );
      } else {
        toast.error((error as any).data.message, {
          position: 'top-right',
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

  const onSubmitHandler: SubmitHandler<ICreatePost> = (values) => {
    const formData = new FormData();

    formData.append('image', values.image);
    formData.append('data', JSON.stringify(values));
    createPost(formData);
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 3 }}>
        <Typography variant='h5' component='h1'>
          Create Post
        </Typography>
        {isLoading && <CircularProgress size='1rem' color='primary' />}
      </Box>
      <FormProvider {...methods}>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <TextField
            label='Post Title'
            fullWidth
            sx={{ mb: '1rem' }}
            {...methods.register('title')}
          />
          <TextField
            label='Category'
            fullWidth
            sx={{ mb: '1rem' }}
            {...methods.register('category')}
          />
          <Controller
            name='content'
            control={methods.control}
            defaultValue=''
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder='Post Details'
                minRows={8}
                style={{
                  width: '100%',
                  border: '1px solid #c8d0d4',
                  fontFamily: 'Roboto, sans-serif',
                  marginBottom: '1rem',
                  outline: 'none',
                  fontSize: '1rem',
                  padding: '1rem',
                }}
              />
            )}
          />
          <FileUpload limit={1} name='image' multiple={false} />
          <LoadingButton
            variant='contained'
            fullWidth
            sx={{ py: '0.8rem', mt: 4, backgroundColor: '#2363eb' }}
            type='submit'
            loading={isLoading}
          >
            Create Post
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default CreatePost;
