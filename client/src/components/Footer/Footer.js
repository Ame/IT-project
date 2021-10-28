import React from "react";

function Footer() {
  // footer that is also at the bottom of the website
  return (
    <div className="footer">
      <footer className="py-2 bg-dark relative-bottom">
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; <img height="60px" src="https://i.imgur.com/qZwRBVr.png" />  2021
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;