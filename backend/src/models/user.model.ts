import crypto from "crypto";
import {
  DocumentType,
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
  Severity,
} from "@typegoose/typegoose";
import bcrypt from "bcryptjs";

@index({ email: 1 })
@pre<User>("save", async function (next) {
  this.id = this._id;
  // Hash password if the password is new or was updated
  if (!this.isModified("password")) return;

  // Hash password with costFactor of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
})
@modelOptions({
  schemaOptions: {
    // Add createdAt and updatedAt fields
    timestamps: true,
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})

// Export the User class to be used as TypeScript type
export class User {
  @prop()
  name: string;

  @prop()
  id: string;

  @prop({ unique: true, required: true })
  email: string;

  @prop({ required: true, minlength: 8, maxLength: 32, select: false })
  password: string;

  @prop({ default: "user" })
  role: string;

  @prop({ default: "default.png" })
  photo: string;

  @prop({ default: false })
  verified: boolean;

  @prop({ select: false })
  verificationCode: string | null;

  @prop({ select: false })
  passwordResetToken: string | null;

  @prop({ select: false })
  passwordResetAt: Date | null;

  @prop({ default: "local" })
  provider: string;

  // Instance method to check if passwords match
  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }

  createVerificationCode() {
    const verificationCode = crypto.randomBytes(32).toString("hex");

    this.verificationCode = crypto
      .createHash("sha256")
      .update(verificationCode)
      .digest("hex");

    return verificationCode;
  }

  createResetToken() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    this.passwordResetAt = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
  }
}

// Create the user model from the User class
const userModel = getModelForClass(User);
export default userModel;
