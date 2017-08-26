module.exports = function(sequelize, DataTypes) {
  // Define the Burger sequelize model
  var Burger = sequelize.define("Burger", { 
    // Giving the Burger model a name of type STRING
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  Burger.associate = function(models) {
    // Associating Burger with Customer
    // A burger may be consumed only by one customer
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  }
  
  return Burger;
};