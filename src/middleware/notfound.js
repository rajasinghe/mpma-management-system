const notFound = (req, res, next) => {
  console.log("path not found");
  const error = new Error("unable to find the resource");
  error.status = 404;
  next(error);
};

export default notFound;
