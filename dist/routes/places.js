"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const httpError_1 = __importDefault(require("../models/httpError"));
const DUMMY_PLACES = [
    {
        id: "p1",
        title: "Empire State Building",
        description: "One of the most famous sky scrapers in the world!",
        location: {
            lat: 40.7484474,
            lng: -73.9871516,
        },
        address: "20 W 34th St, New York, NY 10001",
        creator: "u1",
    },
];
const placeRouter = (0, express_1.Router)();
placeRouter.get("/:pid", (req, res, next) => {
    const placeId = req.params.pid;
    const place = DUMMY_PLACES.find((place) => place.id === placeId);
    if (!place) {
        const error = new httpError_1.default("Could not find a place for the provided id.", 404);
        return next(error);
    }
    res.json({ place });
});
placeRouter.get("/user/:uid", (req, res, next) => {
    const userId = req.params.pid;
    const place = DUMMY_PLACES.find((place) => place.creator === userId);
    if (!place) {
        const error = new httpError_1.default("Could not find a place for the provided userId.", 404);
        return next(error);
    }
    res.json({ place });
});
exports.default = placeRouter;
//# sourceMappingURL=places.js.map