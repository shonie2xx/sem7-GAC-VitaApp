import axios from "axios";
import { protectedResources } from "../authConfig";

const url = protectedResources.apiEvent.endpoint;

export async function getEvents(token) {
    console.log(token)
    var response = await axios.get(url + "all", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
}

export async function joinEvent(token, id) {
    const res = await fetch(url + "join/" + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return res;
}

export async function leaveEvent(token, id) {
    const res = await fetch(url + "leave/" + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });
    return res;
}
export async function deleteEventById(id, token) {
    var response = await axios.delete(url + id, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
  export async function createEvent(data, token) {
    console.log(data, token)
    var response = await axios.post(
      url + "/add",
      {
        id: null,
        title: data.title,
        description: data.description,
        date: null,
        userIds: [
            null
        ]
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  }