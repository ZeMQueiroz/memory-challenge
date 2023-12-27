import axios from "axios";

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;

export const fetchImages = async () => {
  try {
    const response = await axios.get(
      "https://api.pexels.com/v1/search?query=nature&per_page=6",
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );
    return response.data.photos.map((photo) => photo.src.tiny);
  } catch (error) {
    console.error("erro nas imagens", error);
  }
};
