  module.exports = (sequelize, DataTypes)=>{

     let alias = "Product";
     let cols = {

      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      categoria_sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'User',
          key: 'sku',
        },
      },
     };
    
    let config = {
      tableName: "product",
      timestamps: false
    };
    
    let Product = sequelize.define(alias, cols, config);

    Product.associate =  function (models) {
    Product.belongsTo(models.User, {
        as :"user", 
        foreignKey : "categoria_id"});
    }
  
    return Product;
  }