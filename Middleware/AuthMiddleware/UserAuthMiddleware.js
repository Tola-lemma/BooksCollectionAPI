const UserMiddleware = (req, res, next) => {
      if (req.user.role !== 'user') {
          return res.status(403).json({ message: 'Access denied. Users only!' });
      }
      next();
  };
  
module.exports = UserMiddleware;
  