const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/utils/amazon.js', () => {
    return {
        single: () => (req, res, next) => {
            req.file = {
                location:
                    'https://my-first-bucket-cool.s3.us-west-2.amazonaws.com/94445dc1-d675-4ace-bb0d-83d7242ad352-image',
                key: '55555',
                contentType: 'image',
            };
            req.body = {
                name: 'myFile',
            };
            next();
        },
    };
});

describe('. routes', () => {
    beforeEach(() => {
        return setup(pool);
    });
    it('should add an image to the database', async () => {
        const data = await request(app)
            .post('/api/v1/upload/file')
            .send({ name: 'myFile', image: 'hello.jpg' });
        const expectation = {
            id: '1',
            name: 'myFile',
            timeStamp: '55555',
            url:
                'https://my-first-bucket-cool.s3.us-west-2.amazonaws.com/94445dc1-d675-4ace-bb0d-83d7242ad352-image',
        };

        expect(data.body).toEqual(expectation);
    });

    it('should delete an image from the database and get remaining image from database', async() => {
      await request(app)
            .post('/api/v1/upload/file')
            .send({ name: 'myFile', image: 'hello.jpg' });
      await request(app)
            .post('/api/v1/upload/file')
            .send({ name: 'myFile', image: 'hello.jpg' });
      await request(app)
            .delete('/api/v1/upload/file/2')
      const data = await request(app)
            .get('/api/v1/upload/files')

      const expectation = {
        id: '1',
        name: 'myFile',
        timeStamp: '55555',
        url:
            'https://my-first-bucket-cool.s3.us-west-2.amazonaws.com/94445dc1-d675-4ace-bb0d-83d7242ad352-image',
    };

      expect(data.body[0]).toEqual(expectation)
    });
});
