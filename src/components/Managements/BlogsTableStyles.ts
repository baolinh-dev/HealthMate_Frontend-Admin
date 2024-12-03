// BlogsTableStyles.ts
const styles: { [key: string]: React.CSSProperties } = {
    searchGroup: {
      display: "flex",
    },
    searchInput: {
      padding: 10,
      width: "100%",
      boxSizing: "border-box",
      borderRadius: 5,
      border: "1px solid #ddd",
      marginRight: "12px",
    },
    searchSelect: {
      height: "40px",
      marginRight: "12px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    searchButton: {
      height: "40px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      background: "white",
      padding: "20px",
      borderRadius: "5px",
      width: "400px",
    },
    addButton: {
      backgroundColor: "#28a745",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: 5,
      cursor: "pointer",
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
    actionGroup: {
      display: "flex",
    },
  };
  
  export default styles;