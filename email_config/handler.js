const nodemailer = require('nodemailer');

// const emailConfig = require('./config');

const { promisify } = require('util');
const fs = require('fs');

const readFile = promisify(fs.readFile);
// const writeFile = promisify(fs.writeFile);

let transport = nodemailer.createTransport({
    // host: emailConfig.host,
    // port: emailConfig.port,
    // auth: {
    //     user: emailConfig.user,
    //     pass: emailConfig.pass
    // }
    service: 'gmail',
    auth: {
        user: 'no.reply.compumundohmr@gmail.com',
        pass: 'compumundo21'
    }
});

exports.send = async (options) => {

    const file = await readFile(`${__dirname}/views/${options.htmlFile}`, 'utf8');
    const result = file.replace('[[url]]', options.url);
    
    let mailOptions = {
        from: 'CompumundoHMR <no-reply@cmhmr.com>',
        to: options.email,
        subject: options.subject,
        html: result
    };
    const sendMail = transport.sendMail
    return sendMail.call(transport, mailOptions);
}
