import nunjucks from 'nunjucks';
export declare const renderEngine: nunjucks.Environment;
declare const render: (path: string, params?: Object) => Promise<{}>;
export default render;
