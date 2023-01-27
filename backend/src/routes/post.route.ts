import express from "express";
import {
  createPostHandler,
  deletePostHandler,
  getPostHandler,
  getPostsHandler,
  parsePostFormData,
  updatePostHandler,
} from "../controllers/post.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createPostSchema,
  deletePostSchema,
  getPostSchema,
  updatePostSchema,
} from "../schema/post.schema";
import { uploadPostImageDisk } from "../upload/single-upload-disk";
import {
  resizePostImage,
  uploadPostImage,
} from "../upload/single-upload-sharp";
import {
  resizePostImages,
  uploadPostImages,
} from "../upload/multi-upload-sharp";

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route("/")
  .post(
    uploadPostImage,
    resizePostImage,
    parsePostFormData,
    validate(createPostSchema),
    createPostHandler
  )
  .get(getPostsHandler);

router
  .route("/:postId")
  .get(validate(getPostSchema), getPostHandler)
  .patch(
    uploadPostImage,
    resizePostImage,
    parsePostFormData,
    validate(updatePostSchema),
    updatePostHandler
  )
  .delete(validate(deletePostSchema), deletePostHandler);

export default router;
