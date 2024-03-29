const { ObjectId } = require('mongodb');
const { courseBookmarkCollection, servicesCollection } = require('../../DatabaseConfig/Db');

const servicesBookmarkPost = async (req, res) => {
  try {
    const data = req.body;
    const email = req.body.loggedInUserEmail;
    const id = req.body.currentProductId;

    const query = { loggedInUserEmail: email, currentProductId: id };
    const exitsData = await courseBookmarkCollection.findOne(query);

    if (exitsData) {
      return res.status(400).json({ message: 'data already exits' });
    }

    const result = await courseBookmarkCollection.insertOne(data);
    return res.status(200).json({ result });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteBookmark = async (req, res) => {
  try {
    const id = req.params.id;
    const email = req.params.email;

    const query = { currentProductId: id, loggedInUserEmail: email };

    const exitsData = await courseBookmarkCollection.findOne(query);

    if (exitsData) {
      const result = await courseBookmarkCollection.deleteOne(query);
      return res.status(200).json({ result });
    } else {
      return res.status(300).json({ message: 'not exits this user' });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const isBookmarked = async (req, res) => {
  try {
    const email = req.params.email;
    const id = req.params.id;

    const query = { currentProductId: id, loggedInUserEmail: email };

    const exitsData = await courseBookmarkCollection.findOne(query);

    if (exitsData) {
      return res.status(200).json({ isBookmark: true });
    } else {
      return res.status(300).json({ isBookmark: false });
    }
  } catch (error) {
    return res.status(400).json({ message: 'is Bookmarked not working' });
  }
};

const getServicesDataBasedOnId = async (req, res) => {
  try {
    const email = req.params.email;

    const query = { loggedInUserEmail: email };

    const getDataBasedOnEmail = await courseBookmarkCollection.find(query).toArray();

    const combinedData = [];
    for (const item of getDataBasedOnEmail) {
      const servicesAllData = await servicesCollection.findOne({ _id: new ObjectId(item.currentProductId) });
      combinedData.push({ ...item, servicesData: servicesAllData });
    }

    return res.status(200).json({ combinedData });
  } catch (error) {
    return res.status(400).json({ message: 'not working try get services data based on id' });
  }
};

module.exports = { servicesBookmarkPost, deleteBookmark, isBookmarked, getServicesDataBasedOnId };
