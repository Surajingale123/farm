import { Router } from "express";
import {  saveOrders } from "../controller/Controller.js";
import { showOrders } from "../controller/Controller.js";
import { deleteOrder } from "../controller/Controller.js";
import { updateOrder } from "../controller/Controller.js";
//import { updateOrder } from "../controller/Controller.js";

const ordersRouter =Router();

//ordersRouter.post("/save",saveOrders);

ordersRouter.post('/save', saveOrders);

ordersRouter.get("/show",showOrders);
ordersRouter.delete("/delete/:username",deleteOrder);
ordersRouter.put("/update/:username",updateOrder);

export default ordersRouter;