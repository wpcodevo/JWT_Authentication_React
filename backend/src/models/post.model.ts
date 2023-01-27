import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
} from "@typegoose/typegoose";
import { User } from "./user.model";

@index({ title: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Post {
  @prop({ unique: true, required: true })
  title: string;

  @prop({ required: true })
  content: string;

  @prop()
  category: string;

  @prop({ default: "default.png" })
  image: string;

  @prop({ required: true, ref: () => User })
  user: Ref<User>;
}

const postModel = getModelForClass(Post);
export default postModel;
