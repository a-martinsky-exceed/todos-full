const Item = require('../models/item.model');

exports.create = function(req, res) {
  let item = new Item(
    {
      text: req.body.text
    }
  );

  item.save(function(err) {
    if(err) return next(err);
    res.send(item)
  });
};

// exports.read = function(req, res) {
//   Item.findById(req.params.id, function(err, item) {
//     if(err) return next(err);
//     res.send(item);
//   });
// };

exports.update = function(req, res) {
  Item.findByIdAndUpdate(req.params.id, {$set: req.body}, function(err, item) {
    if(err) return next(err);
    res.send(req.body)
  });
}

exports.delete = function(req, res) {
  const id = req.params.id
  Item.findByIdAndRemove(id, function(err) {
    if(err) return next(err)
    res.send(id)
  });
};

exports.find_all = function(req, res) {
  Item.find({},function(err, items) {
    if(err) return next(err);
    res.send(items)
  })
}

exports.selectAll = function(req, res) {
  Item.updateMany({}, {$set: req.body}, function(err, items){
    if(err) return next(err);
    res.send(req.body)
  })
}
