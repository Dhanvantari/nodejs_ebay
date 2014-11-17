var ejs = require("ejs");
var mysql = require('mysql');
//var poolObject = require('./routes/ConnectionPool.js');
function connect()
{
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database: 'eBay'
	});

	connection.connect();

	return connection;
}
function getProducts(callback)
{
	//var connection = poolObject.get();
	var connection=connect();

	var eQuery = "SELECT * from Product";
	connection.query(eQuery,function(eerr,eRows,eFields){
		if(eerr)
		{
			console.log("ERROR: " + eerr.message);
		}
		else
		{
			console.log("Products:" + JSON.stringify(eRows));
			callback(eerr, eRows);
		}

	});
	connection.end();
	//poolObject.release(connection);
}

function updateProduct(updateProduct,updateAttribute,updateValue)
{
	var connection=connect();

	var eQuery = "UPDATE Product SET "+updateAttribute+"='"+updateValue+"' WHERE ProductName='"+updateProduct+"'";

	connection.query(eQuery,function(eerr,eRows,eFields){
		if(eerr)
		{
			console.log("ERROR: " + eerr.message);
		}
		else
		{
			console.log("Products:" + JSON.stringify(eRows));
			
		}

	});
	connection.end();
}

function createProduct(ProductName,ProductCondition,ProductDetails,ProductCost,Category,AvailableQuantity)
{
	var connection=connect();
	var eQuery = "INSERT INTO Product (ProductName,ProductCondition,ProductDetails,ProductCost,Category,AvailableQuantity) VALUES ('"+ProductName+"', '"+ProductCondition+"', '"+ProductDetails+"', '"+ProductCost+"', '"+Category+"', '"+AvailableQuantity+"')";

	//var eQuery = "INSERT INTO Product (ProductName,ProductCondition,ProductDetails,ProductCost,Category,AvailableQuantity)) VALUES ('q', 'w', 'e', '0', 'r'); //('"+ProductName+"', '"+ProductCondition+"', '"+ProductDetails+"', '"+ProductCost+"', '"+Category+"', '"+AvailableQuantity+"')";
//INSERT INTO `eBay`.`Product` (`ProductName`, `ProductCondition`, `ProductDetails`, `ProductCost`, `Category`) VALUES ('q', 'w', 'e', '0', 'r');


	connection.query(eQuery,function(eerr,eRows,eFields){
		if(eerr)
		{
			console.log("ERROR: " + eerr.message);
		}
		else
		{
			console.log("Products:" + JSON.stringify(eRows));
			
		}

	});
	connection.end();
}

function displaySellers(callback)
{
	//var connection = poolObject.get();
	var connection=connect();

	var eQuery = "SELECT * from Seller";
	connection.query(eQuery,function(eerr,eRows,eFields){
		if(eerr)
		{
			console.log("ERROR: " + eerr.message);
		}
		else
		{
			console.log("Products:" + JSON.stringify(eRows));
			callback(eerr, eRows);
		}

	});
	connection.end();
	//poolObject.release(connection);
}

function displayCustomers(callback)
{
	//var connection = poolObject.get();
	var connection=connect();

	var eQuery = "SELECT * from Customer";
	connection.query(eQuery,function(eerr,eRows,eFields){
		if(eerr)
		{
			console.log("ERROR: " + eerr.message);
		}
		else
		{
			console.log("Products:" + JSON.stringify(eRows));
			callback(eerr, eRows);
		}

	});
	connection.end();
	//poolObject.release(connection);
}



exports.getProducts=getProducts;
exports.updateProduct=updateProduct;
exports.createProduct=createProduct;
exports.displayCustomers=displayCustomers;
exports.displaySellers=displaySellers;

