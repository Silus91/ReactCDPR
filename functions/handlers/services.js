const { db } = require('../utility/admin');
const nodemailer = require('nodemailer');



exports.sendEmail = async (req,res) => {

  const newEmail = {
    email: req.body.email,
    name: req.body.name,
    message: req.body.message
  };

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'georgiana.sporer73@ethereal.email',
        pass: 'dntDgNAf9qHSzG7sWs'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: newEmail.email, 
    to: "georgiana.sporer73@ethereal.email", 
    subject: newEmail.name, 
    text: newEmail.message, 
    html: "<b>Hello world?</b>"
  });
  console.log(res);


  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return res.status(201).json({ info });

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