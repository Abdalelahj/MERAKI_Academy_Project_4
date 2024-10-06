const author = (string) => {
  return (req, res, next) => {
    const perm = req.token.permissions;
    if (perm.includes(string)) {
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: `Unauthorized`,
      });
    }
  };
};

module.exports = author;
