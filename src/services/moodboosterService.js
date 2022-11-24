import axios from "axios";
import { protectedResources } from "../../authConfig";

const url = protectedResources.apiActivity.endpoint;

export async function getAllActivities(token) {
  var response = await axios.get(url + "active", {
    headers: { Authorization: `Bearer ${token}` },
  }).catch(response => {
    console.log("response " + response);
  });
  return response.data;
}

// export async function acceptActivity(id, token) {
//   var response = await axios.put(
//     url + id,
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// }

// export async function completeActivity(id, token) {
//   var response = await axios.put(
//     url + "complete/" + id,
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// }

// export async function getActivityById(id, token) {
//   var response = await axios.get(url + id, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// }

// export async function getActivitiesByCategory(id, token) {
//   var response = await axios.get(url + "category/" + id, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// }

// export async function getAllCategories(token) {
//   console.log(url + "category/all")
//   var response = await axios.get(url + "category/all", {
//     headers: { Authorization: `Bearer ${token}` },
//   }).catch(response => {
//     console.log("response " + response);
//   });
//   return response.data;
// }

// export async function getAllCompletedActivities(token) {
//   var response = await axios.get(url + "completed", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// }

// export async function getAllActiveActivities(token) {
//   var response = await axios.get(url + "accepted", {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;
// }

// export async function cancelActivity(id, token) {
//   var response = await axios.put(
//     url + "cancel/" + id,
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// }
