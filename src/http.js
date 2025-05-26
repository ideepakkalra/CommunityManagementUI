
const http = {
    post: async (url, data) => {
        return http.handleResponse(
            await fetch('http://localhost:8080/' + url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: data
            })
        );
    },
    get: async (url) => {
        return http.handleResponse(
            await fetch('http://localhost:8080/' + url, { 
                method: 'GET', 
                headers: {
                    'Accept': 'application/json, text/plain',
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            })
        );
    },
    handleResponse: async (response) => {
        if (response.ok) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        if (response.status === 400) {
            return Promise.reject(new Error('Bad Request'));
        } else if (response.status === 401) {
            // TODO: Handle unauthorized access, e.g., redirect to login
            return Promise.reject(new Error('Unauthorized'));
        } else if (response.status === 403) {
            return Promise.reject(new Error('Forbidden'));
        } else if (response.status === 404) {
            return Promise.reject(new Error('Not Found'));
        } else if (response.status === 500) {
            return Promise.reject(new Error('Internal Server Error'));
        } else {
            return Promise.reject(new Error('Unexpected error: ' + response.status));
        }
    }
};

export default http;