"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_1 = require("./src/application");
var console_1 = require("console");
var app = new application_1.Application({
    port: 3001
});
console_1.debug('app start');
app.listen();
// test request
app.get('/', function () {
    return 'root';
});
app.get('/get', function () {
    return 'get';
});
app.post('/item', function () {
    return 'item';
});
//# sourceMappingURL=index.js.map