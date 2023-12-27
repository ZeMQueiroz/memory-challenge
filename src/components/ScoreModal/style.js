export const topScores = {
  gold: { color: "gold" },
  silver: { color: "#6483B7" },
  bronze: { color: "#cd7f32" },
};

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
    maxHeight: 600,
    height: "100%",
    padding: 20,
    borderRadius: 8,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#3a3a3a",
    zIndex: 101,
  },

  title: {
    textAlign: "center",
    marginBottom: 20,
    color: "#ddd",
  },
  listContainer: {
    position: "relative",
    padding: 10,
    borderRadius: 5,
    border: "1px solid #5d5d5d",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    height: 500,
    overflow: "scroll",
  },
  listItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottom: "1px solid #ddd",
    backgroundColor: "#5d5d5d",
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottom: "1px solid #ddd",
    backgroundColor: "#3a3a3a",
    color: "#ddd",
    fontWeight: "bold",
  },
  listName: {
    flex: 1,
    textAlign: "left",
    borderRight: "1px solid #ddd",
    marginLeft: 20,
  },
  listTime: {
    flex: 1,
    textAlign: "right",
    marginRight: 20,
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
    color: "#ddd",
  },
};

export default styles;
