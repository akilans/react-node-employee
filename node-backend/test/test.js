let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect;

chai.use(chaiHttp);

let url = "http://localhost:5000/api";

let login_data = { user_name: "admin", password: "admin" };

describe("Testing API call without login", () => {  // <= Pass in done callback

    it("GET /api should give 200 response", (done) => {
        chai.request(url)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();                               // <= Call done to signal callback end
            });
    })

    it('GET api/getEmployees without authorization should throw 403 status', (done) => {   // <= No done callback
        chai.request(url)
            .get('/getEmployees')
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            });
    });

})


describe("Testing API call with login", () => {

    let token;

    beforeEach((done) => {
        chai
            .request(url)
            .post('/login')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(login_data))
            .end((err, response) => {
                if (err) {
                    done(err);
                } else {
                    token = response.body.token;
                    //console.log(`Token beforeEach - ${token}`);
                    done();
                }
            })
    })

    it('should run test and invoke hooks', (done) => {
        //console.log(`Token in test - ${token}`);
        expect(1).to.equal(1);
        done();
    });

    it("Get Employees with Login", (done) => {
        chai
            .request(url)
            .get('/getEmployees')
            .set('Content-Type', 'application/json')
            .set("Authorization", `Bearer ${token}`)
            .end((err, response) => {
                expect(err).to.be.null;
                expect(response).to.have.status(200);
                done();
            })
    })

})