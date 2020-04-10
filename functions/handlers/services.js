const { db } = require('../utility/admin');
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

















exports.getAllPosts =  (req, res) => {
  db.collection('posts').orderBy('createdAt', 'desc')
  .get()
    .then(data => {
      let posts = [];
      data.forEach(doc => {
        posts.push({
          postId: doc.id,
          body:doc.data().body,
          user: doc.data().user,
          createdAt: doc.data().createdAt
        });    
      });
      return res.json(posts);
    })
    .catch(err => console.error(err));
}

exports.createPost = (req, res) => {

  const newPost = {
    body: req.body.body,
    user: req.user.handle,
    createdAt: new Date().toISOString()
  };
  
  if(req.body.body.trim() === '') {
     return res.status(400).json({ body: 'Body must not be empty'});
  }

  db.collection('posts')
  .add(newPost)
  .then((doc) => {
    res.json({ message: `document created ${doc.id} sucesfuly`});
    return null;
  })
  .catch(err => {
    res.status(500).json({ error:  'something wrong' });
    console.error(err);
  });
}