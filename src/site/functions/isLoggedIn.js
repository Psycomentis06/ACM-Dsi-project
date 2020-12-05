export default function isLoggedIn() {
  localStorage.setItem("userData", JSON.stringify({ role: "ROLE_ADMIN" }));
  let userRole = JSON.parse(localStorage.getItem("userData"));
  if (!userRole || !userRole.role) {
    return { message: "User not logged in", valid: false };
  } else {
    if (userRole.role === "ROLE_USER") {
      return { message: "Regular user permission", role: "user", valid: true };
    } else if (userRole.role === "ROLE_ADMIN") {
      return { message: "Admin permission", role: "admin", valid: true };
    } else if (userRole.role === "ROLE_SUPERADMIN") {
      return {
        message: "Super admin permission",
        role: "superadmin",
        valid: true,
      };
    } else {
      return {
        message: "Unercognized role please log out and log in again",
        valid: false,
      };
    }
  }
}
