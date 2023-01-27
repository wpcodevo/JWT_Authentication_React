import express from "express";
import {
  forgotPasswordHandler,
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} from "../controllers/auth.controller";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { validate } from "../middleware/validate";
import {
  createUserSchema,
  loginUserSchema,
  verifyEmailSchema,
} from "../schema/user.schema";

const router = express.Router();

// Register user route
router.post("/register", validate(createUserSchema), registerHandler);

// Login user route
router.post("/login", validate(loginUserSchema), loginHandler);

// Refresh access toke route
router.get("/refresh", refreshAccessTokenHandler);

// Logout User
router.get("/logout", deserializeUser, requireUser, logoutHandler);

router.get(
  "/verifyemail/:verificationCode",
  validate(verifyEmailSchema),
  verifyEmailHandler
);

router.post("/forgotpassword", forgotPasswordHandler);
router.patch("/resetpassword/:resetToken", resetPasswordHandler);

export default router;
