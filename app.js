var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.bodyParser());

var title = 'EJS template with Node.JS';
var data = 'Data from node';

var ejs = require('ejs');


app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/Product', function(req, res){
	home.getProducts(function(Err,Results){

		if(Err)
		{
			throw Err;
			console.log("Query not executed!");
			return;
		}
		else
		{
			ejs.renderFile('./views/product.ejs',
					{products : Results,message : "",selected:Results[0].productName},
					function(err, result) {
						if (!err) {
							res.end(result);
						}
						else {
							console.log(err);
						}
					});
		}
	});	
});
app.post('/updateProduct', function (req, res) {
home.updateProduct(req.param('updateProduct'),req.param('updateAttribute'),req.param('updateValue'));
res.render('index', { title: 'Updated!' ,message: 'Update Successful.'});
});
app.post('/createProduct', function (req, res) {
	if(!req.param('ProductName') ||!req.param('ProductCost'))
	{
		res.statusCode = 400;
		console.log('Product name and product cost is compulsory');
		res.send('Product name and product cost is compulsory');
		//return res.render('product',{
			//message:'Error 400: Product name and product cost is compulsory'});
	}
	else
	{
	//home.createProduct(req.param('ProductName'),req.param('ProductCondition'),req.param('ProductDetails'),req.param('ProductCost'),req.param('Category'),req.param('AvailableQuantity'),req.param('SellerMembershipNo'),req.param('BidStartTime'),req.param('BidEndTime'),req.param('AuctionFlag'));
 home.createProduct(req.param('ProductName'),req.param('ProductCondition'),req.param('ProductDetails'),req.param('ProductCost'),req.param('Category'),req.param('AvailableQuantity'));
	res.render('index', { title: 'Updated!' ,message: 'Update Successful.'});
	}
	});

app.get('/displaySellers', function (req, res) {
	home.displaySellers(function(Err,Results){

		if(Err)
		{
			throw Err;
			console.log("Query not executed!");
			return;
		}
		else
		{
			ejs.renderFile('./views/Sellers.ejs',
					{sellers : Results,message : ""},
					function(err, result) {
						if (!err) {
							res.end(result);
						}
						else {
							console.log(err);
						}
					});
		}
	});	
	});
app.get('/displayCustomers', function (req, res) {
	home.displayCustomers(function(Err,Results){

		if(Err)
		{
			throw Err;
			console.log("Query not executed!");
			return;
		}
		else
		{
			ejs.renderFile('./views/customers.ejs',
					{customers : Results,message : ""},
					function(err, result) {
						if (!err) {
							res.end(result);
						}
						else {
							console.log(err);
						}
					});
		}
	});	
	});
//app.get('/', home.main_page);
//app.post('/afterSignUp', home.afterSignUp);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
