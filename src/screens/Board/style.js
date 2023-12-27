const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#3a3a3a",
  },
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: 10,
    maxWidth: 600,
    margin: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "relative",
    cursor: "pointer",
    width: 280,
    height: 200,
    border: "1px solid #ddd",
    backgroundColor: "#eee",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  flipped: {
    visibility: "visible",
  },
  matched: {
    visibility: "visible",
    opacity: 0.5,
    border: "1px solid green",
  },
  cardBack: {
    position: "absolute",
    backgroundColor: "#3333",
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
  },
};

export default style;
