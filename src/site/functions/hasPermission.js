import isLoggedIn from "./isLoggedIn";
console.log(isLoggedIn().valid);
export default function hasPermission(permission) {
  if (isLoggedIn().valid) {
    console.log("pass");
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
