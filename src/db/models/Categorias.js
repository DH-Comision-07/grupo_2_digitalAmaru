module.exports = (sequelize, DataTypes)=>{

  let alias = "Categorias";
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
      tableName: "categorias",
      timestamps: false,
    };

    let Categorias = sequelize.define(alias, cols, config);

    Categorias.associate =  (models) => {
    Categorias.belongsTo(models.Cursos, {as :"usuarios", foreignKey : "categoria_id"});
  }

    return Categorias;
  }
  
  