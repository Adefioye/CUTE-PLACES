import mongoose from "mongoose";

import CutePlace from "../models/cutePlace.js";

export const getPlace = async (req, res) => {
  try {
    const { id } = req.params;

    const place = await CutePlace.findById(id);

    res.status(200).json(place);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPlaces = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 6;
    const startIndex = (Number(page) - 1) * LIMIT;
    const total = await CutePlace.countDocuments({});

    const places = await CutePlace.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: places,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / 6),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPlacesBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const places = await CutePlace.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json(places);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPlace = async (req, res) => {
  const place = req.body;

  try {
    const newPlace = new CutePlace({
      ...place,
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

    await newPlace.save();

    res.status(201).json(newPlace);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const updatePlace = async (req, res) => {
  const { id } = req.params;
  const place = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No place with that id");
  }

  const updatedPlace = await CutePlace.findByIdAndUpdate(id, place, {
    new: true,
  });

  res.json(updatedPlace);
};

export const deletePlace = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No place with that id" });
  }

  await CutePlace.findByIdAndRemove(id);

  res.json({ message: "Place deleted successfully!" });
};

export const likePlace = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No place with that id" });
  }

  const place = await CutePlace.findById(id);

  const index = place.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    place.likes.push(req.userId);
  } else {
    place.likes = place.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPlace = await CutePlace.findByIdAndUpdate(id, place, {
    new: true,
  });

  res.json(updatedPlace);
};

export const commentPlace = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body;

  try {
    const place = await CutePlace.findById(id);

    place.comments.push(value);

    const updatedPlace = await CutePlace.findByIdAndUpdate(id, place, {
      new: true,
    });

    res.json(updatedPlace);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
