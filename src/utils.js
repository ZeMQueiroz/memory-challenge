import axios from "axios";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export const fetchImages = async () => {
  try {
    const response = await axios.get(
      "https://api.pexels.com/v1/search?query=nature&per_page=6",
      {
        headers: {
          Authorization:
            "zHKQ2p2kB7DyYhEAkYb75Y264dRZoBQ2uCVGlYywhZq1Ho7SrdTHn1oj",
        },
      }
    );
    return response.data.photos.map((photo) => photo.src.tiny);
  } catch (error) {
    console.error("erro nas imagens", error);
  }
};

// saving game data to local storage
export const saveGameState = (gameState) => {
  localStorage.setItem("gameState", JSON.stringify(gameState));
};
// loading game data from local storage
export const loadGameState = () => {
  try {
    const savedData = localStorage.getItem("gameState");
    if (savedData === null) {
      // no saved data
      return undefined;
    }
    return JSON.parse(savedData);
  } catch (err) {
    console.error("Error", err);
    return undefined;
  }
};

//clearing
export const clearGameState = () => {
  localStorage.removeItem("gameState");
};

export const getHighScores = () => {
  const scores = localStorage.getItem("highScores");
  return scores ? JSON.parse(scores) : [];
};

// save score
export const saveHighScore = (newScore) => {
  const scores = getHighScores();
  scores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(scores));
};
