import { Router } from "express";
import { index, remove, show, store, update } from "../Controllers/TestController.js";

const router = Router();

router.get("", index);

router.post("", store);

router.get("/:id", show);

router.put("/:id", update);

router.delete("/:id", remove);

export default router;
