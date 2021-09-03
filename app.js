var http = require('http');
var fs = require('fs');
var epm = require('./EndPointManager.js');

var CONFIG = JSON.parse(fs.readFileSync('config.json'));


let PORT = CONFIG.port;
let HOST = CONFIG.address;

let C_TYPE_HTML = {'Content-Type':'text/html'};
let C_TYPE_IMG_PNG = {'Content-Type':'image/png'};
let C_TYPE_CSS = {'Content-Type':'text/css'};
let C_TYPE_JS = {'Content-Type':'text/js'};
let C_TYPE_FONT = {'Content-Type':'font/otf'};
let C_TYPE_JSON = {'Content-Type':'application/json'};

/*End Points*/
{
    epm.addEndPoint('/', (res) => { getData('html/index.html', res, 200, C_TYPE_HTML) });
    epm.addEndPoint('/helper', (res) => { getData('html/questionsHelper.html', res, 200, C_TYPE_HTML) });
    epm.addEndPoint('/admin', (res) => { getData('html/questionsAdmin.html', res, 200, C_TYPE_HTML) });
    epm.addEndPoint('/index', (res) => { getData('html/index.html', res, 200, C_TYPE_HTML) });
    epm.addEndPoint('/favicon.ico', (res) => { getData('assets/player.png', res, 200, C_TYPE_IMG_PNG) });
    epm.addEndPoint('/assets/MinecraftFont.otf', (res) => { getData('assets/MinecraftFont.otf', res, 200, C_TYPE_FONT) });
    epm.addEndPoint('/assets/background.png', (res) => { getData('assets/background.png', res, 200, C_TYPE_IMG_PNG) });
    epm.addEndPoint('/css/index.css', (res) => { getData('css/index.css', res, 200, C_TYPE_CSS) });
    epm.addEndPoint('/css/customFonts.css', (res) => { getData('css/customFonts.css', res, 200, C_TYPE_CSS) });
    epm.addEndPoint('/css/selectionButton.css', (res) => { getData('css/selectionButton.css', res, 200, C_TYPE_CSS) });
    epm.addEndPoint('/css/customScroll.css', (res) => { getData('css/customScroll.css', res, 200, C_TYPE_CSS) });
    epm.addEndPoint('/css/customButton.css', (res) => { getData('css/customButton.css', res, 200, C_TYPE_CSS) });
    epm.addEndPoint('/css/customResize.css', (res) => { getData('css/customResize.css', res, 200, C_TYPE_CSS) });
    epm.addEndPoint('/assets/XeroBanner.png', (res) => { getData('assets/XeroBanner.png', res, 200, C_TYPE_IMG_PNG) });
    epm.addEndPoint('/js/utils.js', (res) => { getData('js/utils.js', res, 200, C_TYPE_JS) });
    epm.addEndPoint('/js/populate.js', (res) => { getData('js/populate.js', res, 200, C_TYPE_JS) });
    epm.addEndPoint('/js/helperPageData.js', (res) => { getData('js/helperPageData.js', res, 200, C_TYPE_JS) });
}

/*API CALL*/
{
    epm.addEndPoint('/api/pagedata/helperData', (res) => { writeJSON(res, fs.readFileSync('HelperPageData.json')) });

}

/*Helper function to get a file and write it to the output stream*/
function getData(dataPath, res, resCode, resOptions){
    if(!dataPath) throw 'dataPath was not given!';
    if(!res) throw 'responce object was not given!';
    if(!resCode) resCode = 200;
    if(!resOptions) resOptions = { };
    fs.readFile(dataPath, (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(resCode, resOptions);
            res.end(data);
        }
    });
}

function writeJSON(res, jsonData){
    res.writeHead(200, C_TYPE_JSON);
    res.end(jsonData);
}

/*Main Server part for acception requests and getting the corresponding end point.*/
http.createServer((req, res) => {
    if(epm.hasEndPoint(req.url)){
        epm.getEndpoint(req.url)(res);
    }else{
        console.log(req.url);
        epm.getEndpoint('/')(res);
    }
}).listen(PORT, HOST, () => {
    console.log('Server is running at http://%s:%d/', HOST, PORT);
});