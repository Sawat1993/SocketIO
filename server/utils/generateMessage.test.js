const expect = require('expect');

const { generateMessage } = require('./generateMessage');

describe('GenerateMessage', () => {
    it('shoul generate message', () => {
        var from = 'Sawatantra';
        var text = 'Welcome';

        var message = generateMessage(from, text);

        // expect(message.createdAt).toBeA('number');
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);

    })
})