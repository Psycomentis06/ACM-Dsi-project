import isLoggedIn from "./isLoggedIn";
export default function hasPermission(permission) {
  if (isLoggedIn().valid) {
    // logged in already
    if (isLoggedIn().role === permission) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
