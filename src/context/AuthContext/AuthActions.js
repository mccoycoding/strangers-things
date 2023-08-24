import {USERS} from '../../logic/info';

//Register new user
export const register = async (username, password) => {
  try {
    const response = await fetch(`${USERS}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    if (result.data.token) {
      sessionStorage.setItem('user', JSON.stringify(result.data.token));
      return result.data;
    }
  } catch (error) {
    console.log(error);

    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage};
  }
};

//Login existing user
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${USERS}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      return {error: result.error.message};
    }
    if (result.data.token) {
      sessionStorage.setItem('user', JSON.stringify(result.data.token));
      return result.data.token;
    }
  } catch (error) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return {error: errorMessage};
  }
};

//Logout existing user
export const logoutUser = async () => await sessionStorage.removeItem('user');
