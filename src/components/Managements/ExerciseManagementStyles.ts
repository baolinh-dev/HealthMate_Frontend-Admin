// ExerciseManagementStyles.ts
const styles: { [key: string]: React.CSSProperties } = {
    searchInput: {
      marginBottom: 20,
      padding: 10,
      width: "100%",
      boxSizing: "border-box",
      borderRadius: 5,
      border: "1px solid #ddd",
    },
    formField: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "12px",
    },
    formFieldLabel: {
      marginBottom: "4px",
    },
    formFieldInput: {
      padding: "8px",
      borderRadius: "8px",
      border: "1px solid rgb(204, 204, 204)",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: 20,
    },
    th: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
      backgroundColor: "#f4f4f4",
    },
    td: {
      border: "1px solid #ddd",
      padding: "8px",
      textAlign: "left",
    },
    image: {
      width: 50,
      height: 50,
      objectFit: "cover",
    },
    editButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "5px 10px",
      marginRight: 5,
      border: "none",
      borderRadius: 3,
      cursor: "pointer",
    },
    deleteButton: {
      backgroundColor: "#f44336",
      color: "white",
      padding: "5px 10px",
      border: "none",
      borderRadius: 3,
      cursor: "pointer",
    },
    addButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modal: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 5,
      width: "400px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    saveButton: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 20px",
      marginRight: 10,
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
    },
    cancelButton: {
      backgroundColor: "#f44336",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
    }, 
    
  };
  
  export default styles;