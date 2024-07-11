module.exports = (sequelize, DataTypes)=>{

    let alias = "Usuarios";
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
          model: 'Categorias',
          key: 'sku',
        },
      },
    };
    
    let config = {
      tableName: "usuarios",
      timestamps: false
    };

   let  Usuario = sequelize.define(alias, cols, config);
  
    Usuario.associate = (models) => {
      Usuario.belongsTo(models.Cursos, {as:"cursos", foreignKey: "cursos_id"});
    }
  
    return Usuario;

  }

