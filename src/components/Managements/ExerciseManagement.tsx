import React, { useState, useEffect } from "react";
import {
  fetchExercises,
  createExercise,
  updateExercise,
  deleteExercise,
  Exercise,
} from "../../apis/exerciseApi"; 
import styles from './ExerciseManagementStyles';

const ExerciseManagement: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState<string>("");
  const [form, setForm] = useState<Partial<Exercise>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const loadExercises = async () => {
    try {
      const data = await fetchExercises();
      setExercises(
        data.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
      );
    } catch (error) {
      console.error("Error loading exercises:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editingId) {
        await updateExercise(editingId, form as Exercise);
        setEditingId(null);
      } else {
        await createExercise(form as Exercise);
      }
      setForm({});
      setShowModal(false);
      loadExercises();
    } catch (error) {
      console.error("Error saving exercise:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this exercise?")) {
      try {
        await deleteExercise(id);
        loadExercises();
      } catch (error) {
        console.error("Error deleting exercise:", error);
      }
    }
  };

  const handleEdit = (exercise: Exercise) => {
    setEditingId(exercise._id);
    setForm(exercise);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setForm({});
    setEditingId(null);
  };

  useEffect(() => {
    loadExercises();
  }, [search]);

  return (
    <div>
      <h2>Healthmate - Manage Exercises</h2>
      <input
        type="text"
        placeholder="Search exercises"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.searchInput}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: "20%" }}>Name</th>
            <th style={{ ...styles.th, width: "10%" }}>Sets</th>
            <th style={{ ...styles.th, width: "15%" }}>Time per Set</th>
            <th style={{ ...styles.th, width: "15%" }}>Rest Time</th>
            <th style={{ ...styles.th, width: "15%" }}>Image</th>
            <th style={{ ...styles.th, width: "10%" }}>Calories</th>
            <th style={{ ...styles.th, width: "15%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise._id}>
              <td style={styles.td}>{exercise.name}</td>
              <td style={styles.td}>{exercise.sets}</td>
              <td style={styles.td}>{exercise.timePerSet}</td>
              <td style={styles.td}>{exercise.restTimePerSet}</td>

              <td style={styles.td}>
                <img
                  src={exercise.exerciseImage}
                  alt={exercise.name}
                  style={styles.image}
                />
              </td>
              <td style={styles.td}>{exercise.caloriesPerSet}</td>
              <td style={styles.td}>
                <button
                  onClick={() => handleEdit(exercise)}
                  style={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exercise._id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={() => {
          setForm({});
          setShowModal(true);
        }}
        style={styles.addButton}
      >
        Add Exercise
      </button>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2>{editingId ? "Edit Exercise" : "Add Exercise"}</h2>

            <div style={styles.formField}>
              <label style={styles.formFieldLabel}>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={form.name || ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={styles.formFieldInput}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formFieldLabel}>Sets</label>
              <input
                type="number"
                placeholder="Sets"
                value={form.sets || ""}
                onChange={(e) =>
                  setForm({ ...form, sets: Number(e.target.value) })
                }
                style={styles.formFieldInput}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formFieldLabel}>Time per Set</label>
              <input
                type="number"
                placeholder="Time per Set"
                value={form.timePerSet || ""}
                onChange={(e) =>
                  setForm({ ...form, timePerSet: Number(e.target.value) })
                }
                style={styles.formFieldInput}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formFieldLabel}>Rest Time</label>
              <input
                type="number"
                placeholder="Rest Time"
                value={form.restTimePerSet || ""}
                onChange={(e) =>
                  setForm({ ...form, restTimePerSet: Number(e.target.value) })
                }
                style={styles.formFieldInput}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formFieldLabel}>Exercise Image URL</label>
              <input
                type="text"
                placeholder="Exercise Image URL"
                value={form.exerciseImage || ""}
                onChange={(e) =>
                  setForm({ ...form, exerciseImage: e.target.value })
                }
                style={styles.formFieldInput}
              />
            </div>

            <div style={styles.formField}>
              <label style={styles.formFieldLabel}>Calories</label>
              <input
                type="number"
                placeholder="Calories per set"
                value={form.caloriesPerSet || ""}
                onChange={(e) =>
                  setForm({ ...form, caloriesPerSet: Number(e.target.value) })
                }
                style={styles.formFieldInput}
              />
            </div>

            <div>
              <button onClick={handleSave} style={styles.saveButton}>
                {editingId ? "Update" : "Add"}
              </button>
              <button onClick={handleModalClose} style={styles.cancelButton}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default ExerciseManagement;
