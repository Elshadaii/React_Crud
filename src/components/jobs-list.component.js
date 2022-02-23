import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveJobs,
  findJobsByTitle,
  deleteAllJobs,
} from "../actions/job";
import { Link } from "react-router-dom";

class JobsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllJobs = this.removeAllJobs.bind(this);

    this.state = {
     currentJob: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.retrieveJobs();
  }
  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;
    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
     currentJob: null,
      currentIndex: -1,
    });
  }

  setActiveJob(job, index) {
    this.setState({
     currentJob: job,
      currentIndex: index,
    });
  }

  removeAllJobs() {
    this.props
      .deleteAllJobs()
      .then((response) => {
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findJobsByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle,currentJob, currentIndex } = this.state;
    const { jobs } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            {/* <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div> */}
          </div>
        </div>
        <div className="col-md-6">
          <h4>Jobs List</h4>

          <ul className="list-group">
            {jobs &&
              jobs.filter((_job) => _job.title.includes(this.state.searchTitle)).map((job, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveJob(job, index)}
                  key={index}
                >
                  {job.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllJobs}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentJob ? (
            <div>
              <h4>Job</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentJob.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentJob.job_desc}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentJob.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/jobs/" +currentJob.job_id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Job...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    jobs: state.jobs,
  };
};

export default connect(mapStateToProps, {
  retrieveJobs,
  findJobsByTitle,
  deleteAllJobs,
})(JobsList);