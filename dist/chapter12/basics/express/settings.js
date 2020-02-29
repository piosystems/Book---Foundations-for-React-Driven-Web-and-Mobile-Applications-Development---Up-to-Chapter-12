"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//These setttings are typically read from a config file or database when a program starts up.
const path_1 = __importDefault(require("path"));
//below will look for uploads folder in dist/express where the running index.js resides. Ensure that it is created.
exports.UPLOAD_DIR = path_1.default.join(__dirname, 'uploads');
exports.MAX_FILE_SIZE = 1000000; //integer in bytes required
exports.PRESERVE_PATH = false;
exports.VIEWS_BASE_PATH = 'view/templates'; //location for where to find template files relative to index.js location
//# sourceMappingURL=settings.js.map