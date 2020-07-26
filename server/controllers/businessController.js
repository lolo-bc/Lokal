const db = require("../models");

module.exports = {
  create: function (req, res) {
    db.Business.create(req.body)
      .then((dbBusiness) => {
        return db.User.findOneAndUpdate(
          { _id: req.user._id },
          { $push: { businesses: dbBusiness._id } },
          { new: true }
        );
      })
      .then((dbUser) => {
        res.json(dbUser);
        console.log(dbUser);
      })
      .catch((err) => res.status(422).json(err));
  },
  findAll: function (req, res) {
    {
      db.Business.find({})
        .then((businesses) => {
          res.json(businesses);
          console.log(businesses);
        })
        .catch((err) => res.status(422).json(err));
    }
  },

  findViaSearch: function (req, res) {
    const regexSearch = req.params.search;
    console.log("regexSearch", regexSearch);

    db.Business.find({ businessName: new RegExp(regexSearch, "i") })
      .then((foundBusinesses) => {
        res.json(foundBusinesses);
        console.log(foundBusinesses);
      })
      .catch((err) => res.status(422).json(err));
  },

  findViaTags: function (req, res) {
    const regexSearch = new RegExp(req.body);

    db.business
      .find({
        tags: { $regex: regexSearch, $options: "i" },
      })
      .then((foundBussinessByTags) => {
        res.json(foundBussinessByTags);
        console.log(foundBussinessByTags);
      });
  },

  findById: function (req, res) {
    db.Business.findOne({ _id: req.params.id })
      .then((business) => {
        res.json(business);
      })
      .catch((err) => res.status(422).json(err));
  },
};
