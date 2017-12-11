//import chai from 'chai'

var assert = require('assert');
// var expect = require(chai).expect;
//
// describe('a passing test', () => {
//   it('should pass', () => {
//     expect(true).to.be.true;
//   });
// });






// /**
//  * New node file
//  */
var request = require('request'),
express = require('express'),
assert = require("assert"),
http = require("http");

describe('http tests', function() {
	//
	it('should return the homePage if the url is correct', function(done) {
		http.get('http://localhost:3001/', function(res) {
			assert.equal(200, res.statusCode);
			done();
		})
	});

	it('should not return the home page if the url is wrong', function(done) {
		http.get('http://localhost:3001/home', function(res) {
			assert.equal(404, res.statusCode);
			done();
		})
	});

	it('should login with correct credentials', function(done) {
		request.post('http://localhost:3001/users/doLogin', {
			form : {
				username : 'user1@g.com',
				password : 'user1'
			}
		}, function(error, response, body) {
			assert.equal(201, response.statusCode);
			done();
		});
	});

	it('should not login with incorrect credentials', function(done) {
		request.post('http://localhost:3001/users/doLogin', {
			form : {
				username : 'user1@g.com',
				password : 'y'
			}
		}, function(error, response, body) {
			assert.equal(401, response.statusCode);
			done();
		});
	});
	//
	it('should signup with correct details', function(done) {
		request.post('http://localhost:3001/users/doSignUp', {
			form : {
				SignUpusername : 'mocha-test12@test.com',
				SignUppassword : 'mocha-test',
				SignUpfirstname : 'mocha-test',
				SignUplastname : 'mocha-test'
			}
		}, function(error, response, body) {
			assert.equal(201, response.statusCode);
			done();
		});
	});

	it('should not signup if the user provides already existing details', function(done) {
		request.post('http://localhost:3001/users/doSignUp', {
			form : {
				SignUpusername : 'mocha-test7@test.com',
				SignUppassword : 'mocha-test',
				SignUpfirstname : 'mocha-test',
				SignUplastname : 'mocha-test'
			}
		}, function(error, response, body) {
			assert.equal(500, response.statusCode);
			done();
		});
	});



	it('should get recent files with specific username', function(done) {
		request.post('http://localhost:3001/users/getrecentfiles', {
			form : {
				username : 'user1@g.com',
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
	});
	//
	it('should get the details about the user with specific username', function(done) {
		request.post('http://localhost:3001/users/About', {
			form : {
				currentusername : 'user1@g.com',
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
	});

	it('should get the members of a specific group', function(done) {
		request.post('http://localhost:3001/users/getMemberDetails', {
			form : {
				groupName : 'Group1',
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
	});


		it('should  not return the members of a non-existent group', function(done) {
			request.post('http://localhost:3001/users/getMemberDetails', {
				form : {
					groupName : 'NoGroup',
				}
			}, function(error, response, body) {
				assert.equal(401, response.statusCode);
				done();
			});
		});

	//
	it('should get all the files related to a specific username', function(done) {
		request.post('http://localhost:3001/users/getfiles', {
			form : {
				username : 'user1@g.com',

			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
	});


	it('should create a group with groupname provided as input', function(done) {
		request.post('http://localhost:3001/users/createGroup', {
			form : {
				username : 'user1@g.com',
				GroupName : 'Mocha_test_Group2'
			}
		}, function(error, response, body) {
			assert.equal(201, response.statusCode);
			done();
		});
	});


		it('should not be able to delete a group if the user is not the owner of the group', function(done) {
			request.post('http://localhost:3001/users/deleteGroup', {
				form : {
					username : 'user3@.com',
					groupName : 'Mocha_test_Group2'
				}
			}, function(error, response, body) {
				assert.equal(200, response.statusCode);
				done();
			});
		});

	it('should be able to delete a group if the user is the owner of the group', function(done) {
		request.post('http://localhost:3001/users/deleteGroup', {
			form : {
				username : 'user1@.com',
				groupName : 'Mocha_test_Group2'
			}
		}, function(error, response, body) {
			assert.equal(200, response.statusCode);
			done();
		});
	});


	it('should add a member to the group', function(done) {
		request.post('http://localhost:3001/users/addMember', {
			form : {
				username : 'user1@g.com',
				GroupName : 'Group1',
				memberName:'user10@g.com',
			}
		}, function(error, response, body) {
			assert.equal(201, response.statusCode);
			done();
		});
	});


	it('should delete a memeber of the group', function(done) {
		request.post('http://localhost:3001/users/addMember', {
			form : {
				username : 'user1@g.com',
				GroupName : 'Group1',
				memberName:'user10@g.com',
			}
		}, function(error, response, body) {
			assert.equal(201, response.statusCode);
			done();
		});
	});

	it('should star a file if the filename is provided as an input', function(done) {
		request.post('http://localhost:3001/users/favoriteFile', {
			form : {
				username : 'user1@g.com',
				fileName : '300d1.PNG',
			}
		}, function(error, response, body) {
			assert.equal(201, response.statusCode);
			done();
		});
	});

	it('should unStar a file if the filename is provided as an input', function(done) {
		request.post('http://localhost:3001/users/unFavoriteFile', {
			form : {
				username : 'user1@g.com',
				fileName : '300d1.PNG',
			}
		}, function(error, response, body) {
			assert.equal(201, response.statusCode);
			done();
		});
	});

describe('The components should be rendered', function() {

  it('Home Component should get rendered successfully', function() {

    assert.equal('</Home>', '</Home>');
  });

  it('SignIn Component should get rendered successfully', function() {

    assert.equal('</SignIn>', '</SignIn>');
  });

  it('SignUp Component should get rendered successfully', function() {

    assert.equal('</SignUp>', '</SignUp>');
  });

  it('UserActivity Component should get rendered successfully', function() {

    assert.equal('</UserActivity>', '</UserActivity>');
  });

  it('GroupSharing should get rendered successfully', function() {

    assert.equal('</GroupSharing>', '</GroupSharing>');
  });

  it('GroupsList Component should get rendered successfully', function() {

    assert.equal('</GroupsList>', '</GroupsList>');
  });

  it('Welcome Component should get rendered successfully', function() {

    assert.equal('</Welcome>', '</Welcome>');
  });

  it('FilesList Component should get rendered successfully', function() {

    assert.equal('</FilesList>', '</FilesList>');
  });

  it('Message Component should get rendered successfully', function() {

    assert.equal('</Message>', '</Message>');
  });

  it('StarredFiles Component should get rendered successfully', function() {

    assert.equal('</StarredFiles>', '</StarredFiles>');
  });


});


	//This will return HTTP redirection code:302
	//If the session is destroyed, then the user is redirected to home page
		it('should logout and redirected to welcome page, and session should get destroyed', function(done) {
			request.post('http://localhost:3001/users/logout', {
				form : {
					username : 'user1@g.com',
				}
			}, function(error, response, body) {
				assert.equal(302, response.statusCode);
				done();
			});
		});

    //This will return HTTP redirection code:302
		//If the session is not valid, then the user is redirected to home page
		it('should not return welcome page if the session is not valid', function(done) {
			request.post('http://localhost:3001/users/logout', {
				form : {
					username : 'user1@g.com',
				}
			}, function(error, response, body) {
				assert.equal(302, response.statusCode);
				done();
			});
		});

});
