import http from "../http-common";
import axios from "axios";
class JobDataService {
    async getAll() {
        return await http.get('/jobs')
    }

    get(id) {
        return http.get(`/jobs/${id}`);
    }

    async create(data) {

        try {
            console.log(data)
            const { token } = JSON.parse(localStorage.getItem('user'))
            return await http.post('/jobs', JSON.stringify(data), {
                headers: {
                    "content-type": 'application/json',
                    "authorization": `Bearer ${token} `
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    async update(id, data) {
        console.log(id, data)
        try {
            const { token } = JSON.parse(localStorage.getItem('user'))
            return await http.put(`/jobs/${id}`, JSON.stringify(data), {
                headers: {
                    "content-type": 'application/json',
                    "authorization": `Bearer ${token} `
                },
            })
        } catch (e) {
            console.log(e)
        }
    }

    async delete(id) {

        try {
            const { token } = JSON.parse(localStorage.getItem('user'))
            await http.delete(`/jobs/${id}`, {
                headers: {
                    "authorization": `Bearer ${token} `
                },
            });

        } catch (e) {
            console.log(e)
        }

    }

    deleteAll() {
        return http.delete(`/jobs`);
    }

    findByTitle(title) {
        return http.get(`/jobs?title=${title}`);
    }
}

export default new JobDataService();