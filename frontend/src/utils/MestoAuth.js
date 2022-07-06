export const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`;

export const register = ({ password, email }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    return res.json();
  });
};

export const login = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    return res.json();
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((res) => res.json());
};
