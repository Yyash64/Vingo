import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { addItem, editItem } from "../controllers/item.controller.js";

const itemRouter = express.Router();
itemRouter.get("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

export default itemRouter;
