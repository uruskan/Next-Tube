export const fetchRandomImage = async () => {
    const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY; // Ensure this key is set in your environment variables
    const randomPage = Math.floor(Math.random() * 1000) + 1;
    const response = await fetch(`https://api.pexels.com/v1/search?query=nature&per_page=1&page=${randomPage}`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
    });
    const data = await response.json();
    if (data.photos.length > 0) {
      return data.photos[0].src.medium; // Or any other size you prefer
    }
    return 'https://via.placeholder.com/400?text=No+Image+Found'; // Fallback image
  };
  