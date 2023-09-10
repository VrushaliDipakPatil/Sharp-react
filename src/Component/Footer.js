import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faSpotify, faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-info text-white py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="display-6 fw-bold">The Generics</p>
          </div>
          <div className="col-md-6 text-end">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
            <a href="https://www.spotify.com/" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <FontAwesomeIcon icon={faSpotify} size="2x" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-white">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
