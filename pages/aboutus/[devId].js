import React from 'react';
import { useRouter } from 'next/router';

const DeveloperDetails = () => {
  const router = useRouter();
  const { devId } = router.query;

  const developers = [
    { id: 1, name: 'Yash', role: 'Senior Developer' },
    { id: 2, name: 'Vaibhav', role: 'Backend Developer' },
    { id: 3, name: 'Suresh', role: 'Frontend Developer' },
  ];

  const developer = developers.find((dev) => dev.id === parseInt(devId));

  if (!developer) {
    return <div>Developer doesn't exist.</div>;
  }

  return (
    <div>
      <h1>Developer Details</h1>
      <p>ID: {developer.id}</p>
      <p>Name: {developer.name}</p>
      <p>Role: {developer.role}</p>
    </div>
  );
};

export default DeveloperDetails;
