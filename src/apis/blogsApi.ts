// apis/blogsApi.ts

import axios from "axios";
import { Blog } from "../interfaces/Blog";
const API_BASE_URL = "http://localhost:5004/api/blogs";

// Fetch tất cả blogs
export const fetchBlogs = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
): Promise<{ blogs: Blog[], totalItems: number }> => { // Adjusted return type
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token provided");
    }

    // Tạo URL động dựa trên tham số phân trang và tìm kiếm
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search: search.trim() }), // Thêm tham số `search` nếu có
    }).toString();

    const response = await axios.get(`${API_BASE_URL}/allAdmin?${queryParams}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
      },
    });

    // Return both the blogs and totalItems
    return {
      blogs: response.data.blogs,
      totalItems: response.data.totalItems, // Assuming the response has a totalItems field
    };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};


// Hàm tìm kiếm blog
export const searchBlogs = async (
  query: string,
  status?: string,
  authorId?: string
): Promise<Blog[]> => {
  try {
    const token = localStorage.getItem("token");

    const params: any = {};
    if (query) params.query = query;
    if (status) params.status = status;
    if (authorId) params.authorId = authorId;

    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Thêm token vào headers nếu có
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

// Cập nhật blog
export const updateBlog = async (
  blogId: string,
  updatedData: any
): Promise<any> => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Thêm token vào headers
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/updateAdmin/${blogId}`,
      updatedData,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
};

// Xóa blog
export const deleteBlog = async (blogId: string): Promise<any> => {
  try {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage

    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : "", // Thêm token vào headers
      },
    };

    const response = await axios.delete(
      `${API_BASE_URL}/delete/${blogId}`,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting blog:", error);
    throw error;
  }
};

export const addBlog = async (newBlogData: any): Promise<any> => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token provided");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Gửi token trong header Authorization
      },
    };

    const response = await axios.post(
      `${API_BASE_URL}/add`, // API route để thêm blog
      newBlogData,
      config
    );

    return response.data;
  } catch (error) {
    console.error("Error adding blog:", error);
    throw error;
  }
};
