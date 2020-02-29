//These setttings are typically read from a config file or database when a program starts up.
import path from 'path';
//below will look for uploads folder in dist/express where the running index.js resides. Ensure that it is created.
export const UPLOAD_DIR = path.join(__dirname,'uploads');
export const MAX_FILE_SIZE = 1000000; //integer in bytes required
export const PRESERVE_PATH = false;

export const VIEWS_BASE_PATH = 'view/templates'; //location for where to find template files relative to index.js location