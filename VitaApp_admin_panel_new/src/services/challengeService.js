import axios from "axios";
import { protectedResources } from "../authConfig";

const url = protectedResources.apiChallenge.endpoint;

export async function getAllChallenges(token) {
  var response = await axios.get(url + "all", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function addChallenge(token, challenge) {
  var response = await axios.post(
    url,
    {
      challenge: challenge,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}

export async function updateChallenge(token, challenge) {
  var response = await axios.put(
    url,
    {
      challenge: challenge,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
}

export async function deleteChallengeById(token, id) {
  var response = await axios.delete(url + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
