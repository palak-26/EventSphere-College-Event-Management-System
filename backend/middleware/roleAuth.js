// backend/middleware/roleAuth.js
module.exports = function requireRole(...allowedRoles) {
  return function (req, res, next) {
    // req.user must be set by auth middleware (authController.authMiddleware)
    if (!req.user) return res.status(401).json({ msg: 'Not authenticated' });
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden: insufficient role' });
    }
    next();
  };
};
