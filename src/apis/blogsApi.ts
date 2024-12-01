// apis/blogsApi.ts

import axios from "axios";
import { Blog } from "../interfaces/Blog";
const API_BASE_URL = "http://localhost:5004/api/blogs";

export const fetchBlogs = async (): Promise<Blog[]> => {
  try {
    const token = localStorage.getItem("token"); // Hoặc lấy token từ nơi lưu trữ (localStorage, sessionStorage, hoặc Redux store)

    if (!token) {
      throw new Error("No token provided");
    }

    const response = await axios.get(`${API_BASE_URL}/allAdmin`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
      },
    });

    return response.data.blogs; // Giả sử backend trả về { blogs: [...] }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

// Hàm tìm kiếm blog
export const searchBlogs = async (
  query: string,
  status?: string,
  authorId?: string
): Promise<Blog[]> => {
  try {
    const token = localStorage.getItem("token"); // Giả sử token được lưu trong localStorage. Bạn có thể thay đổi phương thức lấy token tùy theo cách bạn quản lý xác thực.

    const params: any = {};
    if (query) params.query = query;
    if (status) params.status = status;
    if (authorId) params.authorId = authorId;

    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Thêm token vào headers, nếu có
      },
    };

    const response = await axios.get(`${API_BASE_URL}/search`, {
      params,
      ...config,
    });
    return response.data.blogs;
  } catch (error) {
    console.error("Error searching blogs:", error);
    throw error;
  }
}; 

export const updateBlog = async (
    blogId: string,
    updatedData: any
  ): Promise<any> => {
    try {
      const token = localStorage.getItem('token'); // Giả sử token được lưu trong localStorage.
  
      const config = {
        headers: {
          Authorization: token ? `Bearer ${token}` : '', // Thêm token vào headers, nếu có
        },
      };
  
      const response = await axios.put(
        `${API_BASE_URL}/updateAdmin/${blogId}`,
        updatedData,
        config
      );
      return response.data;
    } catch (error) {
      console.error('Error updating blog:', error);
      throw error;
    }
  };
