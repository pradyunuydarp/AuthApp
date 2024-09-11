const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
const { StringDecoder } = require("string_decoder");
const cors = require("cors");
const winston = require('winston');

const PORT = 5001;
const USERS_FILE = path.join(__dirname, "People.json");

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console()
  ]
});
const readUsers = () => {
  const usersData = fs.readFileSync(USERS_FILE);
  return JSON.parse(usersData);
};
const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};
const handleCors = (res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};
const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") {
    handleCors(res);
    res.writeHead(204);
    res.end();
    return;
  }
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method.toUpperCase();
  if (method === "POST") {
    let buffer = "";
    const decoder = new StringDecoder("utf-8");

    req.on("data", (chunk) => {
      buffer += decoder.write(chunk);
    });

    req.on("end", () => {
      buffer += decoder.end();
      handleCors(res);
      const body = JSON.parse(buffer);

      if (path === "/create-account") {
        const { username, password, name } = body;
        const users = readUsers();

        const userExists = users.find((user) => user.username === username);

        if (userExists) {
          logger.warn(`Attempted to register an existing user: ${username}`);
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "User already exists" }));
        } else {
          users.push({ username, password, name });
          writeUsers(users);

          logger.info(`User registered: ${username}`);
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Account created successfully" }));
        }
      } else if (path === "/login") {
        const { username, password } = body;
        const users = readUsers();

        const user = users.find(
          (user) => user.username === username && user.password === password
        );

        if (!user) {
          logger.warn(`Failed login attempt for user: ${username}`);
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Invalid credentials" }));
        } else {
          logger.info(`User logged in: ${username}`);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Login successful", name: user.name }));
        }
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Not Found" }));
      }
    });

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
});

server.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
