var express = require('express');
var socket_io = require('socket.io');
var http = require('http');
var unirest = require('unirest');
var events = require('events');
var app = express();

app.use(express.static('public'));

var server = http.Server(app);

var io = socket_io(server);

var getFromApi = function(search_term) {
    //console.log(search_term);
    var emitter = new events.EventEmitter();
    unirest.get('https://crossorigin.me/http://api.walmartlabs.com/v1/items/12417832?apiKey=25y2ah3f8nkvn2hkfbxp5dpq&lsPublisherId=nnamdiwill&format=json')
        .end(function(response) {
            //console.log('server js api call results = ', response.body);
            if (response.ok) {
                emitter.emit('end', response.body);
            }
            else {
                emitter.emit('error', response.code);
            }
        });
    console.log(emitter);
    return emitter;
};

var validateProductSpecs = function(productSpec) {
    if (productSpec != '') {
        return productSpec;
    }
    else {
        return "-";
    }
};

//globals for setting related product id and product
var product = [];

//GET Route - search by name
app.use(express.static('public'));

app.get('/search/:name', function(req, res) {
    // API call
    var searchReq = getFromApi(req.params.name);

    searchReq.on('end', function(item) {
        //set the related product to make the html work
        product.name = validateProductSpecs(item.name);
        product.categoryPath = validateProductSpecs(item.categoryPath);
        product.longDescription = validateProductSpecs(item.longDescription);
        product.brandName = validateProductSpecs(item.brandName);
        product.largeImage = validateProductSpecs(item.largeImage);
        product.productTrackingUrl = validateProductSpecs(item.productTrackingUrl);
        //console.log(product);

        if (product.length != 0) {
            res.json(product);
        }
    });

    //error handling
    searchReq.on('error', function(code) {
        res.sendStatus(code);
    });
});



//express http listener
app.listen(process.env.PORT || 8080);
