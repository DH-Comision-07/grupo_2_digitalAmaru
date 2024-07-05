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
    Category.associate = function (models) {
        Category.hasMany(models.Usuario, {
            as : 'categorias',
            foreignKey : 'categoria_sku'
        })
    }
    return Category;
  };
  