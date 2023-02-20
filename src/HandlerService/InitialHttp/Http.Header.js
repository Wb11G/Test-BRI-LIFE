export default function setHTTPHeader() {
    const user = sessionStorage.getItem("token");

    if (user) {
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Authorization': `Bearer ${user}`,
        }
    } else {
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        }
    };
};