const { firestoreRef } = require('../drivers/firestore');

const collectionName = 'user';

const registerRequest = async (req, res) => {
  const { userId } = req.params;
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName)
      .doc(userId)
      .collection('requests')
      .doc();
    try {
      await doc.set({
        ...req.body,
        creationDate: new Date(),
        active: true,
      });
      return res.send({ success: true, data: { doc: { id: doc.id, data: req.body } } });
    } catch (err) {
      return res.status(500).send({ success: false, message: 'Error saving data to firestore' });
    }
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const getAllRequests = async (req, res) => {
  const { userId, requestType } = req.params;
  if (firestoreRef) {
    const requestList =  await firestoreRef.collection(collectionName)
      .doc(userId)
      .collection('requests')
      .get()
      .then((snapshot) => {
        const items = [];
        snapshot.forEach((doc) => {
          items.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        return items;
      })
      .catch((err) => 
        res.status(500).send({ err, success: false, message: 'Error getting request data from firestore' })
      );

    if(requestType === ',') res.send({ success: true, data: requestList});

    const requestFilter = requestList.filter((request) => request.requestType === requestType);
    res.send({ success: true, data: requestFilter });
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

const updateRequest = async (req, res) => {
  const { requestId, userId } = req.params;
  console.log(req.params)
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName).doc(userId)
      .collection('requests')
      .doc(requestId);
    if (doc) {
      try {
        await doc.update({ updateDate: new Date(), ...req.body });
        return res.send({ success: true, data: { id: doc.id, data: req.body } });
      } catch (err) {
        return res.status(500).send({ err, success: false, message: 'Error saving data to firestore' });
      }
    } else {
      return res.status(400)
        .send({ succes: false, message: `Request with id ${requestId} does not exist or user with id ${userId} does not exist` });
    }
  } else {
    return res.status(500).send({ sucess: false, message: 'Couldn\'t connect to database' });
  }
};

const deleteRequest = async (req, res) => {
  const { userId, requestId } = req.params;
  if (firestoreRef) {
    const doc = firestoreRef.collection(collectionName)
      .doc(userId)
      .collection('requests')
      .doc(requestId);
    if (doc) {
      try {
        await doc.delete();
        return res.send({ success: true });
      } catch (err) {
        return res.status(500).send({ err, message: 'Error deleting data from firestore' });
      }
    } else {
      return res.status(400)
        .send({ success: false, message: `Request with id ${requestId} does not exist` });
    }
  } else {
    return res.status(500).send({ success: false, message: 'Couldn\'t connect to database' });
  }
};

module.exports = {
  registerRequest,
  getAllRequests,
  updateRequest,
  deleteRequest
};
