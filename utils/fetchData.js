import Config from '../.env.js';
const {TOKEN, BASE_URL} = Config;

const constractURL = ({path = '', params = null}) => {
  const url = new URL(path, BASE_URL);

  if (params) {
    const paramsEntries = Object.entries(params);
    paramsEntries.forEach(([a, b]) => {
      url.searchParams.append(a, b);
    });
  }

  return url;
};

export const getData = async props => {
  const URL = constractURL(props);
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: TOKEN,
    },
  });

  const data = await res.json();
  return data;
};

export const deleteData = async props => {
  const URL = constractURL(props);

  const res = await fetch(URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token: TOKEN,
    },
  });

  const data = await res.json();
  return data;
};

export const postData = async props => {
  const {data} = props;
  const URL = constractURL(props);

  const res = await fetch(URL, {
    method: 'POST',
    body: data,
    headers: {
      token: TOKEN,
    },
  });

  const responseData = await res.json();
  return responseData;
};

export const putData = async props => {
  const {data} = props;
  const URL = constractURL(props);

  const res = await fetch(URL, {
    method: 'PUT',
    body: data,
    headers: {
      token: TOKEN,
    },
  });

  const responseData = await res.json();
  return responseData;
};
