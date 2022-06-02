import { Box, TextareaAutosize, TextField, Typography } from '@mui/material';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { object, string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import FileUpload from '../FileUpload/FileUpload';
import { LoadingButton } from '@mui/lab';
import { FC, useEffect } from 'react';
import { pickBy } from 'lodash';
import { toast } from 'react-toastify';
import { useUpdatePostMutation } from '../../redux/api/postApi';

interface IUpdatePost {
  name: string;
  description?: string;
  photo?: File;
}

interface IUpdatePostProp {
  setOpenPostModal: (openPostModal: boolean) => void;
}

const updatePostSchema = object({
  name: string().nonempty('Post name is required'),
  description: string().max(50).optional(),
  image: z.instanceof(File),
});

const UpdatePost: FC<IUpdatePostProp> = ({ setOpenPostModal }) => {
  const [updatePost, { isLoading, isError, error, isSuccess }] =
    useUpdatePostMutation();

  const defaultValues: IUpdatePost = {
    name: '',
    description: '',
  };

  const methods = useForm<IUpdatePost>({
    resolver: zodResolver(updatePostSchema),
    defaultValues,
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

  const onSubmitHandler: SubmitHandler<IUpdatePost> = (values) => {
    const formData = new FormData();
    const filteredFormData = pickBy(
      values,
      (value) => value !== '' && value !== undefined
    );
    const { image, ...otherFormData } = filteredFormData;
    if (image) {
      formData.append('image', image);
    }
    formData.append('data', JSON.stringify(otherFormData));
    updatePost({ id: 'ff', post: formData });
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 3 }}>
        <Typography variant='h5' component='h1'>
          Edit Post
        </Typography>
        {isLoading && <p>loading...</p>}
      </Box>
      <FormProvider {...methods}>
        <Box
          component='form'
          noValidate
          autoComplete='off'
          onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <TextField
            name='name'
            label='Post Name'
            fullWidth
            type='text'
            sx={{ mb: '1rem' }}
          />
          <Controller
            name='description'
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
            Edit Post
          </LoadingButton>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default UpdatePost;
