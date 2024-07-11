module.exports = (sequelize, DataTypes) => {
    const Cursos = sequelize.define('Cursos', {
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
          model: 'Usuario',
          key: 'sku',
        },
      },
    }, 
    
    {
      tableName: 'cursos',
      timestamps: false,
    });
  
    Cursos.associate = models => {
      Cursos.belongsTo(models.Usuario, {as:"usuarios", foreignKey: 'usuariosId'});
    };
  
    return Cursos;
  };