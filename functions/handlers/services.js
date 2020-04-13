const nodemailer = require('nodemailer');
const { validateNewEmail } = require('../utility/validaters');

exports.sendEmail = async (req,res) => {

  const newEmail = {
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  };

  const { valid, errors } = validateNewEmail(newEmail);

  if(!valid) return res.status(400).json(errors);
  console.log("tutaj kurwa", errors)

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'georgiana.sporer73@ethereal.email',
      pass: 'dntDgNAf9qHSzG7sWs'
    }
  });

  let info = await transporter.sendMail({
    from: newEmail.email, 
    to: "georgiana.sporer73@ethereal.email", 
    subject: newEmail.name, 
    text: newEmail.message, 
  });
  console.log(info);
  return res.status(201).json({"Message send": info });

  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// Name	Georgiana Sporer
// Username	georgiana.sporer73@ethereal.email (also works as a real inbound email address)
// Password	dntDgNAf9qHSzG7sWs
