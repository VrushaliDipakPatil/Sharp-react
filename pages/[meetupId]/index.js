import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

export default function MeetupList() {
  return (
    <MeetupDetail
      image="https://media.istockphoto.com/id/1199224443/photo/annapolis-maryland-usa-downtown-view-over-main-street-with-the-state-house.jpg?s=612x612&w=0&k=20&c=B_1PwigAtLA5A5Y_RWFzq1GrpLNLUrMFGt4s0JJgPHw="
      title="First Meetup"
      address="some street 5, 12345 city"
      description="this is forst meetup"
    />
  );
}


export async function getStaticPaths(){
    return {

        fallback: false,
        paths : [
            {params : {
                meetupId : 'm1',
            }},
            {params : {
                meetupId : 'm2',
            }},
            {params : {
                meetupId : 'm3',
            }}
        ]
    }
}

export async function getStaticProps(context) {

const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {
        image:
          "https://media.istockphoto.com/id/1199224443/photo/annapolis-maryland-usa-downtown-view-over-main-street-with-the-state-house.jpg?s=612x612&w=0&k=20&c=B_1PwigAtLA5A5Y_RWFzq1GrpLNLUrMFGt4s0JJgPHw=",
        id: meetupId,
        title: "First Meetup",
        address: "some street 5, 12345 city",
        description: "this is forst meetup",
      },
    },
  };
}
