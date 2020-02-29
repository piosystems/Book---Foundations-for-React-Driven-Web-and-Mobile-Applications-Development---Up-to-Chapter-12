"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
//below will look for uploads folder in dist/koa where the running index.js resides. Ensure that it is created.
exports.UPLOAD_DIR = path.join(__dirname, 'uploads');
//below is for static directory
exports.STATIC_DIR = path.join(__dirname, 'static');
exports.VIEWS_BASE_PATH = 'view/template'; //location for where to find template files relative to index.js location
//illustrate direct enum use here. May be better to have another table relation for them.
var TERM_OR_SEMESTER;
(function (TERM_OR_SEMESTER) {
    TERM_OR_SEMESTER[TERM_OR_SEMESTER["FIRST"] = 1] = "FIRST";
    TERM_OR_SEMESTER[TERM_OR_SEMESTER["SECOND"] = 2] = "SECOND";
    TERM_OR_SEMESTER[TERM_OR_SEMESTER["THIRD"] = 3] = "THIRD";
    TERM_OR_SEMESTER[TERM_OR_SEMESTER["FOURTH"] = 4] = "FOURTH";
    TERM_OR_SEMESTER[TERM_OR_SEMESTER["NOT_SPECIFIED"] = 5] = "NOT_SPECIFIED";
})(TERM_OR_SEMESTER = exports.TERM_OR_SEMESTER || (exports.TERM_OR_SEMESTER = {}));
var Gender;
(function (Gender) {
    Gender["M"] = "Male";
    Gender["F"] = "Female";
})(Gender = exports.Gender || (exports.Gender = {}));
var EmploymentStatus;
(function (EmploymentStatus) {
    EmploymentStatus["FULLTIME_REGULAR"] = "Full time regular";
    EmploymentStatus["FULLTIME_CONTRACT"] = "Full time contract";
    EmploymentStatus["ADJUNCT"] = "Adjunct faculty";
    EmploymentStatus["GUEST"] = "Guest lecturer"; //may not be in use
})(EmploymentStatus = exports.EmploymentStatus || (exports.EmploymentStatus = {}));
var GradeCategory;
(function (GradeCategory) {
    GradeCategory["AT"] = "Attendance";
    GradeCategory["CP"] = "Class participation";
    GradeCategory["CA1"] = "Continuous assessment 1";
    GradeCategory["CA2"] = "Continuous assessment 2";
    GradeCategory["CA3"] = "Continuous assessment 3";
    GradeCategory["Exam"] = "Examination";
})(GradeCategory = exports.GradeCategory || (exports.GradeCategory = {}));
var QualificationInView;
(function (QualificationInView) {
    QualificationInView["BSC"] = "Bachelor of Science";
    QualificationInView["BA"] = "Bachelor of Arts";
    QualificationInView["MSC"] = "Master of Science";
    QualificationInView["MA"] = "Master of Arts";
    QualificationInView["PHD"] = "Doctor of Philosophy";
    QualificationInView["PGD"] = "Postgraduate Diploma";
    QualificationInView["CERT"] = "Certificate Program";
})(QualificationInView = exports.QualificationInView || (exports.QualificationInView = {}));
var Level;
(function (Level) {
    Level["ONE"] = "100";
    Level["TWO"] = "200";
    Level["THREE"] = "300";
    Level["FOUR"] = "400";
    Level["FIVE"] = "500";
    Level["SIX"] = "600";
    Level["SEVEN"] = "700";
    Level["NOT_SPECIFIED"] = "No level specification";
})(Level = exports.Level || (exports.Level = {}));
exports.PASSWORD_RESET_EXPIRATION = 86400000 * 2; //24 hours * 2 in milliseconds
//Prepare nodemailer using sendgrid. I signed up for one. 
//See https://nodemailer.com/smtp/; https://nodemailer.com/smtp/#authentication
const NodemailerOptions = {
    pool: true,
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    auth: {
        user: "apikey",
        pass: "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"
    },
    logger: true,
};
exports.smtpTransport = nodemailer_1.default.createTransport(NodemailerOptions);
exports.ResetPasswordMailOptionSettings = {
    textTemplate: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n
    Please click on the following link, or paste this into your browser to complete the process:\n\n
    {url}
    If you did not request this, please ignore this email and your password will remain unchanged.\n\n`,
    //replyAddress: "noreply@pau.edu.ng",
    subject: "Reset Password - pau.edu.ng",
    from: "noreply@pau.edu.ng"
};
exports.connectionType = 'postgres';
