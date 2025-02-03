import { Router } from "express";
import {
  getAllConnectionsByUser,
  getAllConnectionRequestsByUser,
  createConnectionRequest,
  deleteConnection,
  denyConnectionRequest,
  acceptConnectionRequest,
} from "@controllers/connectionController";
// import { authenticateToken } from "@middlewares/authMiddleware";

/**
 * Define API endpoints and link them to their respective connection controllers.
 */

const router = Router();

router.get(
  "/:user_id",
  // authenticateToken,
  getAllConnectionsByUser
);

router.get(
  "/requests/:user_id",
  // authenticateToken,
  getAllConnectionRequestsByUser
);

router.post(
  "/requests",
  //  authenticateToken,
  createConnectionRequest
);

router.put(
  "/requests/:id",
  //  authenticateToken,
  acceptConnectionRequest
);

router.delete(
  "/requests/:id",
  //  authenticateToken,
  denyConnectionRequest
);

router.delete(
  "/:id",
  //  authenticateToken,
  deleteConnection
);

export default router;
