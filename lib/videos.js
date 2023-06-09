import videosData from '../data/videos.json';

export const getCommonVideos = async (url) => {
  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

  const BASE_URL = 'youtube.googleapis.com/youtube/v3';

  const res = await fetch(
    `https://${BASE_URL}/${url}&type=video&key=${YOUTUBE_API_KEY}`
  );

  const data = await res.json();

  return videosData.items.map((item) => ({
    title: item?.snippet?.title,
    imgUrl: item?.snippet?.thumbnails?.high?.url,
    id: item?.id?.videoId,
  }));
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL =
    'videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US';
  return getCommonVideos(URL);
};
