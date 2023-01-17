import axios from "axios";
import { protectedResources } from "../authConfig";

const url = protectedResources.apiNews.endpoint;

export async function getNews(token) {
  var response = await axios.get(url + "all", {
      headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}
export async function createNews(data, token) {
  console.log(data, token)
  var response = await axios.post(
    url,
    {
      id: null,
      title: data.title,
      description: data.description,
      date: Date.now(),
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}
export async function deleteNewsById(id, token) {
  var response = await axios.delete(url + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}