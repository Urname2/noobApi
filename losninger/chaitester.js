it('create a noob POST',  function(done){
     chai.request(server)
      .post('/api/noobs')
      .send({
        name: "Jan Bjarne",
        email: "jan.bjarne23@soprasteria.com"
      })
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Noob created!');

        done();
      });
});

  // ==============================================================  

it('should check the model of a nerd GET', function(done){
	chai.request(server)
	    .get('/api/nerds')
	    .end(function(err, res){
	    	res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('array');

			res.body[0].should.have.property('_id');
			res.body[0].should.have.property('name');
			res.body[0].should.have.property('title');
			res.body[0].should.have.property('department');
			res.body[0].should.have.property('img');
			res.body[0].should.have.property('modified');
			res.body[0].should.have.property('created');
			res.body[0].should.have.property('skills');

	    	done();
	    })
});
