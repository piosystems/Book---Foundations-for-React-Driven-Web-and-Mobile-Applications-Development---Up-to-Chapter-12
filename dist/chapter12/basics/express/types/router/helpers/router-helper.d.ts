/// <reference types="connect" />
export declare const jsonParser: import("connect").NextHandleFunction;
export declare const urlencodedParser: import("connect").NextHandleFunction;
export declare const textParser: import("connect").NextHandleFunction;
import multer from 'multer';
export declare const upload: multer.Instance;
