import { Context } from 'koa';
export declare const routerOpts: Object;
export declare const koaBodyOptionsWithfileUploadOptions: {
    "multipart": boolean;
    "formidable": Object;
    "onError": (error: Error, ctx: Context) => void;
};
export declare const httpMethod: {
    'GET': "GET";
    'POST': "POST";
    'PUT': "PUT";
    'PATCH': "PATCH";
    'DELETE': "DELETE";
};
