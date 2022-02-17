const webdriver = require('selenium-webdriver');
require('chromedriver');

var driver = new webdriver.Builder().forBrowser('chrome').build();

driver.get('http://127.0.0.1:8000/');