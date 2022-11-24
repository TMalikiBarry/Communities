import {Comment} from "../../core/models/comment";

export class Post {
  id!: number;
  userId!: number;
  title!: string;
  createdDate!: Date;
  content!: string;
  comments!: Comment[];
}
