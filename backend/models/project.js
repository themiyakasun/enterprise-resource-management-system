'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Tenant, Task }) {
      this.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });
      Project.hasMany(Task, {
        foreignKey: 'projectId',
        as: 'tasks',
        onDelete: 'CASCADE',
      });
    }
  }
  Project.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Project',
    }
  );
  return Project;
};
