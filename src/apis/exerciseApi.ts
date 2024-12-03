import axios from "axios";

const API_BASE_URL = "http://localhost:5004/api/exercises";
export interface Exercise {
  _id: string;
  name: string;
  sets: number;
  timePerSet: number;
  restTimePerSet: number;
  exerciseImage: string;
  caloriesPerSet: number;
  updatedAt: string;
}

export interface FetchExercisesResponse {
  exercises: Exercise[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}


export const fetchExercises = async (page: number, searchTerm: string = "") => {
  const url = `${API_BASE_URL}?page=${page}&search=${searchTerm}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error response:", errorText);
      throw new Error(`Error fetching exercises: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw new Error("Invalid JSON response or network error");
  }
};



export const createExercise = async (exercise: Exercise): Promise<Exercise> => {
  try {
    const response = await axios.post(API_BASE_URL, exercise);
    return response.data;
  } catch (error) {
    console.error("Error creating exercise:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const updateExercise = async (
  id: string,
  updates: Partial<Exercise>
): Promise<Exercise> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    console.error("Error updating exercise:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};

export const deleteExercise = async (id: string): Promise<void> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting exercise:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
