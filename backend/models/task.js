'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Project, User }) {
      this.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });
      this.belongsTo(User, { foreignKey: 'assignedTo', as: 'user' });
    }
  }
  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('todo', 'in_progess', 'done'),
        defaultValue: 'todo',
      },
      dueDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Task',
    }
  );
  return Task;
};
