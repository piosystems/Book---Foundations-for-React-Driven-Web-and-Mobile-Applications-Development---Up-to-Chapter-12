"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_helper_1 = require("./helpers/router-helper");
//import our defined controllers
const home_1 = __importDefault(require("../controller/home"));
const register_1 = __importDefault(require("../controller/register"));
const process_registration_1 = __importDefault(require("../controller/process-registration"));
const about_us_1 = __importDefault(require("../controller/about-us"));
const admin_1 = __importDefault(require("../controller/admin"));
const other_demos_1 = require("../controller/other-demos");
/*setup routes*/
//declare the express router
const router = express_1.default.Router();
//define each route for the router just declared...
router
    .get("/", home_1.default)
    .get("/register", register_1.default)
    .post("/process-registration", process_registration_1.default)
    .get("/about-us", about_us_1.default)
    .get("/admin", admin_1.default)
    //Next, let us define URL routes with parameters in the URL
    .get("/hello/:name", other_demos_1.hello)
    //test above with http://localhost:3000/hello/Pius. The browser should display 'Hello Pius'.
    .get("/flights/:from-:to", other_demos_1.flights)
    //test above with http://localhost:3000/flights/LAX-SFO. The browser should display Flights from LAX to SFO
    //Get query parameters. Same as using get method in a form
    .get("/hello-form-get", other_demos_1.helloFormGet)
    //Test above using http://localhost:3000/hello-form-get?firstName=Pius&surname=Onobhayedo
    //Next, let us work with json content-type sent in request
    .post("/hello-json-post", router_helper_1.jsonParser, other_demos_1.helloJsonPost)
    //test above with curl -d '{"firstName":"Pius", "surname":"Onobhayedo"}' -H "Content-Type: application/json" -X POST http://localhost:3000/hello-json-post
    //next, let us work with form post without file upload
    .post("/hello-form-post", router_helper_1.urlencodedParser, other_demos_1.helloFormPost)
    //test above with curl -d "firstName=Pius&surname=Onobhayedo" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:3000/hello-form-post
    //Let us receive multipart/form-data - uploaded file(s) and form fields - using multer. Here we use multer's upload.single which is for only one file upload. For multiple, see upload.array and upload.fields in the URL https://expressjs.com/en/resources/middleware/multer.html
    .post("/hello-form-post-with-file", router_helper_1.upload.single('myfile'), other_demos_1.helloFormPostWithFile)
    //To test the above, use curl -F "firstName=Pius" -F "surname=Onobhayedo" -F "myfile=@data.txt" -H "Content-Type: multipart/form-data" -X POST http://localhost:3000/hello-form-post-with-file
    //Set route for Not-Found situation
    .use(async (req, res, _next) => {
    res.status(400).send(`Cannot find the url ${req.url}`);
})
    //Set route for other errors. Not found is not considered an error strictly speaking.
    .use(async (error, _req, res, _next) => {
    res.status(500).send(`Something is wrong!: ${error.message}`);
});
exports.default = router;
//# sourceMappingURL=router.js.map