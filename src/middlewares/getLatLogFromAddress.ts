import axios from "axios";

const getLatLogFromAddress = async (req, res, next) => {
  const { address } = req.body;
  console.log("Address received in middleware:", address);
  if (!address) {
    //throw new Error("Model not found", 404);
    next(
      new Error("Address not found in Request body, please provide address")
    );
  } else {
    try {
      const url = `https://nominatim.openstreetmap.org/search`;
      const response = await axios.get(url, {
        params: {
          q: address,
          format: "json",
          addressdetails: 1,
          limit: 1,
        },
        headers: {
          "User-Agent": "Pulse/1.0",
        },
      });

      if (response.data.length === 0) {
        return res.status(404).json({
          error: "Coordinates not found in the given Address",
        });
      }
      const { lat, lon } = response.data[0];
      console.log("Extracted Latitude and Longitude:", lat, lon);
      req.body.latitude = lat;
      req.body.longitude = lon;
      next();
    } catch (error) {
      next(error);
    }
  }
};

export { getLatLogFromAddress };
