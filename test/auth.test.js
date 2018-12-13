const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const app = require('../app');
chai.use(require('chai-http'));


const mockUser = {
    email: 'bob',
    password: 'bob'
}
describe("Authentication Tests:", () => {

    // Test Signup
    it("Should Create a new user and return a cookie", (done) => {
        // Get original amount of users
        User.find({}).then(users => {
            // Attempt to create a new user
            chai.request(app).post('/api/auth/signup').send({
                name: 'bob',
                ...mockUser
            }).end(async (error, res) => {
                if (error) done(error);
                const newUsers = await User.find({});
                expect(res).to.have.status(200);
                expect(res).to.have.cookie('UnToken');
                expect(newUsers.length).to.eql(users.length + 1);
                return done();
            });
        });

    });

    // Test Signin
    it("Should return the user object and return a cookie", (done) => {
        chai.request(app).post('/api/auth/signin').send(mockUser).end((error, res) => {
            if (error) done(error);
            expect(res).to.have.status(200);
            done();
        });
    });

    // Test Logout
    it("Should remove the cookie from the user", (done) => {

        // Log the mock user in
        chai.request(app).post('/api/auth/signin').send(mockUser).end((error, res) => {

            if (error) done(error);

            // Retest that the response has a cookie
            expect(res).to.have.cookie('UnToken');

            // Attempt to sign the mock user out
            chai.request(app).get('/api/auth/signout').end((err, resp) => {
                if (err) done(err);
                // Ensure there is no more UnToken in the responses cookies
                expect(resp).to.not.have.cookie('UnToken');

                done();
            });
        });
    });

});