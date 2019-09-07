const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


const sendAlert = (message) => {
    return sgMail.send({
        to: 'filson8@gmail.com',
        from: 'caramelpanel@gmail.com',
        subject: 'CourtsChecker alert',
        text: message,
        html: `<p>${message}</p>`,
    })
};

module.exports.sendAlert = sendAlert;