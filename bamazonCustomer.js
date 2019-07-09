var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "Apparatus987..",
    database: "bamazonDB"
  });

  connection.connect(function(err){
      if (err) throw err

      displayInventory();
  });

  var choiceArr = [];
  function displayInventory() {
      connection.query("SELECT * FROM products", function(err, res){
          if (err) throw err
        //   console.log("this is working");
          console.table(res);
          for (var i = 0; i < res.length; i++) {


            // console.log(res[i].itemID);
            
            choiceArr.push(res[i].itemID);
            
          }
        //this function will list the itemIDs from the products table
          
          question();
      });
  }

  function input(value) {
    var integer = Number.isInteger(parseFloat(value))
    var sign = Math.sign(value)

    if ( integer && (sign === 1)){
        return true;
        
        
    } else {
        return 'Please enter a valid number'
    } 
  }
  //the input function will make sure the numbers will not go negative
  function question(){
      inquirer.prompt([
        {
            message: "What product would you like to buy?",
            name: "product",
            choices: choiceArr,
            type: "list"
        }, {
            message: "How many units would you like to buy?",
            name: "quantity",
            type: "input",
            validate: input,
            filter: Number
        }


      ]).then(function(answer){

        var item = answer.product;
        var quantity = answer.quantity
          
          connection.query("SELECT stock_quantity, product_name, price FROM products WHERE itemID = " + answer.product, function(err, res){
            if (err) throw err
            
            // console.log(res[0]);
            
            if (res.length === 0) {
                console.log("ERROR: Choose an item");
                displayInventory()
            }else {
                var productInfo = res[0]
                
                // console.log(res[0].product_name);
                
                if (quantity <= productInfo.stock_quantity){
                    console.log(productInfo.product_name + " is in stock!");
                    console.log("\n");

                    var newQuantity = (productInfo.stock_quantity - quantity);
                    // console.log(newQuantity);
                    // console.log(item);
                    

                    

                    connection.query("UPDATE products SET stock_quantity = ? WHERE itemID =?", 
                    [newQuantity, item],
                    function(err, data){
                        if (err) throw err;

                        

                        console.log("Your order has been placed!");
                        console.log("Your total is $" + productInfo.price * quantity);
                        console.log("Thank you for shopping with Bamazon!");
                        console.log("-----------------------------------------");
                        console.log("To shop again with us please type 'node bamazonCustomer.js' into your command line again.");
                        
                        //This message will go off when your order has been place
                        

                        connection.end();
                        
                    });
                } else {
                  console.log("Sorry, their is not enough in stock for " + productInfo.product_name);
                  console.log("Your order cannot be placed");
                  console.log("Please select another item.");
                  console.log("\n");
                  //this message above will activate if bamazon does not have enough of the product in stock
                  setTimeout(function() {displayInventory() }, 3000)
                  //the timer will reset and the go back to the list of itemIDs
                }
            }
          })
      })
  } 