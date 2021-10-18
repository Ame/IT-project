import React from "react";

function About() {
  return (
    <div className="fullsize">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="eye" id="eye3"></div>
          </div>
          <div className="col-lg-5">
          <h1 className="font-weight-light">About</h1>
            <h3 className="font-weight-light">About Us</h3>
            <p>
              This project was developed by <strong>iJane</strong>! We are students at the University of Melbourne!  
              We see H1 as more than just a HTML tag.
            </p>
            <hr />
            <h3 className="font-weight-light">What is a CRM?</h3>
            <p>
            CRM stands for Customer Relationship Management (but if you've come this far, you should already know that).</p>
            <hr />
            <h3 className="font-weight-light">What We Offer</h3>
            <p>
            We provide a personal CRM service where you can create and manage contacts, organise key contact information, and 
            search and categorise your contacts by tags.
            Businesses can also use the Admin feature in order to organise and manage users.
            </p>
          </div>
        </div>
      </div>
  );
}

export default About;