// 1. Import Exprerss
import "./env.js";

import express from "express";
import cors from "cors";

import productRouter from "./src/features/product/product.routes.js";
import authRouter from "./src/features/auth/auth.routes.js"
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import { checkRole } from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import mongoose from "mongoose";

// 2. Create Server
const server = express();

// load all the environment variables in application

var corsOptions = {
  origin: "http://localhost:5500",
};
server.use(cors(corsOptions));


server.use(express.json());
server.use(loggerMiddleware);

server.use( "/api/products", jwtAuth, checkRole(['User', 'Admin', 'Moderator']), productRouter);
server.use("/api/cartItems", jwtAuth, checkRole(['User', 'Admin', 'Moderator']), cartRouter);
server.use("/api/auth", authRouter);
server.use("/api/order/", jwtAuth, checkRole(['User', 'Admin', 'Moderator']), orderRouter);

// 3. Default request handler
server.get("/", (req, res) => {
  res.send("Welcome to Ecommerce APIs");
});
server.get('/api/admin', jwtAuth, checkRole(['Admin']), (req, res) => {
  res.send('Welcome Admin!');
});

server.get('/api/moderator', jwtAuth, checkRole(['Moderator']), (req, res) => {
  res.send('Welcome Moderator!');
});

server.get('/api/user', jwtAuth, checkRole(['User', 'Admin', 'Moderator']), (req, res) => {
  res.send('Welcome User!');
});

// Error handler middleware
server.use((err, req, res, next) => {
  console.log(err);
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).send(err.message);
  }
  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }

  // server errors.
  res.status(500).send("Something went wrong, please try later");
});

// 4. Specify port.
server.listen(3200, () => {
  console.log("Server is running at 3200");
  connectUsingMongoose();
});
