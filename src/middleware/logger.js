import colors from "colors";

const logger = (req, res, next) => {
  const methodColours = {
    GET: "green",
    POST: "yellow",
    PUT: "blue",
    DELETE: "red",
  };
  const color = methodColours[req.method] || "white";
  console.log(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`[color]);
  next();
};

export default logger;
