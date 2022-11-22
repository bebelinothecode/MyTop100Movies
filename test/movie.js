// process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
// const movie = require('../models/movie');


chai.should();
chai.use(chaiHttp);

describe('Movie API',() => {


    describe('/GET movies',() => {
        it('it should GET all the movies',(done) => {
            chai.request('http://localhost:3000/api/v1/movies')
                .get('/')
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('movie');
                    done();
                });
        });

        it('it should NOT GET all the movies',(done) => {
            chai.request(app)
                .get('/movies')
                .end((err,res) => {
                    // should.exist(res.body);
                    res.should.have.status(404);
                    // res.body.should.be.a('object');
                    // res.body.should.have.property('movie');
                    done();
                });
        });
    });

    

    /*
    *Test the /POST route
    */
   describe('/POST book',() => {
        it('it should POST a new movie',(done)=>{
            const Movie = {
                nameOfMovie:"The Lord of the Rings",
                genre:"non-fiction",
                isMovieSelection:true,
                movieScore:80
            };
            chai.request('http://localhost:3000/api/v1/movies')
                .post('/')
                .send(Movie)
                .end((err,res)=>{
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.movie.should.have.property('movie');
                    res.body.movie.should.have.property('nameOfMovie');
                    done();
                });
        });
   });

   describe('/GET/:id movie',() => {
    it('it should GET a movie by the given id',(done) => {
        const movieID = '637c2e42487b7744cbe22726';
            chai.request('http://localhost:3000/api/v1/movies')
                .get('/' + movieID)
                // .send(movie)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('movie');
                    res.body.should.have.property('_id').eql(movieID);
                    done();
                });
        });
    });

    describe('/PUT book',() => {
        it('it should PUT a new movie',(done)=>{
            const movieID = '637c2e42487b7744cbe22726'
            const Movie = {
                nameOfMovie:"The Lord",
                genre:"non-fiction",
                movieScore:50
            };
            chai.request('http://localhost:3000/api/v1/movies')
                .put('/'+movieID)
                .send(Movie)
                .end((err,res)=>{
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.movie.should.have.property('movie');
                    res.body.movie.should.have.property('nameOfMovie');
                    done();
                });
        });
   });

   describe('/DELETE book',() => {
    it('it should DELETE a movie',(done)=>{
        const movieID = '637c2e42487b7744cbe22726';
        chai.request('http://localhost:3000/api/v1/movies')
            .delete('/'+movieID)
            .send(Movie)
            .end((err,res)=>{
                res.should.have.status(200);
            done();
            });
    });
});
describe('/GET movie selections',() => {
    it('it should GET movie selections',(done)=>{
        chai.request('http://localhost:3000/api/v1/movies')
            .get('/favourites')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
            });
    });
});

describe('/GET ranked movie selections',() => {
    it('it should GET ranked movie selections',(done)=>{
        chai.request('http://localhost:3000/api/v1/movies')
            .get('/rankmovies')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
            });
    });
});
});