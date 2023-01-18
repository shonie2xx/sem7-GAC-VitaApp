import axios from "axios";
import { protectedResources } from "../authConfig";

const url = protectedResources.apiUser.endpoint;

export async function getAllUsers(token) {
  var response = await axios.get(url + "public/page/0", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getUser(token) {
  var response = await axios.get(url + "me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
export async function getUserById(token, id) {
  var response = await axios.get(url + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function checkUser(token) {

  var response = await axios.get(url + "login/check", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateUserMood(token, points) {
  const res = await fetch(url + "setmood/" + points, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`,
    },
  });
return await res.json();
}