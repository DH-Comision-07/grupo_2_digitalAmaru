module.exports = (sequelize, DataTypes) => {

  let alias = "Category";
  let cols = {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  };

  let config = {
    tableName: "category",
    timestamps: false
  };

  let Category = sequelize.define(alias, cols, config);

  Category.associate = function (models) {
    Category.hasMany(models.Usuarios, {
      as: "usuarios",
      foreignKey: "categoria_id"
    });
  };

  return Category;
}
  
  