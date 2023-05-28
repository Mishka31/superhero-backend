// const { Superhero } = require('../../model');
const { bucket } = require('../../firebase/config');
// const admin = require('firebase-admin');
// const serviceAccount = require('../../firebase/serviceAccountKey.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'heroes-25ad3.appspot.com',
// });

// const bucket = admin.storage().bucket();
// const db = admin.firestore();

const addSuperhero = async (req, res) => {
  try {
    await uploadFileToFirebase(req.file);

    res.status(201).json({ status: 'Success saved file', code: 201, data: req.file });
  } catch (error) {
    console.error('Ошибка загрузки файла в Firebase:', error);
    res.status(500).json({ status: 'Error', code: 500, message: 'Failed to upload file' });
  }
};

const uploadFileToFirebase = async (file) => {
  const { path, originalname } = file;
  try {
    const destination = `images/${originalname}`;
    await bucket.upload(path, {
      destination,
      metadata: {
        contentType: 'image/jpeg',
      },
    });

    const [uploadedFile] = await bucket.file(destination).get();

    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(
      destination
    )}?alt=media&token=${encodeURIComponent(uploadedFile.metadata.mediaLink.split('&token=')[1])}`;

    console.log('Success add to Firebase:', imageUrl);
  } catch (error) {
    throw new Error('Erro upload to Firebase: ' + error.message);
  }
};

// const createCollection = async () => {
//   try {
//     await db.collection('superheroes').doc();

//     console.log('Коллекция успешно создана');
//   } catch (error) {
//     console.error('Ошибка при создании коллекции:', error);
//   }
// };

module.exports = addSuperhero;
