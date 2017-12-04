const express = require('express');
const config = require('./config/index');

const port = process.env.PORT || config.build.port;

var app = express();
var router = express.Router();
router.get('/', function (req, res, next) {
    req.url = 'index.html';
    next();
});



var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req, res) {
    res.json({
        errno: 0,         // 数据正常为0
        data: seller
    });
});
apiRoutes.get('/goods', function (req, res) {
    res.json({
        errno: 0,         // 数据正常为0
        data: goods
    });
});
apiRoutes.get('/ratings', function (req, res) {
    res.json({
        errno: 0,         // 数据正常为0
        data: ratings
    });
});

app.use('/api', apiRoutes);
app.use(express.static('./dist'));


module.exports = app.listen(port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port || 'http://192.168.1.101:' + port
    console.log('Listening at ' + uri + '\n')
});


