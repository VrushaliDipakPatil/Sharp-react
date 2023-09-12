import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const HomeHeading = () => {
  return (
    <div className="container-fluid vh-50 d-flex flex-column align-items-center justify-content-center bg-secondary text-white" style={{ marginTop: '58px', height: '300px' }}>
      <h1 className="display-4 fw-bold">The Generics</h1>
      <div className="bg-transparent border border-primary p-3 mt-3">
        <h4 className="text-white text-primary">Get our latest Album</h4>
      </div>
      <FontAwesomeIcon icon={faPlayCircle} size="3x" style={{ color: 'light-blue', backgroundColor: 'transparent', padding: '20px' }} />
    </div>
  );
};

export default HomeHeading;
