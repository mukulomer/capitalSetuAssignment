import { instance_movie } from "./axios";

const doLogin = async (email, password) => {
  try {
    const response = await instance_movie.post("api/sign_in", {
      email: email,
      password
    });
    if (response.data.status) {
      localStorage.setItem("username", email);
      localStorage.setItem("isLoggedIn", true);
    }
    return response;
  } catch (error) {
    console.log("some error occured");
  }
};

const signUp = async (data) => {
  try {
    const response = await instance_movie.post("api/sign_up", data);
    if (response.data.status) {
      localStorage.setItem("username", data.email);
      localStorage.setItem("isLoggedIn", true);
    }
    return response;
  } catch (error) {
    console.log("some error occured");
  }
};

const isLoggedIn = () => {
  return Boolean(localStorage.getItem("isLoggedIn"));
};

const handleLogout = (props) => {
  localStorage.removeItem("username");
  localStorage.removeItem("isLoggedIn");
  props.history.push("/login");
};

export default {
  doLogin,
  isLoggedIn,
  handleLogout,
  signUp
};
