import axios from "axios";
import { protectedResources } from "../../authConfig";

const url = protectedResources.apiUser.endpoint;

export async function getAllUsers(token) {
  var response = await axios.get(url + "all", {
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

export async function checkUser(token) {
  var response = await axios.get(url + "login/check", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
