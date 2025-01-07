import { Router } from "express";
import { index, show, store, update } from "../Controllers/TestController.js";

const router = Router();

router.get("", index);

router.post("", store);

router.get(":id", show);

router.put(":id", update);

export default router;
