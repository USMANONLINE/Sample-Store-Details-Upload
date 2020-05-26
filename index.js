const fs = require('fs'),
    path = require('path'),
    express = require('express'),
    formidable = require('formidable');

const Product = require('./database_config');

const app = express(),
    folder = path.join(__dirname + 'files');

if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.static('files'));
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
    res.render('main.pug');
});

app.get('/addproduct', function (req, res) {
    res.render('addproduct.pug');
});

app.get('/product/:productid', function (req, res) {
    Product.Product.findOne({ where: { id: req.params.productid}}).then(product => {
        res.render('product.pug', { product: product } )
    })
});

app.get('/store', function (req, res) {
    Product.Product.findAll().then(products => {
        res.render('store.pug', { products: products } )
    })
})

app.post('/addproduct', function (req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.multiples = true;
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/files/' + file.name;
    });
    form.parse(req, (err, fields, files) => {
        const imgAddress = []
        for (let index = 0; index < files.image.length; index++) {
            imgAddress[index] = files.image[index].name
        }   

        Product.Product.create({
            productName: fields.name,
            productPrice: fields.price,
            productColor: fields.color,
            productDetails: fields.details,
            productQuantityAvailable: fields.quantity, 
            productImg1: imgAddress[0],
            productImg2: imgAddress[1],
            productImg3: imgAddress[2]
        }).then(response => {
            res.redirect(301, '/')
        }).catch(error => {
            console.log(error)
        });
    });
})

app.listen(app.get('port'));