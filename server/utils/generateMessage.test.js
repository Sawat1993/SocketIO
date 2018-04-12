const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./generateMessage');

describe('GenerateMessage', () => {
    it('shoul generate message', () => {
        var from = 'Sawatantra';
        var text = 'Welcome';

        var message = generateMessage(from, text);

        // expect(message.createdAt).toBeA('number');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);

    })
});

describe('GenerateMessage', () => {
    it('shoul generate message', () => {
        var from = 'Sawatantra';
        var lat = 1;
        var long = 1;
        var url = 'https://www.google.com/maps?q=1,1';

        var message = generateLocationMessage(from, lat, long);

        // expect(message.createdAt).toBeA('number');
        expect(message.from).toBe(from);
        expect(message.url).toBe(url);

    })
});