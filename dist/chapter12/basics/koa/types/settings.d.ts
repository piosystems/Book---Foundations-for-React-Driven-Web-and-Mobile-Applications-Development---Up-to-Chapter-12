export declare const UPLOAD_DIR: string;
export declare const STATIC_DIR: string;
export declare const VIEWS_BASE_PATH = "view/template";
export declare enum TERM_OR_SEMESTER {
    FIRST = 1,
    SECOND = 2,
    THIRD = 3,
    FOURTH = 4,
    NOT_SPECIFIED = 5
}
export declare enum Gender {
    M = "Male",
    F = "Female"
}
export declare enum EmploymentStatus {
    FULLTIME_REGULAR = "Full time regular",
    FULLTIME_CONTRACT = "Full time contract",
    ADJUNCT = "Adjunct faculty",
    GUEST = "Guest lecturer"
}
export declare enum GradeCategory {
    AT = "Attendance",
    CP = "Class participation",
    CA1 = "Continuous assessment 1",
    CA2 = "Continuous assessment 2",
    CA3 = "Continuous assessment 3",
    Exam = "Examination"
}
export declare enum QualificationInView {
    BSC = "Bachelor of Science",
    BA = "Bachelor of Arts",
    MSC = "Master of Science",
    MA = "Master of Arts",
    PHD = "Doctor of Philosophy",
    PGD = "Postgraduate Diploma",
    CERT = "Certificate Program"
}
export declare enum Level {
    ONE = "100",
    TWO = "200",
    THREE = "300",
    FOUR = "400",
    FIVE = "500",
    SIX = "600",
    SEVEN = "700",
    NOT_SPECIFIED = "No level specification"
}
export declare const PASSWORD_RESET_EXPIRATION: number;
export declare const smtpTransport: any;
export declare const ResetPasswordMailOptionSettings: {
    textTemplate: string;
    subject: string;
    from: string;
};
export declare const connectionType = "postgres";
