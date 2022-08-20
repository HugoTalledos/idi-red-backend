const { firestoreRef } = require('../drivers/firestore');

const collectionName = 'user';

const getAllUsers = (req, res) => {
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
        (err) => res.status(500).send({ err, success: false, message: 'Error getting data from firestore' })
      );
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const getUserById = (req, res) => {
  if (firestoreRef) {
    return firestoreRef.collection(collectionName)
      .doc(req.params.userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data = {
            ...doc.data(),
            id: req.params.userId,
          };
          return res.send({ success: true, data });
        }
        return res.send({ success: false, message: `Document with id ${req.params.userId} does not exist` });
      });
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const createUser = async (req, res) => {
  const { userId } = req.body
  if (firestoreRef) {
    try {
      const user = await firestoreRef.collection(collectionName)
        .doc(userId);
      const creationDate = new Date();
      await user.set({ ...req.body, creationDate });
      return res.send({ success: true, data: { doc: { id: user.id, data: req.body } } });
    } catch (err) {
      return res.status(500).send({ success: false, message: 'Error saving data to firestore' });
    }
  } else {
    return res.status(500).send({ success: false, error: 'Couldn\'t connect to database' });
  }
};

const updateUser = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName).doc(req.params.userId);
    if (doc) {
      try {
        await doc.set({ updateDate: new Date(), ...req.body });
        return res.send({ success: true, data: { id: doc.id, data: req.body } });
      } catch (err) {
        return res.status(500).send({ success: false, message: 'Error saving data to firestore' });
      }
    } else {
      return res.status(500)
        .send({ succes: false, message: `Document with id ${req.params.userId} does not exist` });
    }
  } else {
    return res.status(500).send({ sucess: false, message: 'Couldn\'t connect to database' });
  }
};

const deleteUser = async (req, res) => {
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName)
      .doc(req.params.userId);
    if (doc) {
      try {
        await doc.delete();
        return res.send({ success: true });
      } catch (err) {
        return res.status(500).send({ err, success: false, message: 'Error deleting data from firestore' });
      }
    } else {
      return res.status(500)
        .send({ success: false, message: `Document with id ${req.params.userId} does not exist` });
    }
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
