const { User, Role, Permission, Tenant } = require('../models');

const checkPermission = (requiredResouce, action) => {
  return async (req, res, next) => {
    try {
      const userId = req.user.id;

      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Role,
            as: 'roles',
            through: { attributes: [] },
            include: [
              {
                model: Permission,
                as: 'permissions',
                through: { attributes: [] },
              },
            ],
          },
          {
            model: Permission,
            as: 'permissions',
            through: { attributes: [] },
          },
          {
            model: Tenant,
            as: 'tenant',
          },
        ],
      });

      if (!user) {
        return res.status(403).json({ message: 'User not found' });
      }

      const userPermissions = user.permissions || [];

      const rolePermissions =
        user.roles?.flatMap((role) => role.permissions) || [];

      const allPermissions = [...userPermissions, ...rolePermissions];

      const hasPermission = allPermissions.some(
        (perm) => perm.resource === requiredResouce && perm.action === action
      );

      if (!hasPermission) {
        return res
          .status(403)
          .json({ message: 'You do not have permission for this action' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
};

module.exports = checkPermission;
