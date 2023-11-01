

const password = 'rzbc gpyv pgry oftz'



const send = require('gmail-send')({
    user: 'gnusiva@gmail.com',
    pass: password,
    to: 'gnusiva@gmail.com',
    subject: 'test subject',
});

send({
    text: 'gmail-send example 1',
}, (error, result, fullResult) => {
    if (error) console.error(error);
    console.log(result);
})