module.exports = (sequelize, DataTypes)=>{

  let alias = "Categories";
  let cols = {

      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
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

    Category.associate =  function (models) {
    Category.belongsTo(models.Product, {
      as :"user", 
      foreignKey : "categoria_id"});
  }

    return Category;
}
  
  