import { Router } from "express";
import {
  getAllConnectionsByUser,
  getAllConnectionRequestsByUser,
  createConnectionRequest,
  deleteConnection,
  denyConnectionRequest,
  acceptConnectionRequest,
} from "@controllers/connectionController";

const router = Router();

router.get("/:user_id", getAllConnectionsByUser);
router.get("/requests/:user_id", getAllConnectionRequestsByUser);
router.post("/requests", createConnectionRequest);
router.put("/requests/:id", acceptConnectionRequest);
router.delete("/requests/:id", denyConnectionRequest);
router.delete("/:id", deleteConnection);

export default router;
