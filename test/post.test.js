const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const User = require('../models/user');
const Post = require('../models/post');
const app = require('../app');
const request = require('superagent');
chai.use(require('chai-http'));

var mockPost = {
    title: 'Hello there',
    content: 'Ayy',
    author: '5c11d9eabe07d305626ca263'
};
const mockUser = {
    email: 'bob',
    password: 'bob'
}
var Cookies;
var newPostId;

describe('Post Tests: ', () => {

    // Log user in before running these tests

    beforeEach((done) => {
        chai.request(app)
            .post('/api/auth/signin')
            .send(mockUser)
            .end(function (err, res) {
                Cookies = res.headers['set-cookie'].pop().split(';')[0];
                done();
            });
    });

    it('Should create new post', function (done) {
        var ogPostsLength;
        var ogUsersPostsLength;
        Post.find({}).then(posts => {
            ogPostsLength = posts.length;
            return User.findOne({ email: 'bob' });
        }).then(user => {
            mockPost.author = user._id;
            ogUsersPostsLength = user.posts.length;
            chai.request(app).post('/api/posts').set('Cookie', Cookies).send(mockPost).end(function (error, res) {
                expect(res).to.be.json;
                expect(res).to.have.status(200);
                Post.find({}).then(posts => {
                    expect(posts.length).to.eql(ogPostsLength + 1);
                    User.findOne({ email: 'bob' }).then(user => {
                        newPostId = user.posts[user.posts.length - 1];
                        expect(user.posts.length).to.eql(ogUsersPostsLength + 1);
                        done();
                    });
                })

            });
        });

    });


    // should return post
    it('should return post', function (done) {
        chai.request(app).get(`/api/posts/${newPostId}`).end(function (error, res) {
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            expect(res.body.title).to.eql(mockPost.title);
            expect(res.body.content).to.eql(mockPost.content);
            done();
        });
    });

    // should update post
    it('should update post', function (done) {
        chai.request(app).patch(`/api/posts/${newPostId}`).set('Cookie', Cookies).send({
            title: "Hello not there"
        }).end(function (error, res) {
            expect(res).to.be.json;
            expect(res).to.have.status(200);
            Post.findById(newPostId).then(post => {
                expect(post.title).to.eql('Hello not there');
                done();
            });
        });
    });
    // // should delete post
    // it('should delete post', async (done) => {
    //     const currPosts = await Post.find({});
    //     const currUserPosts = await User.findOne({ email: 'bob' });
    //     return chai.request(app).del(`/api/posts/${newPostId}`).end(async (erorr, res) => {
    //         expect(res).to.have.status(200);
    //         expect(res).to.be.json;
    //         const newPosts = await Post.find({});
    //         const newUserPosts = await User.findOne({});
    //         expect(newPosts.count).to.eql(currPosts.count + 1);
    //         expect(newUserPosts.count).to.eql(currUserPosts.count + 1);
    //         // Eventually have this route also delete all of the comments made on this post
    //         return done();
    //     });
    // });

    // DELETE
    it('Should delete post', function (done) {
        let currentPostsLength;
        let usersPostsLength;
        Post.find({}).then(posts => {
            currentPostsLength = posts.length;
            return User.findOne({ email: 'bob' })
        }).then(user => {
            usersPostsLength = user.posts.length;

            chai.request(app).del(`/api/posts/${newPostId}`).set('Cookie', Cookies).end(function (error, res) {
                expect(res).to.be.json;
                expect(res).to.have.status(200);

                Post.find({}).then(posts => {
                    expect(posts.length).to.eql(currentPostsLength - 1);
                    return User.findOne({ email: 'bob' });
                }).then(updatedUser => {
                    expect(updatedUser.posts.length).to.eql(usersPostsLength - 1);
                    done();
                });
            });
        });
    });

});