export const saveUserName = (name) => {
    return {
        type: "SAVE_USER_NAME",
        userName: name
    }
}