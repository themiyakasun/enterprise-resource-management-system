'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tenant, Role, Permission, Task }) {
      this.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });
      this.belongsToMany(Role, {
        through: 'User_Roles',
        foreignKey: 'userId',
        otherKey: 'roleId',
        as: 'roles',
      });
      this.belongsToMany(Permission, {
        through: 'Role_Permissions',
        foreignKey: 'userId',
        otherKey: 'permissionId',
        as: 'permissions',
      });
      User.hasMany(Task, { foreignKey: 'assignedTo', as: 'tasks' });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  );
  return User;
};
