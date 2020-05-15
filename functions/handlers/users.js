const config = require("../utility/config");
const { db, bucket } = require("../utility/admin");
const firebase = require("firebase");
const { uuid } = require("uuidv4");
const Logger = require("../utility/logger");
const logger = new Logger("app");
const {
  validateRegisterData,
  validateLoginData,
} = require("../utility/validaters");

exports.register = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    handle: req.body.email,
  };

  const { valid, errors } = validateRegisterData(newUser);
  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(403).json({
          general:
            "This email is already in use or you have used Social Media before",
        });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.email,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        createdAt: new Date().toISOString(),
        photoURL:
          "https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/userImgs%2Fsamurai.png?alt=media&token=3a74747b-4740-40c6-b297-33d1599e4b14",
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      logger.info(`New User created | data : ${newUser.email}`);
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      logger.error(`Error At Trying to register  ${JSON.stringify(err)}`);
      return res
        .status(400)
        .json({ general: "Something went wrong, please try again" });
    });
  return;
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      logger.error(`Error At Trying to Login | data: ${user.email}`);
      return res
        .status(403)
        .json({ general: "Wrong credentials, please try again" });
    });
};

exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "User not found" });
      }
      userData.credentials = doc.data();
      return res.json(userData);
    })
    .catch((err) => {
      console.error(err);
      return res.status(400).json({ error: err.code });
    });
};

exports.logout = (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      return res.status(200).json({ message: "Succes logout" });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(400)
        .json({ general: "Wrong credentials, something went wrong" });
    });
};

exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const busboy = new BusBoy({ headers: req.headers });

  let imageToBeUploaded = {};
  let imageFileName;
  let generatedToken = uuid();
  try {
    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
        return res.status(400).json({ photo: "Only jpeg/png files!!" });
      }
      const imageExtension = filename.split(".")[
        filename.split(".").length - 1
      ];
      imageFileName = `user${Math.round(
        Math.random() * 10000
      ).toString()}.${imageExtension}`;
      const filepath = path.join(os.tmpdir(), imageFileName);
      imageToBeUploaded = { filepath, mimetype };
      file.pipe(fs.createWriteStream(filepath));
    });
    busboy.on("finish", () => {
      console.log(bucket);
      bucket
        .upload(imageToBeUploaded.filepath, {
          resumable: false,
          destination: `userImgs/${imageFileName}`,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
              firebaseStorageDownloadTokens: generatedToken,
            },
          },
        })
        .then(() => {
          const photoURL = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/userImgs%2F${imageFileName}?alt=media&token=${generatedToken}`;
          logger.info(
            `User ${req.user.email} uploaded new photo ${imageFileName}`
          );
          console.log(photoURL);
          return db.doc(`/users/${req.user.handle}`).update({ photoURL });
        })
        .then(() => {
          return res
            .status(201)
            .json({ message: "image uploaded successfully" });
        });
    });
    busboy.end(req.rawBody);
  } catch (error) {
    logger.error(`Error At Trying to upload Photo ${JSON.stringify(error)}`);
    return res.status(400).json({ error: "zjebane" });
  }
};

// napisac reduktor rozmiaru albo validacja rozmiaru do 0.5 MB okkolo jeszcze trzeb a zobaczyc
