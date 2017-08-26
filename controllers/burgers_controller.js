// Require the Burger model
var db = require("../models");

module.exports = function(app) {
  // Get all burgers currently in the database
  app.get("/", function(req, res) {

    db.Burger.findAll({
      include: [ db.Customer ],
    })
    .then(function(data) {

      var hbsObject = {
        burgers: data
      };
      // console.log(hbsObject);
      res.render('index', hbsObject);
    });
  });

  // Create a new burger
  app.post("/burgers", function(req, res) {

    db.Burger.create(req.body)
    .then(function(burger) {
      res.redirect("/");
    });
  });

  // Create a new customer name and update the devoured boolean
  app.put("/:id", function(req, res) {

    var customerName = req.body.customerName;

    // Create a new customer
    db.Customer.create({
      customer_name: customerName
    })
    .then(function(newCustomer) {
      //update database
      db.Burger.update(
        {
          devoured: true,
          CustomerId: newCustomer.id
        },
        {
          where: {
            id: req.params.id
          }
        }
      ).then(function(burger) {
        res.redirect('/');
      });
    })
  });
};
