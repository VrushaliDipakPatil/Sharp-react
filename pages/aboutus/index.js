import React from 'react'
import Link from 'next/link';

const aboutus = () => {
const details = [
  {id: 1, name: 'Yash', role: 'Senior Developer'},
  {id: 2, name: 'Vaibhav', role: 'Bckend Developer'},
  {id: 3, name: 'Suresh', role: 'Frontend Developer'},
]

  return (
    <>
    <div>aboutus</div>
    {details.map((dev)=>(
      <li key={dev.id}>
        <Link href={`/aboutus/${dev.id}`}>{dev.name}</Link>
      </li>
    ))}
    </>
  )
}

export default aboutus