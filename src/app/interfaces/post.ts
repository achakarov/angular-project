export interface IPost {
  id?: string | undefined;
  author: string;
  title: string;
  category: string;
  content: string;
}

export interface IPostId extends IPost {
  id: string;
}
