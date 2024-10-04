export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
  likes: number;
  dislikes: number;
}

export interface User {
  uid: string;
  username: string;
  email: string;
}

export interface Comment {
  id: string;
  postId: string;
  content: string;
  createdAt: Date;
  authorId: string;
  likes: number;
  dislikes: number;
}
