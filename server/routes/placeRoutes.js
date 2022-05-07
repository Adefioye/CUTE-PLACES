import express from "express";

import {
  getPlace,
  getPlaces,
  createPlace,
  updatePlace,
  deletePlace,
  likePlace,
  getPlacesBySearch,
  commentPlace,
} from "../controllers/placeControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPlaces);

router.get("/search", getPlacesBySearch);

router.get("/:id", getPlace);

router.post("/", auth, createPlace);

router.patch("/:id", auth, updatePlace);

router.delete("/:id", auth, deletePlace);

router.patch("/:id/likePlace", auth, likePlace);

router.post("/:id/commentPlace", auth, commentPlace);

export default router;
