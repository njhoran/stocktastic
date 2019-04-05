'use strict';

const iex= require('iexcloud_api_wrapper');
const httpStatus = require('http-status');

const JSON_T = 'application/json';

const getStockPrice = async (req, res, next) => {
	const tickerSymbol = req.swagger.params.symbol.value;

	try {
		const { symbol, companyName, latestPrice, changePercent, latestSource } = await iex.quote(tickerSymbol);

		return _respond(res, { symbol, companyName, latestPrice, changePercent, latestSource });
	} catch (e) {
		if (e.response.status === httpStatus.NOT_FOUND) {
			return _respond(res, {
				status      : httpStatus.NOT_FOUND,
				message     : httpStatus[httpStatus.NOT_FOUND],
				information : e.response.data
			});
		}

		console.error(e);

		return _respond(res, {
			status  : e.response.status,
			message : httpStatus[e.response.status]
		});
	}
};

const _respond = (res, payload) => {
	res.setHeader('Content-Type', JSON_T);
	res.statusCode = payload.status || httpStatus.OK;
	return res.end(JSON.stringify(Object.assign({}, payload)));
};

module.exports = { getStockPrice };
