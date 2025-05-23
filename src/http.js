
const http = {
    post: async (url, data) => {
        return fetch('http://localhost:8080/' + url, {method: 'POST', headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json;charset=UTF-8'
        }, body: data});
    }
};

export default http;