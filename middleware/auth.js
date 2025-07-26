const jwt = require('jsonwebtoken');

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('🔐 Incoming request to protected route');
    console.log('➡️ Required roles for this route:', roles);
    console.log('➡️ Authorization header:', authHeader);

    if (!authHeader?.startsWith('Bearer ')) {
      console.log('❌ No or invalid Authorization header');
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      console.log('✅ Token decoded successfully');
      console.log('👤 Decoded user:', user);
      console.log('👥 User role:', user.role);

      if (roles.length > 0 && !roles.includes(user.role)) {
        console.log(`🚫 Access denied for role '${user.role}', required: ${roles.join(', ')}`);
        return res.status(403).json({ error: 'Access denied' });
      }

      console.log('✅ Access granted');
      req.user = user;
      next();
    } catch (err) {
      console.log('❌ Token verification failed:', err.message);
      res.status(401).json({ error: 'Invalid token' });
    }
  };
};

module.exports = authMiddleware;
