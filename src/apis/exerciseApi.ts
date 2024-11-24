import axios from "axios";

const API_BASE_URL = "http://localhost:5004/api/exercises";

export interface Exercise {
  _id: string;
  name: string;
  sets: number;
  timePerSet: number;
  restTimePerSet: number;
  exerciseImage: string;
}

export const fetchExercises = async (): Promise<Exercise[]> => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching exercises:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
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
