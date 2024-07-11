// models/category.js
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    }, {
      tableName: 'category',
      timestamps: false,
    });

    Category.associate =  models => {
        Category.belongsTo(models.Cursos, {as :'cursos', foreignKey : 'cursosId'});
    };

    return Category;
  };
  