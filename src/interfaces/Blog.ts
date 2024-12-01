// interfaces/Blog.ts

export interface Blog {
  _id: string;
  title: string;
  content: string;
  image: string;
  status: "draft" | "published";
  authorId: string; // Giả sử authorId là ID của người dùng
  createdAt: string; // Hoặc bạn có thể dùng Date
  updatedAt: string; // Hoặc bạn có thể dùng Date
}
