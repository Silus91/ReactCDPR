const { db } = require('../utility/admin');

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