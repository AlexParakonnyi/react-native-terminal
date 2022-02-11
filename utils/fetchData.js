import Config from '../.env.js';

const token = Config.TOKEN;

export const getData = async url => {
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

export const deleteElementById = async url => {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
  });

  const data = await res.json();
  return data;
};
