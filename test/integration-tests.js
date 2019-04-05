'use strict';

const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');

const app = require('../stocktastic');

describe('Sending a well-formed request to the stock price endpoint', () => {

	it('returns a 200 OK and the expected response structure', () => {
		return request(app)
		.get('/v1/stock/aapl/price')
		.expect('Content-Type', /json/)
		.expect(httpStatus.OK)
		.then(({ body }) => {
			expect(body).to.be.an('object');
			expect(body).to.have.property('symbol').that.is.a('string').to.equal('AAPL');
			expect(body).to.have.property('companyName').that.is.a('string');
			expect(body).to.have.property('latestPrice').that.is.a('number');
			expect(body).to.have.property('changePercent').that.is.a('number');
			expect(body).to.have.property('latestSource').that.is.a('string');
		});
	});

	it('returns a 200 OK and a real stock price result', () => {
		return request(app)
		.get('/v1/stock/nflx/price')
		.expect('Content-Type', /json/)
		.expect(httpStatus.OK)
		.then(({ body }) => {
			expect(body).to.have.property('symbol').that.is.a('string').to.equal('NFLX');
			expect(body).to.have.property('companyName').that.is.a('string').to.match(/\bNetflix\b/);
			expect(body).to.have.property('latestPrice').that.is.a('number').to.match(/^\d{1,10}\.\d{1,10}$/);
			expect(body).to.have.property('changePercent').that.is.a('number').to.match(/^[-]?\d{1,10}\.\d+$/);
			expect(body).to.have.property('latestSource').that.is.a('string');
		});
	});

});

describe('Sending an unknown stock symbol to the stock price endpoint', () => {

	it('returns a 404 and the expected error response', () => {
		return request(app)
		.get('/v1/stock/wibble/price')
		.expect('Content-Type', /json/)
		.expect(httpStatus.NOT_FOUND)
		.then(({ body }) => {
			expect(body).to.be.an('object').to.deep.equal({
				status      : httpStatus.NOT_FOUND,
				message     : httpStatus[httpStatus.NOT_FOUND],
				information : 'Unknown symbol'
			});
		});
	});

});
