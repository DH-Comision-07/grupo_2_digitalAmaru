module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      sku: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
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
    }, {
      tableName: 'usuarios',
      timestamps: false,
    });
  
    Usuario.associate = models => {
      Usuario.belongsTo(models.Category, {as:"categories", foreignKey: 'categoria_sku'});
    };
  
    return Usuario;
  };