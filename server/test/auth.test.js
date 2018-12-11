const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const app = require('../app');
chai.use(require('chai-http'));
chai.use(require('cookie-parser'));

describe("Authentication Tests:", () => {

    // Test Signup
    it("Should Create a new user and return a cookie", (done) => {
        // Get original amount of users
        User.find({}).then(users => {
            // Attempt to create a new user
            chai.request(app).post('/signup').send({
                name: 'Ikey Benzaken',
                email: 'ikey.benz@gmail.com',
                password: 'myPassword'
            }).end(async (error, res) => {
                if (error) done(error);
                const newUsers = await User.find({});
                expect(res).to.have.status(200);
                expect(res).to.have.cookie('UnToken');
                expect(newUsers.length).to.eql(users.length + 1);

                const uid = jwt.decode(res.cookies.UnToken, process.env.CLIENT_SECRET)._id;
                expect(res.locals.authenticatedUser._id).to.eql(uid);
                return done();
            });
        });

    });

    // Test Signin
    it("Should return the user object and return a cookie", (done) => {
        chai.request(app).post('/signin').send({
            email: 'ikey.benz@gmail.com',
            password: 'myPassword'
        }).end((error, res) => {
            if (error) done(error);
            expect(res).to.have.status(200);
            done();
        });
    });

    // Test Logout
    it("Should remove the cookie from the user", (done) => {

        // Log the mock user in
        chai.request(app).post('/signin').send({
            email: 'ikey.benz@gmail.com',
            password: 'myPassword'
        }).end((error, res) => {

            if (error) done(error);

            // Retest that the response has a cookie
            expect(res).to.have.cookie('UnToken');

            // Attempt to sign the mock user out
            chai.request(app).get('/signout').end((err, resp) => {
                if (err) done(err);
                // Ensure there is no more UnToken in the responses cookies
                expect(resp).to.not.have.cookie('UnToken');

                done();
            });
        });
    });

});