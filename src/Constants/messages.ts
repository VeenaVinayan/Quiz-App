export const MESSAGES ={
    SUCCESS: 'Request Successful',
    CREATED: ' Resource Created !',
    ERROR:'Error occured !',
    LOGIN_SUCCESS:"Login successfully",
    LOGIN_FAILED:"Login Failed ",
    LOGOUT_SUCCESS:"Logout successfully"
} as const;

export type StatusMessage =  typeof MESSAGES[keyof typeof MESSAGES];