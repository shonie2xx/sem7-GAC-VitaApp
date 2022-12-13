import axios from "axios";
import { protectedResources } from "../../authConfig";

const url = protectedResources.apiFriends.endpoint;

export async function getFriends(token) {
    var response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function addFriend(token, friendId) {
    var response = await axios.post(
        url + "/add" + friendId,
        {
            headers: { Authorization: `Bearer ${token}` },
        });
    return response.data;
}

export async function removeFriend(token, friendId) {
    var response = await axios.delete(url + "remove" + friendId, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function getFrRequests(token) {
    var response = await axios.get(url + "requests", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function acceptFrRequest(token, friendReqId) {
    var response = await axios.post(url + "requests/accept" + friendReqId, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

export async function cancelRequest(token, friendReqId) {
    var response = await axios.delete(url + "requests/cancel" + friendReqId, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
}

