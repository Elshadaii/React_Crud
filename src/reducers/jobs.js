import {
  CREATE_JOB,
  RETRIEVE_JOBS,
  UPDATE_JOB,
  DELETE_JOB,
  DELETE_ALL_JOBS,
} from "../actions/types";

const initialState = [];

function jobReducer(jobs = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_JOB:
      return [...jobs, payload];

    case RETRIEVE_JOBS:
      return payload;

    case UPDATE_JOB:
      return jobs.map((job) => {
        if (job.id === payload.id) {
          return {
            ...job,
            ...payload,
          };
        } else {
          return job;
        }
      });

    case DELETE_JOB:
      return jobs.filter(({ id }) => id !== payload.id);

      
    case DELETE_ALL_JOBS:
      return [];

    default:
      return jobs;
  }
}

export default jobReducer;
