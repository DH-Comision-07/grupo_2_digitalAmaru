module.exports = (sequelize, DataTypes)=>{

    let alias = "User";
    let cols = {

      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      apellido: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },
      mail: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true,
      },
      contraseña: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      categoria_sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Category',
          key: 'sku',
        },
      },
    };
    
    let config = {
      tableName: "user",
      timestamps: false
    };

   let  User = sequelize.define(alias, cols, config);
  
    User.associate = function (models) {
      User.belongsTo(models.Product, {
        as:"product",
        foreignKey: "name_teacher"});
    }
  
    return User;

  }

