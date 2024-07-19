module.exports = (sequelize, DataTypes) => {

  let alias = "Usuarios";
  let cols = {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoria_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    tableName: "usuarios",
    timestamps: false
  };

  let Usuarios = sequelize.define(alias, cols, config);

  Usuarios.associate = function (models) {
    Usuarios.belongsTo(models.Category, {
      as: "category",
      foreignKey: "categoria_id"
    });
  };

  return Usuarios;
}