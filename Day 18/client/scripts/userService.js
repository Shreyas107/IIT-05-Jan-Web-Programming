const URL = "http://localhost:5000";
const notyf = new Notyf({
  duration: 1000,
  position: {
    x: "right",
    y: "top",
  },
});

function userLogin(email, password) {
  return fetch(`${URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      debugger;
      if (data.token) {
        notyf.success(data.message);
        localStorage.setItem("token", data.token);

        // Decode the JWT token to get user role
        const decodedToken = jwt_decode(data.token);
        console.log("decoded token: " + JSON.stringify(decodedToken));
        console.log("user Role: " + decodedToken.role);
        console.log("current user ID: " + decodedToken.id);

        // Redirect user based on their role
        setTimeout(() => {
          redirectUser(decodedToken.role);
        }, 1000);
      } else {
        notyf.error("Login failed. Please check your credentials.");
        console.error("Login failed.");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      notyf.error("An error occurred during login.");
    });
}

function redirectUser(role) {
  switch (role) {
    case "admin":
      window.location.href = "admin-page.html";
      break;
    case "user":
      window.location.href = "display-users.html";
      break;
    default:
      break;
  }
}

function addUser(name, username, email, phone) {
  return fetch(`${URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify({ name, username, email, phone }),
  })
    .then((response) => response.json())
    .then((data) => {
      // debugger;
      notyf.success("User added successfully.");
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchAllUsers() {
  return fetch(`${URL}/users`, {
    method: "GET",
    headers: {
      token: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // debugger;
      return data;
    });
}

function deleteUserById(userId) {
  console.log("userId: " + userId);
  fetch(`${URL}/user/${userId}`, {
    method: "DELETE",
    headers: {
      token: localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      debugger;
      notyf.success("User deleted successfully.");
      console.log("Delete response: ", data);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
}
