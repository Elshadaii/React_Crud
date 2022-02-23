import {
    CREATE_JOB,
    RETRIEVE_JOBS,
    UPDATE_JOB,
    DELETE_JOB,
    DELETE_ALL_JOBS
} from "./types";

import JobDataService from "../services/job.service";

export const createJob = (title, description) => async(dispatch) => {
    try {
        const res = await JobDataService.create({ title: title, job_desc: description });
        dispatch({
            type: CREATE_JOB,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveJobs = () => async(dispatch) => {
    try {
        const res = await JobDataService.getAll();
        console.log(res)
        dispatch({
            type: RETRIEVE_JOBS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateJob = (id, data) => async(dispatch) => {
    try {
        const res = await JobDataService.update(id, data);

        dispatch({
            type: UPDATE_JOB,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteJob = (id) => async(dispatch) => {
    try {
        await JobDataService.delete(id);

        dispatch({
            type: DELETE_JOB,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllJobs = () => async(dispatch) => {
    try {
        const res = await JobDataService.deleteAll();

        dispatch({
            type: DELETE_ALL_JOBS,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findJobsByTitle = (title) => async(dispatch) => {
    try {
        const res = await JobDataService.findByTitle(title);

        dispatch({
            type: RETRIEVE_JOBS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};