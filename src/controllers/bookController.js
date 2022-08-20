const { firestoreRef } = require('../drivers/firestore');

const collectionName = 'user';

const getAllBooks = (req, res) => {
  if (firestoreRef) {
    return firestoreRef.collection(collectionName)
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        return res.send({ success: true, data: items });
      })
      .catch(
        (err) => res.status(500).send({ err, message: 'Error getting data from firestore' })
      );
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const getBookById = (req, res) => {
  if (firestoreRef) {
    return firestoreRef.collection(collectionName)
      .doc(req.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = {
            ...doc.data(),
            id: req.params.id,
          };
          return res.send({ success: true, data });
        }
        return res.status(500)
          .send({ err, message: `Document with id ${req.params.id} does not exist` });
      });
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database'} );
  }
};

const createBook = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName)
      .doc();
    try {
      const creationDate = new Date();
      await doc.set({ ...req.body, creationDate });
      return res.send({ success: true, data: { doc: { id: doc.id, data: req.body }} });
    } catch (err) {
      return res.status(500).send({ err, message: 'Error saving data to firestore' });
    }
  } else {
    return res.status(500).send({ success: false, error: 'Couldn\'t connect to database' });
  }
};

const updateBook = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName).doc(req.params.id);
    if (doc) {
      try {
        await doc.set(req.body);
        return res.send({ success: true, data: { id: doc.id, data: req.body }});
      } catch (err) {
        return res.status(500).send({ err, message: 'Error saving data to firestore' });
      }
    } else {
      return res.status(500)
        .send({ succes: false, message: `Document with id ${req.params.id} does not exist` });
    }
  } else {
    return res.status(500).send({ sucess: false, message: 'Couldn\'t connect to database' });
  }
};

const deleteBook = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName)
      .doc(req.params.id);
    if (doc) {
      try {
        await doc.delete();
        return res.send({ success: true }); 
      } catch (err) {
        return res.status(500).send({ err, message: 'Error deleting data from firestore' });
      }
    } else {
      return res.status(500)
        .send({ success: false, message: `Document with id ${req.params.id} does not exist` });
    }
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
