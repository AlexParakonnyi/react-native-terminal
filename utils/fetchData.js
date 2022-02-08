export const getData = async (url, token) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  });

  const data = await res.json();
  return data;
};
