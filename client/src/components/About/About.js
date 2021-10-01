import React from "react";

function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">About Us</h1>
            <p>
              This was developed by iJane! We are students at the Univeristy of
              Melbourne :)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
