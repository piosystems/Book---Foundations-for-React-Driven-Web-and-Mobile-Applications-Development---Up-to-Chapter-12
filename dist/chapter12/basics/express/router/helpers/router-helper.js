"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import body parser so that we can get post of json data and form data
//this requires npm install body-parser
const body_parser_1 = __importDefault(require("body-parser"));
//declare the specific bodyparser for the type of content that will be handled by our router
exports.jsonParser = body_parser_1.default.json(); //for parsing body when the req type is application/json
exports.urlencodedParser = body_parser_1.default.urlencoded({ extended: false }); // for parsing body when the req type is application/x-www-form-urlencoded. Better to get used to extended = false because extended = true has been deprecated
exports.textParser = body_parser_1.default.text(); //for parsing body when the req type is plain/text
//import constants from settings that we plan to use for the storage environment of our uploaded files.
const settings_1 = require("../../settings");
//Let us import multer that will be required for files upload
//This requires npm install multer
const multer_1 = __importDefault(require("multer"));
//Below is a declaration of multer with simple setting for destination.
//const upload = multer({ dest: 'uploads/' }); //upload attempts will look in current code directory for a directory called uploads
//Alternatively, for more fine-grained control of storage location, use multers diskStorage() as organized below
const storage = multer_1.default.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, settings_1.UPLOAD_DIR); //set destination
    },
    filename: function (_req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now().valueOf); //here we have chosen to use the fieldname of file uploaded as the storage filename.
    }
});
//prepare multer options if desired. I am showing them here for illustration:
const multerOptions = {
    //see https://github.com/mscdex/busboy#busboy-methods for more info on available options.
    limits: {
        fileSize: settings_1.MAX_FILE_SIZE,
    },
    preservePath: settings_1.PRESERVE_PATH,
    storage: storage //this is the storage that has been created as multer.diskStorage() above
};
//finally, declare the multer upload middleware function.
exports.upload = multer_1.default(multerOptions); //pass the multerOptions object literal.
//for more information on multer, see https://expressjs.com/en/resources/middleware/multer.html
//# sourceMappingURL=router-helper.js.map