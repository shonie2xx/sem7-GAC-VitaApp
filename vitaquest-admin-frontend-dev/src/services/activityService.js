import axios from "axios";
import { protectedResources } from "../authConfig";

const url = protectedResources.apiActivity.endpoint;

export async function getAllActivities(token) {
  var response = await axios.get(url + "all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("activities: ", response.data);
  return response.data;
}

export async function getActivityById(token, id) {
  var response = await axios.get(url + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getAllCategories(token) {
  var response = await axios.get(url + "category/all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function addCategory(token, name) {
  var response = await axios.post(
    url + "category",
    { name: name },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}

export async function addActivity(token, activity) {
  console.log(token + activity)
  var response = await axios.post(url, activity, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateActivity(token, activity) {
  var response = await axios.put(url, activity, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteActivityById(token, id) {
  var response = await axios.delete(url + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateCategory(token, category) {
  var response = await axios.put(url + "category", category, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteCategoryById(token, id) {
  var response = await axios.delete(url + "category/" + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

