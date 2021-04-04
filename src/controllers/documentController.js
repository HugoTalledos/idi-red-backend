const { firestoreRef } = require('../drivers/firestore');

const collectionName = 'user';

const registerDocument = async (req, res) => {
  const { userId }  = req.params;
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName)
      .doc(userId)
      .collection('documents')
      .doc();
    try {
      await doc.set({ 
        ...req.body,
        creationDate: new Date(),
        isLost: true,
      });
      return res.send({ success: true, data: { doc: { id: doc.id, data: req.body } } });
    } catch (err) {
      return res.status(500).send({ success: false, message: 'Error saving data to firestore' });
    }
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const getAllDocuments = async (req, res) => {
  if (firestoreRef) {
    const usersList = await firestoreRef.collection(collectionName)
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push(doc.id);
        });
        return items;
      })
      .catch((err) => 
        res.status(500).send({ err, success: false, message: 'Error getting user data from firestore' })
      );
    const promises = [];
    usersList.forEach((user) => {
      const documentsUser = getDocumentsByUserId({ params: { userId: user, local: true } });
      promises.push(documentsUser);
    });

    Promise.all(promises)
      .then((documents) => {
        const items = [];
        documents.forEach((doc) => {
          items.push(...doc)
        })
        res.send({ success: true, data: items })
      })
      .catch((err) => 
        res.status(500).send({ err, success: false, message: 'Error getting documents from firestore' })
      );
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const getDocumentsByUserId = async (req, res) => {
  const { local = false, userId } = req.params;
  if (firestoreRef) {
    return firestoreRef.collection(collectionName)
      .doc(userId)
      .collection('documents')
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({
            ...doc.data(),
            id: userId,
          });
        });
        return local ? items : res.send({ success: true, data: items });
      })
      .catch(err => {
        return local ? {} : res.status(500)
          .send({ err, sucess: false, message: `Document with id ${req.params.id} does not exist` });
      });
  } else {
    return local ? {} : res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const updateDocument = async (req, res) => {
  const { documentId, userId } = req.params;
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName).doc(userId)
      .collection('documents')
      .doc(documentId);
    if (doc) {
      try {
        await doc.set(req.body);
        return res.send({ success: true, data: { id: doc.id, data: req.body } });
      } catch (err) {
        return res.status(500).send({ err, message: 'Error saving data to firestore' });
      }
    } else {
      return res.status(400)
        .send({ succes: false, message: `Document with id ${documentId} does not exist or user with id ${userId} does not exist` });
    }
  } else {
    return res.status(500).send({ sucess: false, message: 'Couldn\'t connect to database' });
  }
};

const deleteDocument = async (req, res) => {
  const { userId, documentId } = req.params;
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName)
      .doc(userId)
      .collection('documents')
      .doc(documentId);
    if (doc) {
      try {
        await doc.delete();
        return res.send({ success: true });
      } catch (err) {
        return res.status(500).send({ err, success: false, message: 'Error deleting data from firestore' });
      }
    } else {
      return res.status(400)
        .send({ success: false, message: `Document with id ${req.params.id} does not exist` });
    }
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

module.exports = {
  getAllDocuments,
  getDocumentsByUserId,
  updateDocument,
  deleteDocument,
  registerDocument,
};
