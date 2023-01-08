import axios from "axios";
import { protectedResources } from "../../authConfig";

const url = protectedResources.apiActivity.endpoint;

export async function startActivity(id, token) {
  var response = await axios.put(
    url + id,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function getAllActivities(token) {
  // console.log(token)
  var response = await axios.get(url + "active", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data;
}

// export async function deleteActivity(id, token) {
//   console.log(url + id)
//   var response = await axios.delete(
//     url + id,
//     {},
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// }
// export async function createActivity(data, token) {
//   var response = await axios.post(
//     url,
//     {
//       category: {
//         id: data.activity.category.id,
//         name: data.activity.category.name,
//         source: [
//           "Object"
//         ],
//         target: [
//           "Object"
//         ]
//       },
//       description: data.activity.description,
//       id: data.activity.id,
//       points: data.activity.points,
//       status: "ACTIVE",
//       title: data.activity.title
//     },
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return response.data;
// }

export async function completeActivity(id, token) {
  var response = await axios.put(
    url + "complete/" + id,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function increaseMood(id, token) {
  var response = await axios.put(
    url + "complete/" + id,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

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

export async function getAllCompletedActivities(token) {
  var response = await axios.get(url + "completed", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getAllActiveActivities(token) {
  var response = await axios.get(url + "accepted", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function cancelActivity(id, token) {
  var response = await axios.put(
    url + "cancel/" + id,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function getAllMoodboosterRequests(token) {
  console.log(token)
  var response = await axios.get(url + "invites", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
