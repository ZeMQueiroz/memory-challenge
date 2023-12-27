const styles = {
  backdrop: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    position: "relative",
    maxWidth: 400,
    width: "100%",
    maxHeight: 1000,
    height: "100%",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    zIndex: 101,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    height: 500,
    overflow: "scroll",
  },
  listItem: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottom: "1px solid #ddd",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    fontSize: 20,
    fontWeight: "bold",
    transition: "background-color 0.3s ease-in-out",
  },
};

export default styles;
