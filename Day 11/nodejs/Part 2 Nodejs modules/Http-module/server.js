var http = require("http");

// console.log(http);

// creates an HTTP server that listens for requests.
// The callback function takes two arguments: request and response.
// request contains information about the incoming request, such as the URL.
// response is used to send back data to the client.
var server = http.createServer((request, response) => {
  console.log("You asked for: ");
  console.log(request.url);

  if (request.url == "/users") {
    var users = [
      { No: 1, Name: "Akshita", Address: "Pune" },
      { No: 2, Name: "Sameer", Address: "Mumbai" },
      { No: 3, Name: "Mahesh", Address: "Nagar" },
      { No: 4, Name: "Amit", Address: "Pune" },
      { No: 5, Name: "Nilesh", Address: "Pune" },
    ];
    var usersInStringFormat = JSON.stringify(users);

    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.write(usersInStringFormat);
    response.end();

    // response.write("Mahesh, Nilesh, Amit, Rohan");
    // response.end();
  }
  if (request.url == "/demo") {
    response.setHeader("Content-Type", "text/html");
    var completeHTML = `<html>
                                <head><title>Test</title></head>
                                <body>
                                    <h1>Hello from Node</h1>
                                </body>
                            </html>`;
    response.write(completeHTML);
    response.end();
  } else {
    response.setHeader("Content-Type", "text/plain");
    response.write("We dont serve what you asked for");
    response.end();
  }
});

server.listen(9898, () => {
  console.log("Server started listening @9898");
});

// console.log(server);
