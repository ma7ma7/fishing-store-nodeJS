// ----> Import required Modules
const http = require('http');
const fs = require('fs');
const url = require('url');

// ----> Read files
const cards_template = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const overview_template = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const products_template = fs.readFileSync(`${__dirname}/templates/template-products.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data)


// Function 

const templateReplace = (template, product) => {
    let output = template.replace(/{%TITLE%}/g, product.productName)
    output = output.replace(/{%IMAGE%}/g, product.image)
    output = output.replace(/{%QUANTITY%}/g, product.quantity)
    output = output.replace(/{%PRICE%}/g, product.price)
    output = output.replace(/{%DISCOUNT%}/g, product.discount)
    output = output.replace(/{%ID%}/g, product.id)
    output = output.replace(/{%DESCRIPTION%}/g, product.description)
    
    return output
}

const server = http.createServer((req, res) => {
    if(req.url === '/' || req.url === '/overview') {

        const output = dataObj.map( el => templateReplace(cards_template, el)).join('')
        const final = overview_template.replace(/{%CARDS%}/g, output);
        res.writeHead(200, {'Content-type' : 'text/html'});
        res.end(final);

    }else if (req.url === '/products') {

        res.writeHead(200, {'Content-type' : 'text/html'});
        res.end(products_template);

    }else {
        res.end('<h1>Page Note Found</h1>')
    }
});

server.listen(8000, '127.0.0.1')