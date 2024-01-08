export const useGetUserInfo = () => {
    const userData = localStorage.getItem("user");

    if (userData) {
        const { name, userID, profile, isAuth } = JSON.parse(userData);
        return { name, userID, profile, isAuth };
    } else {
        // Handle the case where no user data is found in localStorage
        return { name: null, userID: null, profile: null, isAuth: false };
    }
};
