const BASE_URL = 'http://localhost:5000';

export async function sendWord(word) {
  const response = await fetch(`${BASE_URL}/word`, {
    method: 'POST',
    body: JSON.stringify(word),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }
  console.log(data);

  return { word: data.word };
}

export async function sendText(text) {
  const response = await fetch(`${BASE_URL}/text`, {
    method: 'POST',
    body: JSON.stringify(text),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not add comment.');
  }
  console.log(data);

  return { text: data.text };
}
