const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  }, 
  searchContainer: {
    display: "flex"
  }, 
  
  inputSearch: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "12px",
    border: "1px solid #ccc",
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
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer", 
    maxHeight: "38px", 
    marginLeft: "12px"
  },
  editButton: {
    padding: "5px 10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "8px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  }, 
  viewButton: {
    backgroundColor: "#fd7e14",
    color: "white",
    padding: "5px 10px",
    margin: "0 4px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
  },
  
  closeButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "8px 12px",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    marginTop: "12px",
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
  formFieldSelect: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid rgb(204, 204, 204)",
  },
  buttonFormContainer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    minWidth: "400px",
  },
  paginationContainer: {
    display: "flex", 
    justifyContent: "center",
  },
  pagination: {
    padding: "10px 0", 
    maxWidth: "400px"
  },
  paginationButton: {
    padding: "8px 12px",
    margin: "0 5px",
    borderRadius: 5,
    border: "1px solid #ddd",
    backgroundColor: "#f8f9fa",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  paginationButtonDisabled: {
    padding: "8px 12px",
    margin: "0 5px",
    borderRadius: 5,
    border: "1px solid #ddd",
    backgroundColor: "#e9ecef",
    cursor: "not-allowed",
  },
  paginationText: {
    margin: "0 10px",
  },
};

export default styles;
