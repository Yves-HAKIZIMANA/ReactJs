const jwt = require("jsonwebtoken");
const createError = require("./error");


const checkAuth = (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) {
    return next(createError({ status: 401, message: "Unauthorized" }));
  }
  try {
    const decoded = jwt.verify(access_token, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return next(
      createError({
        status: err.name === "JsonWebTokenError" ? 401 : 500,
        message: err.message,
      })
    );
  }
};

module.exports = checkAuth;
