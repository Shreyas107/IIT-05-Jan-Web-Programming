const os = require("os");

// Get the hostname of the operating system
const hostname = os.hostname();
console.log("Hostname:", hostname);

// Get the operating system platform
const platform = os.platform();
console.log("Platform:", platform);

// Get the operating system CPU architecture
const arch = os.arch();
console.log("Architecture:", arch);

// Get the amount of free system memory in bytes
const freeMemory = os.freemem();
console.log("Free Memory:", freeMemory);

// Get the total amount of system memory in bytes
const totalMemory = os.totalmem();
console.log("Total Memory:", totalMemory);

// Get the system uptime in seconds
const uptime = os.uptime();
console.log("System Uptime:", uptime, "seconds");

// Get information about each CPU/core installed
const cpus = os.cpus();
console.log("CPUs:", cpus);

// Get the network interfaces
const networkInterfaces = os.networkInterfaces();
console.log("Network Interfaces:", networkInterfaces);
