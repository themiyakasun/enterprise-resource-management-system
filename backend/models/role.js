'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tenant, User, Permission }) {
      this.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });
      this.belongsToMany(User, {
        through: 'User_Roles',
        foreignKey: 'roleId',
        otherKey: 'userId',
        as: 'users',
      });

      this.belongsToMany(Permission, {
        through: 'Role_Permissions',
        foreignKey: 'roleId',
        otherKey: 'permissionId',
        as: 'permissions',
      });
    }
  }
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'roles',
      modelName: 'Role',
    }
  );
  return Role;
};
