import isLoggedIn from "./isLoggedIn";
export default function hasPermission(permission) {
  if (isLoggedIn().valid) {
    // logged in already
    let loggedIn = isLoggedIn();
    if (
      permission === "user" &&
      (loggedIn.role === "user" ||
        loggedIn.role === "admin" ||
        loggedIn.role === "superadmin")
    ) {
      return true;
    } else if (
      permission === "admin" &&
      (loggedIn.role === "admin" || loggedIn.role === "superadmin")
    ) {
      return true;
    } else if (permission === "superadmin" && loggedIn.role === permission) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
