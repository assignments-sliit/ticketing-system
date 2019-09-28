/**
 *  NOTE TO DEVELOPERS: ALL VARIABLES SHOULD BE IN UPPERCASE LETTER AND SHOULD NOT EXCEED MORE THAN 50 CHARS!
 * - Manoj
 * 
 * 22-SEP-2019 : Manoj : Added the file.
 * 23-SEP-2019 : Manoj : Added some constants
 * 
 * 
 */

export class Constants {

    //Users
    static USER_ALREADY_EXISTS = "User already exists!";
    static SIGN_UP_SUCCESSFUL = "User Signed up Successfully";
    static SIGN_OUT_SUCCESSFUL = "Signed Out Successfully"
    static USER_TYPE_ADMIN = "admin";
    static USER_TYPE_USER = "user";
    static PHOTO_URL_DEFAULT = ""; //some google image


    //Routing and Pages
    static URL_HOME = '/home';
    static URL_ADMIN_HOME = '/admin-home';
    static URL_USER_HOME = '/user-home';
    static URL_MENU = '/menu';
    static URL_SIGN_UP = '/sign-up';


    //titles
    static ADMIN_HOME_TITLE = "Admin Home";
    static PROFILE_TITLE = "Profile";
    static USER_HOME_TITLE = "Home";
    static VIEW_TIME_TABLE_HOME_TITILE = "View Time Tables";


    //texts
    static PROFILE = "Profile";
    static HOME = "Home";


    //Error messages
    static UNKNOWN_ERROR_WITH_PARAMETER = "An Error occured:";


    //button texts (Should always be capital)
    static BTN_SIGN_IN_TEXT = "SIGN IN";
    static BTN_SIGN_UP_TEXT = "SIGN UP";


    //form labels
    static LBL_FRM_EMAIL = "Email";
    static LBL_FRM_PASSWORD = "Password";

    // static LBL_FRM_EMAIL_TAM="மின்னஞ்சல்";

    //FIREBASE AUTH ERRORS
    static FIREBASE_AUTH_WRONG_PASSWORD_CODE = "auth/wrong-password";
    static FIREBASE_AUTH_INVALID_EMAIL_CODE = "auth/invalid-email";
    static FIREBASE_AUTH_USER_NOT_FOUND = "auth/user-not-found";
    static FIREBASE_AUTH_TOO_MANY_REQUESTS="auth/too-many-requests";


    //alert headers
    static ALT_HD_INVALID_EMAIL = "Invalid Email ID";
    static ALT_HD_INCORRECT_PASSWORD = "Incorrect Password";
    static ALT_HD_TOO_MUCH_REQ="Calm down";

    //alert subtitles
    static ALT_ST_INVALID_EMAIL = "Invalid Email ID Provided!";
    static ALT_ST_INCORRECT_PASSWORD = "Incorrect Password Provided!";
    static ALT_ST_TOO_MUCH_REQ="Too many sign in attempts";

    //alert buttons
    static ALT_BTN_OK = "OKAY";

    //alert messages
    static ALT_MSG_INVALID_EMAIL = "You provided an invalid email ID. Please check again and re-enter a valid email!";
    static ALT_MSG_INCORRECT_PASSWORD1 = "The password you entered is wrong for ";
    static ALT_MSG_INCORRECT_PASSWORD2=". Please enter the correct password!"
    static ALT_MSG_TOO_MUCH_REQ="You have made too much sign in attempts! Please refresh or close the app and try again";


    
}