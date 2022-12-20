import axios from "axios";
import { protectedResources } from "../authConfig";

const url = protectedResources.apiBadge.endpoint;

export async function getAllBadges(token) {
  var response = await axios.get(url + "all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getBadgeById(token, id) {
  var response = await axios.get(url + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function updateBadge(token, badge, image) {
  var response = await axios.post(
    url,
    { badge: badge, image: image },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}

export async function deleteBadgeById(token, id) {
  var response = await axios.delete(url + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
