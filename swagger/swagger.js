'use strict'

const config = require('config');

const host = `${config.get('hostname')}:${config.get('port')}`;
const basePath = config.get('basePath');

module.exports = {
	"swagger": "2.0",
	"info": {
		"title": "Stocktastic: Stock Price API",
		"description": "Fetches live stock prices",
		"version": `${process.env.npm_package_version}`
	},
	"host": host,
	"basePath": basePath,
	"schemes": [
		"http"
	],
	"consumes": [
		"application/json"
	],
	"produces": [
		"application/json"
	],
	"paths": {
        "/v1/stock/{symbol}/price": {
            "get": {
                "tags": [
                    "Stock"
                ],
                "x-swagger-router-controller": "stock",
                "operationId": "getStockPrice",
                "summary": "Fetch the live price for the supplied ticker symbol",
                "parameters": [
                    {
                        "$ref": "#/parameters/symbol"
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Stock price result",
                        "schema": {
                            "$ref": "#/definitions/StockPriceModel"
                        }
                    },
                    "404": {
                        "description": "No matching stock found",
                        "schema": {
                            "$ref": "#/definitions/ErrorModel"
                        }
                    },
                    "500": {
                        "description": "Server error",
                        "schema": {
                            "$ref": "#/definitions/ErrorModel"
                        }
                    }
                }
            }
        }
	},
	"parameters": {
		"symbol": {
			"name": "symbol",
			"in": "path",
			"description": "The stock ticker symbol (FB, AAPL, AMZN, NFLX, GOOGL...)",
			"required": true,
			"type": "string"
		}
	},
	"definitions": {
		"StockPriceModel": {
			"type": "object",
			"description": "Stock price response model",
			"required": [
				"symbol",
				"companyName",
				"latestPrice",
				"changePercent",
				"latestSource"
			],
			"properties": {
				"symbol": {
					"type": "string"
				},
				"companyName": {
					"type": "string"
				},
				"latestPrice": {
					"type": "number",
					"format": "float"  
				},
				"changePercent": {
					"type": "number",
					"format": "float"
				},
				"latestSource": {
					"type": "string"
				}
			}
		},
		"ErrorModel": {
			"type": "object",
			"description": "Standard error model for error handling",
			"required": [
				"status",
				"message"
			],
			"properties": {
				"status": {
					"type": "integer"
				},
				"message": {
					"type": "string"
				},
				"information": {
					"type": "string"
				}
			}
		}
	}
};
