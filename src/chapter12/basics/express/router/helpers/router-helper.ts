//import body parser so that we can get post of json data and form data
//this requires npm install body-parser
import bodyParser from 'body-parser';

//declare the specific bodyparser for the type of content that will be handled by our router
export const jsonParser = bodyParser.json(); //for parsing body when the req type is application/json
export const urlencodedParser = bodyParser.urlencoded({ extended: false }); // for parsing body when the req type is application/x-www-form-urlencoded. Better to get used to extended = false because extended = true has been deprecated
export const textParser = bodyParser.text(); //for parsing body when the req type is plain/text

//import constants from settings that we plan to use for the storage environment of our uploaded files.
import {UPLOAD_DIR, MAX_FILE_SIZE, PRESERVE_PATH} from '../../settings';

//Let us import multer that will be required for files upload
//This requires npm install multer
import multer from 'multer';

//Below is a declaration of multer with simple setting for destination.
//const upload = multer({ dest: 'uploads/' }); //upload attempts will look in current code directory for a directory called uploads
//Alternatively, for more fine-grained control of storage location, use multers diskStorage() as organized below
const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {//Use this function to specify location
      cb(null, UPLOAD_DIR); //set destination
    },
    filename: function (_req, file, cb) {//Use this to modify the filename, if desired
      cb(null, file.fieldname + '-' + Date.now().valueOf); //here we have chosen to use the fieldname of file uploaded as the storage filename.
    }
})

//prepare multer options if desired. I am showing them here for illustration:
const multerOptions = {
  //see https://github.com/mscdex/busboy#busboy-methods for more info on available options.
  limits:{
    fileSize: MAX_FILE_SIZE, //integer in bytes. Default is infinite
  },
  preservePath: PRESERVE_PATH,
  storage: storage //this is the storage that has been created as multer.diskStorage() above
}

//finally, declare the multer upload middleware function.
export const upload = multer(multerOptions); //pass the multerOptions object literal.
//for more information on multer, see https://expressjs.com/en/resources/middleware/multer.html



