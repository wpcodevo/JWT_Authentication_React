import { Container, Grid } from '@mui/material';
import PostItem from '../components/post/post.component';

const HomePage = () => {
  return (
    <Container maxWidth={false} sx={{ backgroundColor: '#2363eb' }}>
      <Grid
        container
        rowGap={5}
        maxWidth='lg'
        sx={{ margin: '0 auto', pt: '5rem' }}
      >
        {Array.from(Array(12).keys()).map((_, i) => (
          <PostItem key={i + 1} />
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
