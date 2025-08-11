const BASEURL = 'https://openmind-api.vercel.app';

export async function getsubjects({
  limit, offset, team="18-1"
}) {
  try {
    const response = await fetch(`https://openmind-api.vercel.app/${team}/subjects/?limit=${limit}&offset=${offset}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
