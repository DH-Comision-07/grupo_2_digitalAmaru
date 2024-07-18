  module.exports = (sequelize, DataTypes)=>{

     let alias = "Product";
     let cols = {

      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      name_teacher: {
        type: DataTypes.STRING,
        allowNull: false
      }
     };
    
    let config = {
      tableName: "product",
      timestamps: false
    };
    
    let Product = sequelize.define(alias, cols, config);

  
    return Product;
  }