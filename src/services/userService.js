import axios from "axios";
import { protectedResources } from "../../authConfig";



const url = protectedResources.apiUser.endpoint;

export async function getAllUsers(token) {
  var response = await axios.get(url + "all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function setUserExpoPushToken(token) {
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

export async function SetModalVisable(isModalVisable) {
  
  var response = await axios.post(url + "modalvisible/" + {isModalVisable}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function GetModalVisable(token) {
  
  var response = await axios.get(url + "modalvisible", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function GetDate(token) {
  
  var response = await axios.get(url + "date", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function SetDate(date) {
  
  var response = await axios.post(url + "modalvisible/" + {date}, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}