import express from 'express';
import {
  githubOauthHandler,
  googleOauthHandler,
} from '../controllers/auth.controller';

const router = express.Router();

router.get('/oauth/google', googleOauthHandler);
router.get('/oauth/github', githubOauthHandler);

export default router;
