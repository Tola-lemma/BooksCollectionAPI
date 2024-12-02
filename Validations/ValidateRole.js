// middlewares/validateRole.js
const validRoles = [
      'admin',
      'user',
      'superadmin',
    ];
    
    const validateRole = (req, res, next) => {
      const { role } = req.body;
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role specified.' });
      }
      next();
    };
    
    module.exports = validateRole;
    