// const express = require("express");
// const fs = require("fs");
// const path = require("path");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const winston = require('winston');

// const app = express();
// const PORT = 5001;
// const USERS_FILE = path.join(__dirname, "People.json");

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({ filename: 'combined.log' }),
//     new winston.transports.Console()
//   ]
// });

// app.use(cors({
//   origin: 'http://localhost:5173',
// }));

// app.use(bodyParser.json());
// const readUsers = () => {
//   const usersData = fs.readFileSync(USERS_FILE);
//   return JSON.parse(usersData);
// };
// const writeUsers = (users) => {
//   fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
// };
// app.post("/create-account", (req, res) => {
//   const { username, password, name } = req.body;
//   const users = readUsers();

//   const userExists = users.find((user) => user.username === username);

//   if (userExists) {
//     logger.warn(`Attempted to register an existing user: ${username}`);
//     return res.status(400).json({ message: "User already exists" });
//   }

//   users.push({ username, password, name });
//   writeUsers(users);

//   logger.info(`User registered: ${username}`);
//   res.status(201).json({ message: "Account created successfully" });
// });
// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   const users = readUsers();

//   const user = users.find(
//     (user) => user.username === username && user.password === password
//   );

//   if (!user) {
//     logger.warn(`Failed login attempt for user: ${username}`);
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   logger.info(`User logged in: ${username}`);
//   res.status(200).json({ message: "Login successful", name: user.name });
// });

// app.listen(PORT, () => {
//   logger.info(`Server is running on http://localhost:${PORT}`);
// });
