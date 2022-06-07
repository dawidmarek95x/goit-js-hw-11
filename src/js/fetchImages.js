// Import of Axios library
import axios from "axios";

// Function that sends a request to the pixabay.com server
export async function fetchImages(searchedValue, page) {
  const params = new URLSearchParams({
    key: "27887941-26f96d7878e5748cf06133d38",
    q: searchedValue,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40,
    page,
  });

  try {
    const response = await axios({
      method: 'get',
      url: `https://pixabay.com/api/?${params}`,
    });
    return response.data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};