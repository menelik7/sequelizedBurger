module.exports = function(sequelize, DataTypes) {
  // Define the Customer sequelize model
  var Customer = sequelize.define("Customer", {
    // Giving the Customer model a name of type STRING
    customer_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Customer.associate = function(models) {  
    // Associating Customer with Burger
    // Customer may consume many burgers
    Customer.hasMany(models.Burger, {
      // When a burger is deleted, also delete any associated customers
      onDelete: "cascade"
    });
  }

  return Customer;
};