//Behavior-driven development 
//chai api: http://chaijs.com/api/bdd/

// husk at should = to 

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('API requests', function() {
  
  // ==============================================================
  
  it('should tell if api is online GET', function(done) {
    chai.request(server)
      .get('/api')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });
  
  // ==============================================================

  it('should list ALL noobs on /api/noobs GET', function(done) {
  chai.request(server)
    .get('/api/noobs')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      done();
    });
  });


  it('should check the model of a noob GET', function(done) {
  chai.request(server)
    .get('/api/noobs')
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');

      // check noob on index 3
      res.body[3].should.have.property('_id');
      res.body[3].should.have.property('name');
      res.body[3].should.have.property('email');
      res.body[3].should.have.property('created');
      
      // check field content
      res.body[3].should.have.property('karma');

      res.body[3].karma.should.equal(4);
      res.body[3].name.should.equal('Foo Bar');
      res.body[3].email.should.equal('foo.bar@soprasteria.com');

      //test done
      done();
    });
  });

  // ==============================================================

  it('create a noob POST');

  // ==============================================================  

  it('should check the model of a nerd GET');

  // ==============================================================

  it('create a nerd POST', function(done){
    chai.request(server)
      .post('/api/nerds')
      .send({
          "name": "Ola Nordmann", 
          "title": "Gjennomsnittsnordmannen ", 
          "department": "Norge", 
          "skills": ['Microsoft Excel', 'Word', 'Facebook', 'SnapChat'], 
          "img": "data:image/jpeg;base64,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"
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Nerd created!');
        done();
      })
  });

  // ==============================================================  

  it('should remove a nerd REMOVE', function(done){
    chai.request(server)
    .delete('/api/nerds')
    .send({name : "Ola Nordmann"})
    .end(function(err, res){
      res.should.have.status(200)
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('message');
      done();
    })
  });

  // ==============================================================

  it('should respond from all endpoints', function(done){
    chai.request(server)
      .get('/api')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        // checking noobs
        chai.request(server)
          .get('/api/noobs')
          .end(function(err, res){
            res.should.have.status(200);
            res.should.be.json;

            //checking nerds
            chai.request(server)
              .get('/api/nerds')
              .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;

                //async test is done
                //checking nerds
                chai.request(server)
                  .get('/api/classes')
                  .end(function(err, res){
                    res.should.have.status(200);
                    res.should.be.json;
                    //async test is done
                    done();
                });
            }); // checking class
          }); //checking nerds 
      }); // checking noobs
  }); // checking api

  // ==============================================================

});


describe('Logiske tester', function() {
  it('boolean should be true', function(done){
    var youAreCool = false;
    youAreCool.should.be.true;
    done();
  });

  it('string should be string', function(done){
    var yourName = null;
    yourName.should.be.a('Object');
    done();
  });

  it('foo bar testm should be quux', function(done){
    var obj = { foo: { bar: { baz: 'quux' } } };
    obj.should.have.deep.property('foo.bar.baz', 'jabadahut');
    done();
  });

  it('array should an array and contain 4 items', function(done){
    var array = [1,2,3,4];
    array.should.be.an.instanceof(String);
    array.should.have.length(5);
    array.should.have.length.above(5);
    done();
  });

  it('ullared should contain Ola-Conny, Morgan, Boris, Kassadama, not 4,2,1', function(done){
    var ullared = ["Ola-Conny","Morgan", "Boris", "Kassedama"];
    ullared.should.include.members(["1", "2"]);
    ullared.should.not.include.members(["Boris", 2, "Morgan"]);

    done();
  })

})