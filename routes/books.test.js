process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const db = require('../db');
const Book = require('../models/book');

let b1;
describe('Book Routes Test', function() {
	beforeEach(async function() {
		await db.query('DELETE FROM books');

		b1 = await Book.create({
			isbn       : '0691161518',
			amazon_url : 'http://a.co/eobPtX2',
			author     : 'Test Author',
			language   : 'test language',
			pages      : 110,
			publisher  : 'test publisher',
			title      : 'test book',
			year       : 2020
		});
	});

	afterAll(async () => {
		// Close db connection to end tests
		await db.end();
	});

	describe('GET /books', () => {
		test('can get all books', async () => {
			const response = await request(app).get('/books');
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toEqual({
				books : [
					{
						isbn       : '0691161518',
						amazon_url : 'http://a.co/eobPtX2',
						author     : 'Test Author',
						language   : 'test language',
						pages      : 110,
						publisher  : 'test publisher',
						title      : 'test book',
						year       : 2020
					}
				]
			});
		});
	});

	describe('GET /books/:id', () => {
		test('can get a single book', async () => {
			const response = await request(app).get(`/books/${b1.isbn}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toEqual({
				book : {
					isbn       : '0691161518',
					amazon_url : 'http://a.co/eobPtX2',
					author     : 'Test Author',
					language   : 'test language',
					pages      : 110,
					publisher  : 'test publisher',
					title      : 'test book',
					year       : 2020
				}
			});
		});

		test('invalid id returns 404', async () => {
			const response = await request(app).get(`/books/129019241091581`);
			expect(response.status).toBe(404);
		});
	});

	describe('POST /books', () => {
		test('can create a book', async () => {
			const response = await request(app).post(`/books`).send({
				isbn       : '12344567',
				amazon_url : 'http://a.co/eobPXX2',
				author     : 'Test Author2',
				language   : 'test language2',
				pages      : 111,
				publisher  : 'test publisher2',
				title      : 'test book2',
				year       : 1997
			});
			expect(response.status).toBe(201);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toEqual({
				book : {
					isbn       : '12344567',
					amazon_url : 'http://a.co/eobPXX2',
					author     : 'Test Author2',
					language   : 'test language2',
					pages      : 111,
					publisher  : 'test publisher2',
					title      : 'test book2',
					year       : 1997
				}
			});
		});

		test('data with invalid year returns 400 error', async () => {
			const response = await request(app).post(`/books`).send({
				isbn       : '12344567',
				amazon_url : 'http://a.co/eobPXX2',
				author     : 'Test Author2',
				language   : 'test language2',
				pages      : 111,
				publisher  : 'test publisher2',
				title      : 'test book2',
				year       : 2025
			});
			expect(response.status).toBe(400);
		});

		test('data with missing fields returns 400 error', async () => {
			const response = await request(app).post(`/books`).send({
				author    : 'Test Author2',
				language  : 'test language2',
				publisher : 'test publisher2',
				title     : 'test book2',
				year      : 1925
			});
			expect(response.status).toBe(400);
		});
	});

	describe('PUT /books/:isbn', () => {
		test('can update single book', async () => {
			const response = await request(app).put(`/books/${b1.isbn}`).send({
				isbn       : '0691161518',
				amazon_url : 'http://a.co/eobPtX2',
				author     : 'Test Author Man!',
				language   : 'test language bro!',
				pages      : 666,
				publisher  : 'test publisher swag',
				title      : 'test book baby!',
				year       : 2021
			});
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toEqual({
				book : {
					isbn       : '0691161518',
					amazon_url : 'http://a.co/eobPtX2',
					author     : 'Test Author Man!',
					language   : 'test language bro!',
					pages      : 666,
					publisher  : 'test publisher swag',
					title      : 'test book baby!',
					year       : 2021
				}
			});
		});

		test('invalid id returns 404', async () => {
			const response = await request(app).put(`/books/1209810948104`).send({
				isbn       : '0691161518',
				amazon_url : 'http://a.co/eobPtX2',
				author     : 'Test Author Man!',
				language   : 'test language bro!',
				pages      : 666,
				publisher  : 'test publisher swag',
				title      : 'test book baby!',
				year       : 2021
			});
			expect(response.status).toBe(404);
		});

		test('data with invalid year returns 400 error', async () => {
			const response = await request(app).put(`/books/${b1.isbn}`).send({
				isbn       : '0691161518',
				amazon_url : 'http://a.co/eobPtX2',
				author     : 'Test Author Man!',
				language   : 'test language bro!',
				pages      : 666,
				publisher  : 'test publisher swag',
				title      : 'test book baby!',
				year       : 2022
			});
			expect(response.status).toBe(400);
		});

		test('data with missing fields returns 400 error', async () => {
			const response = await request(app).put(`/books/${b1.isbn}`).send({
				isbn   : '0691161518',
				author : 'Test Author Man!',
				pages  : 666,
				title  : 'test book baby!'
			});
			expect(response.status).toBe(400);
		});
	});

	describe('DELETE /books/:isbn', () => {
		test('can delete a book', async () => {
			const response = await request(app).delete(`/books/${b1.isbn}`);
			expect(response.status).toBe(200);
			expect(response.body).toBeInstanceOf(Object);
			expect(response.body).toEqual({ message: 'Book deleted' });
		});
	});
});
