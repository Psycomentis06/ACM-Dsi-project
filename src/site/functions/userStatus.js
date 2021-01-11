import Axios from "axios";
/**
 * Function that set user state on database
 * @param {string} state Value to set the user Status to it can be only "online" or "offline"
 * @returns {string} String message
 */
export default async function userStatus(state) {
  if (state !== "online" && state !== "offline")
    return 'State can only be "online" or "offline"';
  try {
    const userData = JSON.parse(localStorage.getItem("userData"));
    await Axios.put(
      process.env.REACT_APP_API_URL + "/user/" + userData.id + "/status",
      {
        status: state,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
  } catch {}
}
