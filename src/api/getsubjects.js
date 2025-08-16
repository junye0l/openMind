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
    return { results: body.results, totalPages: Math.ceil(body.count / limit) };
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function postsubjects({ name, team = '18-1' }) {
  try {
    const response = await fetch(`${BASEURL}/${team}/subjects/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, team }),
    });
    if (!response.ok) {
      throw new Error('post error');
    }
    const data = await response.json();
    localStorage.setItem('id', data.id);
    return data;
  } catch (error) {
    console.error('POST ERROR', error);
    throw error;
  }
}
