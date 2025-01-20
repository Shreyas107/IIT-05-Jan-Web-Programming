const fs = require("fs");

// Writing to a file asynchronously
const content = "Some content to write to the file";
fs.writeFile("example.txt", content, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("File written successfully");
  }
});

// Reading a file asynchronously
fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("File content:", data);
  }
});

// Appending to a file asynchronously
const additionalContent = "\nAdditional content";
fs.appendFile("example.txt", additionalContent, "utf8", (err) => {
  if (err) {
    console.error("Error appending to file:", err);
  } else {
    console.log("Content appended successfully");
  }
});

// // Reading the contents of a directory asynchronously
// fs.readdir(".", (err, files) => {
//   if (err) {
//     console.error("Error reading directory:", err);
//   } else {
//     console.log("Directory contents:", files);
//   }
// });

// Deleting a file asynchronously
fs.unlink("example.txt", (err) => {
  if (err) {
    console.error("Error deleting file:", err);
  } else {
    console.log("File deleted successfully");
  }
});
