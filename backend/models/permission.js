'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, User }) {
      this.belongsToMany(Role, {
        through: 'Role_Permissions',
        foreignKey: 'permissionId',
        otherKey: 'roleId',
        as: 'roles',
      });
      this.belongsToMany(User, {
        through: 'User_Permissions',
        foreignKey: 'permissionId',
        otherKey: 'userId',
        as: 'users',
      });
    }
  }
  Permission.init(
    {
      resource: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Permission',
    }
  );
  return Permission;
};
