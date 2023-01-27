import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import postModel, { Post } from "../models/post.model";

export const createPost = async ({
  input,
  user_id,
}: {
  input: Partial<Post>;
  user_id: string;
}) => {
  return postModel.create({ ...input, user: user_id });
};

export const findPostById = async (id: string) => {
  return postModel.findById(id).lean();
};

export const findAllPosts = async () => {
  return postModel.find().populate("user");
};

export const findPost = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await postModel.findOne(query, {}, options);
};

export const findAndUpdatePost = async (
  query: FilterQuery<Post>,
  update: UpdateQuery<Post>,
  options: QueryOptions
) => {
  return await postModel
    .findOneAndUpdate(query, update, options)
    .populate("user");
};

export const findOneAndDelete = async (
  query: FilterQuery<Post>,
  options: QueryOptions = {}
) => {
  return await postModel.findOneAndDelete(query, options);
};
