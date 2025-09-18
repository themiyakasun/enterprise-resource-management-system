'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tenant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Role }) {
      this.hasMany(User, { foreignKey: 'tenantId', as: 'users' });
      this.hasMany(Role, { foreignKey: 'tenantId', as: 'roles' });
    }
  }
  Tenant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'tenants',
      modelName: 'Tenant',
    }
  );
  return Tenant;
};
