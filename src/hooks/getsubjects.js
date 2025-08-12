const BASEURL = 'https://openmind-api.vercel.app';

export async function getsubjects({ limit, page, team = '18-1' }) {
  try {
    const offset = (page - 1) * limit;
    const response = await fetch(
      `${BASEURL}/${team}/subjects/?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const body = await response.json();
    return { results : body.results, totalPages: Math.ceil(body.count / limit) };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
