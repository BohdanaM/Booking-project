import jsonServer from "json-server";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(express.json());

server.get("/hotels", (req, res) => {
  const cityQuery = req.query.city?.toLowerCase();

  if (!cityQuery) {
    return res.json(router.db.get("hotels").value());
  }

  const filteredHotels = router.db
    .get("hotels")
    .value()
    .filter((hotel) => hotel.city?.toLowerCase() === cityQuery);

  if (filteredHotels.length === 0) {
    return res
      .status(404)
      .json({ message: `No hotels found for city: "${cityQuery}"` });
  }

  res.json(filteredHotels);
});

server.use(router);

server.listen(5001, () => {
  console.log("JSON Server is running on port 5001");
});
