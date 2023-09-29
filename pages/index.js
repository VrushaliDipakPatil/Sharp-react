import React, { useEffect, useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "A first meetup",
    image:
      "https://media.istockphoto.com/id/1199224443/photo/annapolis-maryland-usa-downtown-view-over-main-street-with-the-state-house.jpg?s=612x612&w=0&k=20&c=B_1PwigAtLA5A5Y_RWFzq1GrpLNLUrMFGt4s0JJgPHw=",
    address: "some address 5, 12345 some city",
    description: "This is first meetup",
  },
  {
    id: "m2",
    title: "A second meetup",
    image:
      "https://media.istockphoto.com/id/1199224443/photo/annapolis-maryland-usa-downtown-view-over-main-street-with-the-state-house.jpg?s=612x612&w=0&k=20&c=B_1PwigAtLA5A5Y_RWFzq1GrpLNLUrMFGt4s0JJgPHw=",
    address: "some address 10, 12345 some city",
    description: "This is second meetup",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

// export async function getServerSideProps(context){

//     const req = context.req;
//     const res = context.res;

//     return{
//         props : {
//             meetups : DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    revalidate: 1
  };
}

export default HomePage;
