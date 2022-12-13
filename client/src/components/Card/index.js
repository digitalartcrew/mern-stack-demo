import React from "react";

const Card = ({ id, url, title, description }) => {
  return (
    <div className="col-md-3">
      <div className="card" data-car-id={id}>
        <img src={url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">${title}</h5>
          <p className="card-text">${description}</p>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#createUpdateModal"
            >
              Update
            </button>
            <button
              type="button"
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
