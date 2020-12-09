const router = require('express').Router();
const mongoose = require('mongoose');

const Hall = require('../../models/hall');

// GET methods
// ----------------------------------
// Get all Halls
router.get('/', (_,res) =>{
  Hall.find().
  sort({ name: 1}).
  then( halls => res.json(halls))
})

// Get single Hall schedule
router.get('/:id', (req,res) =>{

  Hall.aggregate([{
      "$match": {
          "_id": mongoose.Types.ObjectId(req.params.id)
      }
  },
  {
      "$unwind": "$taken_sessions"
  }, {
      "$sort": {
          "taken_sessions.movie": 1
      }
  }, {
      "$group": {
          "taken_sessions": {
              "$push": "$taken_sessions"
          },
          "_id": 1
      }
  }, {
      "$project": {
          "_id": 0,
          "taken_sessions": 1
      }
  }]
  )
  .then( hall => res.json(hall))
})

// Get showings schedule
router.get('/movie/:name',(req,res) => {
  Hall.aggregate([{
    "$match": {
        "taken_sessions.movie": req.params.name
      }
    },
    {
      "$unwind": "$taken_sessions"
    },
    {  
            "$match": { "taken_sessions.movie": req.params.name },
        },
    
    {
      "$sort": 
      {
        "name": 1
      },
    },
    {
      "$project": {
        "_id": 1,
        "name":1,
        "taken_sessions._id": 1,
        "taken_sessions.start": 1,
        "taken_sessions.end": 1
    }
    }]
)
.then( hall => res.json(hall))
})
// ----------------------------------

// POST/PUT methods
// ----------------------------------
// Add new Hall
router.post('/', (req, res) => {
  const newHall = new Hall({
    name: req.body.name,
    taken_sessions: []
  })
  newHall.save()
  .then(halls => res.status(201).json({msg: `Hall with name:${req.body.name} has been added`}))
  .catch((err) => {
    if(err.code == 11000){
        return res.status(409).json({msg: "Hall with this name already exists"})
    }
    else return res.status(404).json({msg: err.errors.name.message})
  })
});

// Update Hall name
router.put('/name/:id', (req, res) => {

  Hall.findByIdAndUpdate(req.params.id, { name: req.body.name })
  .then(() => res.json(req.body.name))
  .catch((err) => {
    if(err.code == 11000){
        return res.status(409).json({msg: "Hall with this name already exists"})
    }
    else return res.status(404).json({msg: err.errors.name.message})
  })
});

//  Add showing to Hall
router.put('/taken_sessions/:id', async (req, res) => {
  const _id = req.params.id;

  let can_add;
  await Hall.findById(_id ).then( ({taken_sessions}) => {
    can_add = true;
        taken_sessions.some( ( { start, end } ) => {
            if(Date.parse(req.body.end)>Date.parse(start) && Date.parse(req.body.start)<Date.parse(end)){
                can_add = false;
                return true;
            }
        })
    });
  if(can_add){
    Hall.findByIdAndUpdate(_id, 
      { $push: { taken_sessions: req.body } })
      Hall.findById(_id).then( ({taken_sessions}) => res.json(taken_sessions[0]));
      
    }
  else return res.status(404).json({msg:"Already booked"});
});

// Move showing from one hall to second

router.put('/:showing_id/from/:id_from/to/:id_to', async (req, res) => {
  const { showing_id, id_from, id_to } = req.params;

  const transferred_object = await Hall.aggregate([{
    "$match": {
        "_id": mongoose.Types.ObjectId(id_from)
      }
    },
    {
      "$unwind": "$taken_sessions"
    },
    {
      "$match": { "taken_sessions._id": mongoose.Types.ObjectId(showing_id) },
    },
    {
      "$project": {
        "_id": 0,
        "taken_sessions.movie": 1,
        "taken_sessions.start": 1,
        "taken_sessions.end": 1
    }
    }]
  )
  .then( hall => hall);

  const showing = transferred_object[0].taken_sessions;
  let can_add;

  await Hall.findById(id_to ).then( ({ taken_sessions }) => {
    can_add = true;
        taken_sessions.some( ( { start, end } ) => {
            if(showing.end>start && showing.start<end){
                can_add = false;
                return true;
            }
        })
    });

  if(can_add){

    await Hall.findByIdAndUpdate(id_from, 
      { $pull: { 'taken_sessions': {'_id': showing_id} } })

    Hall.findByIdAndUpdate(id_to, 
      { $push: { taken_sessions: showing } },
      (error, success) => {
        if (error) {
          res.status(404).json({ msg:error });
        } else {
          res.status(201).json({msg:`Showing ${showing.movie} moved to hall ${success.name}`});
        }
      });

    }
  else return res.status(404).json({msg:"No place in second hall"});
});

// ----------------------------------

// DELETE methods

// ----------------------------------
// Delete Hall, if not occupied
router.delete('/:id', async (req, res) => {
  Hall.findOneAndDelete({_id: req.params.id, taken_sessions: []})
    .then((user) => {
      if(user){
          return res.status(200).json({ msg: "Hall removed" })
      }
      else 
          return res.status(404).json({ msg: "You cannot remove occupied Hall" })
      })
    .catch((err) => {
        res.status(404).json({ error: err });
      })  
});

// Delete Showing from Hall
router.delete('/:hall_id/:movie_id', (req,res) => {
  Hall.findByIdAndUpdate(req.params.hall_id, 
    { $pull: { 'taken_sessions': {'_id':req.params.movie_id} } },
    (error, success) => {
      if (error) {
        res.status(404).json({ msg:error });
      } else {
        res.status(201).json({msg:`Showing removed from Hall ${success.name}`});
      }
    });
});
// ----------------------------------

module.exports = router;