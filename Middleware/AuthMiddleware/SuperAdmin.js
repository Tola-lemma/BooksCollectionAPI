const SuperAdminMiddleware = (req, res, next) => {
      if (req.user.role !== 'superadmin') {
          return res.status(403).json({ message: 'Access denied. superadmin only!' });
      }
      next();
  };
  
module.exports = SuperAdminMiddleware;
  