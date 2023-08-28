const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spec extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
      });
    }
  }
  Spec.init({
    title: DataTypes.STRING,
    hour: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Spec',
  });
  return Spec;
};
