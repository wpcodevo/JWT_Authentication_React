import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CartImage from '../../assets/cat.jpg';
import './post.styles.scss';
import { useEffect, useState } from 'react';
import PostModal from '../modals/post.modal';
import { useDeletePostMutation } from '../../redux/api/postApi';
import { toast } from 'react-toastify';
import UpdatePost from './update-post';

const PostItem = () => {
  const [openPostModal, setOpenPostModal] = useState(false);
  const [deletePost, { isLoading, error, isSuccess, isError }] =
    useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Post created successfully');
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

  return (
    <>
      <Grid item xs={12} md={6} lg={4}>
        <Card sx={{ maxWidth: 345, overflow: 'visible' }}>
          <CardMedia
            component='img'
            height='250'
            image={CartImage}
            alt='green iguana'
            sx={{ p: '1rem 1rem 0' }}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant='h5'
              component='div'
              sx={{ color: '#4d4d4d', fontWeight: 'bold' }}
            >
              How to Train a Dachshund Puppy
            </Typography>
            <Box display='flex' alignItems='center' sx={{ mt: '1rem' }}>
              <Typography
                variant='body1'
                sx={{
                  backgroundColor: '#dad8d8',
                  p: '0.1rem 0.4rem',
                  borderRadius: 1,
                  mr: '1rem',
                }}
              >
                Lizards
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  color: '#ffa238',
                }}
              >
                July 25th, 2021
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <Box
              display='flex'
              justifyContent='space-between'
              width='100%'
              sx={{ px: '0.5rem' }}
            >
              <Box display='flex' alignItems='center'>
                <Avatar alt='cart image' src={CartImage} />
                <Typography
                  variant='body2'
                  sx={{
                    ml: '1rem',
                  }}
                >
                  Codevo
                </Typography>
              </Box>
              <div className='post-settings'>
                <li>
                  <MoreHorizOutlinedIcon />
                </li>
                <ul className='menu'>
                  <li onClick={() => setOpenPostModal(true)}>
                    <ModeEditOutlineOutlinedIcon
                      fontSize='small'
                      sx={{ mr: '0.6rem' }}
                    />
                    Edit
                  </li>
                  <li onClick={() => deletePost('8484494jjdjdkd')}>
                    <DeleteOutlinedIcon
                      fontSize='small'
                      sx={{ mr: '0.6rem' }}
                    />
                    Delete
                  </li>
                </ul>
              </div>
            </Box>
          </CardActions>
        </Card>
      </Grid>
      <PostModal
        openPostModal={openPostModal}
        setOpenPostModal={setOpenPostModal}
      >
        <UpdatePost setOpenPostModal={setOpenPostModal} />
      </PostModal>
    </>
  );
};

export default PostItem;
