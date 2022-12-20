import axios from "axios";
import { protectedResources } from "../../authConfig";

const url = protectedResources.apiUser.endpoint + "friends";

export async function getFriends(token) {
    var response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function addFriend(token, id) {
    const res = await fetch(url + "/add/" + id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return await res.json();
}

export async function removeFriend(token, friendId) {
    var response = await axios.delete(url + "/remove/" + friendId, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
}

export async function getFrRequests(token) {
    var response = await axios.get(url + "/requests", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response;
}

// export async function acceptFrRequest(token, friendReqId) {
//     var response = await axios.post(url + "/requests/accept/" + friendReqId, {
//         headers: { Authorization: `Bearer ${token}` },
//     });
//     return response.data;
// }
export async function acceptFrRequest(token, friendReqId) {
    const res = await fetch(url + "/requests/accept/" + friendReqId, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return await res.json();
}

export async function cancelFrRequest(token, friendReqId) {
    var response = await axios.delete(url + "/requests/cancel/" + friendReqId, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function getSendedRequests(token) {
    var response = await axios.get(url + "/sendedrequests", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}