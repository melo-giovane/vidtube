import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// common middleware
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//log das reqs
// app.use((req, res, next) => {
//   const start = Date.now();

//   res.on("finish", () => {
//     const duration = Date.now() - start;
//     console.log(
//       `>> ${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms`
//     );
//   });

//   next();
// })

// import routes
import healtcheckRouter from "./routes/healthcheck.routes.js"
import userRouter from "./routes/user.routes.js"
import { errorHandler } from "./middlwares/error.middlewares.js";

// routes
app.use("/api/v1/healthcheck", healtcheckRouter)
app.use("/api/v1/users", userRouter)
app.use(errorHandler)


export { app };


