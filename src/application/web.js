import express from "express";
import { publicRoute } from "../route/public-api.js";
import { userRoute } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
web.use(publicRoute);
web.use(userRoute);
web.use(errorMiddleware);