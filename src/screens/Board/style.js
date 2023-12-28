const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#034c85",
  },
  headerContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
  },

  titleRowContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },

  userTitle: {
    fontSize: 24,
    color: "white",
    paddingRight: 20,
  },

  gameTitle: {
    fontSize: 28,
    paddingRight: 40,
    paddingLeft: 20,
    color: "#B4653C",
  },

  headerBottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 40px",
    border: "1px solid #034c85",
  },

  timerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#ddd",
    fontSize: 24,
    fontWeight: "bold",
  },
  highScore: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#B4653C",
    color: "white",
    fontSize: 16,
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.9s",
    border: "1px solid #ddd",
  },

  board: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridGap: 10,
    maxWidth: 600,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "relative",
    cursor: "pointer",
    width: 280,
    height: 200,
    border: "2px solid #ddd",
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
    border: "2px solid #aef359",
  },
  cardBack: {
    position: "absolute",
    backgroundColor: "#b4653c",
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
  },
};

export default style;
