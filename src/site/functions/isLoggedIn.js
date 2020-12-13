export default function isLoggedIn() {
  let userRole = JSON.parse(localStorage.getItem("userData"));
  if (!userRole || !userRole.roles) {
    return { message: "User not logged in", valid: false };
  } else {
    if (userRole.roles === "ROLE_USER") {
      return { message: "Regular user permission", role: "user", valid: true };
    } else if (userRole.roles === "ROLE_ADMIN") {
      return { message: "Admin permission", role: "admin", valid: true };
    } else if (userRole.roles === "ROLE_SUPERADMIN") {
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
