import express from "express";
import { publicRaoute } from "../route/public-api.js";
import { userRoute } from "../route/api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
web.use(publicRaoute);
web.use(userRoute);
web.use(errorMiddleware);
