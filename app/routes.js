module.exports = function(console, Noob, Class, Nerd, mongoose, app, express) {

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    //console.log('Something is happening.');

    next(); // make sure we go to the next routes and don't stop here
});


router.get('/', function(req, res) {
    res.sendfile('/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/api', function(req, res) {
    res.status(200).json({ message: 'Ey! Velkommen til verdens beste API' });
});

// all noobs
router.route('/api/noobs')

    // create a noob (accessed at POST http://localhost:1337/api/noobs)
    .post(function(req, res) {
        var noob = new Noob();      // create a new instance of the Noob model
        noob.name = req.body.name;  // set the noobs name (comes from the request)
        noob.email = req.body.email;  // set the noobs name (comes from the request)

        // save the noob and check for errors
        noob.save(function(err) {

            if (err)
                res.send(err);

            res.json({ message: 'Noob created!'});
        });
    })

    // get all the noobs (accessed at GET http://localhost:1337/api/noobs)
    .get(function(req, res) {
        Noob.find(function(err, noobs) {
            if (err)
                res.send(err);

            res.json(noobs);
        });
    });

// on routes that end in /noobs/:noob_id
// ----------------------------------------------------
router.route('/api/noobs/:noob_id')

    // get the noob with that id (accessed at GET http://localhost:1337/api/noobs/:noob_id)
    .get(function(req, res) {
        Noob.findById(req.params.noob_id, function(err, noob) {
            if (err)
                res.send(err);
            res.json(noob);
        });
    })

    // update the noob with this id (accessed at PUT http://localhost:8080/api/noobs/:noob_id)
    .put(function(req, res) {

        // use our noob model to find the noob we want
        Noob.findById(req.params.noob_id, function(err, noob) {

            if (err)
                res.send(err);

            noob.name = req.body.name;  // update the noobs info

            // save the noob
            noob.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: noob.name + ' updated!' });
            });
        });
    })

    // delete the noob with this id (accessed at DELETE http://localhost:1337/api/noobs/:noob_id)
    .delete(function(req, res) {
        Noob.remove({
            _id: req.params.noob_id
        }, function(err, noob) {
            if (err)
                res.send(err);

            res.json({ message:  'successfully deleted' });
        });
    });


// post noob to class
// -----------------------------------------------

router.route('/api/post-noob-to-class')
    .post(function(req, res) {
        Noob.findOne({email : req.body.email}, function(err, noob) {

            if (err)
                res.send(err);
            
            if(noob !== null){
                Class.update(
                    {_id: req.body.class_id},
                    {$push: {members: {noob_id: noob._id, noob_name: noob.name, created : new Date()}}},
                    function(err, model) {
                        console.red(err);
                        res.json(noob);
                });
            }

            else
                res.json(noob); //null object aka no results
        });
    });


// all classes api/classes
// ----------------------------------------------------
router.route('/api/classes')

    // create a noob (accessed at POST http://localhost:1337/api/classes);
    .post(function(req, res) {
        var course = new Class();      // create a new instance of the Noob model
        course.title = req.body.title;  // set the noobs name (comes from the request)
        course.description = req.body.description;
        course.length = req.body.length;
        course.maxMembers = req.body.maxMembers;
        course.members = req.body.members;

        // save the noob and check for errors
        course.save(function(err) {

            if (err)
                res.send(err);

            res.json({ message: 'Class created!'});
        });
    })

    // get all the class (accessed at GET http://localhost:1337/api/classes)
    .get(function(req, res) {
        Class.find(function(err, courses) {
            if (err)
                res.send(err);

            res.json(courses);
        });
    });

// get the class with that id (accessed at GET http://localhost:1337/api/class/:class_id)
// and the current speaker
router.route('/api/classes/:class_id')

    .get(function(req, res) {
        Class.findById(req.params.class_id, function(err, course) {
            if (err)
                res.send(err);
            //get current nerd
            Nerd.findById(course.nerd_id, function(err, nerd) {
                if (err)
                    res.send(err);
                
                var obj = { "nerd" : nerd, "course" : course};
                res.json(obj);
            });
        });
    });

// all classes api/classes
// ----------------------------------------------------
router.route('/api/nerds')
    // create a noob (accessed at POST http://localhost:1337/api/nerds);
    .post(function(req, res) {
        var nerd = new Nerd();      // create a new instance of the Noob model
        nerd.name = req.body.name;  // set the noobs name (comes from the request)
        nerd.title = req.body.title;
        nerd.department = req.body.department;
        nerd.img = req.body.img;
        nerd.skills = req.body.skills;

        // save the noob and check for errors
        nerd.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Nerd created!'});
            console.blue('A nerd is born!');
        });
    })

    // get all the noobs (accessed at GET http://localhost:1337/api/nerds)
    .get(function(req, res) {
        Nerd.find(function(err, nerds) {
            if (err)
                res.send(err);
            res.json(nerds);
        });
    })

    // delete a nerd by name (accessed at DELETE http://localhost:1337/api/nerds)
    .delete(function(req, res) {
        Nerd.remove({name : req.body.name}, function(err, nerd) {
            if (err)
                res.send(err);
            res.json({message : 'nerd is removed: ' + req.body.name}); 
        });
    });

// get the class with that id (accessed at GET http://localhost:1337/api/nerds/:nerd_id)
// and the current speaker
router.route('/api/nerds/:nerd_id')

    .get(function(req, res) {
        Nerd.findById(req.params.nerd_id, function(err, nerd) {
            if (err)
                res.send(err);
            //get current nerd
            res.json(nerd);
        });
    });


app.use(router);

}