import React from "react";
import HomeHeading from "./HomeHeading";
import { Button } from "react-bootstrap";

const Home = () => {
  const toursArray = [
    {
      title: "DTE ENERGY MUSIC THEATRE",
      place: "DETROIT, MI",
      date: "JUL 16",
    },
    {
      title: "BUDWEISER STAGE",
      place: "TORONTO, ON",
      date: "JUL 19",
    },
    {
      title: "JIFFY LUBE LIVE",
      place: "BRISTOW, VA",
      date: "JUL 22",
    },
    {
      title: "AK-CHIN PAVILION",
      place: "PHOENIX, AZ",
      date: "JUL 29",
    },
    {
      title: "T-MOBILE ARENA",
      place: "LAS VEGAS, NV",
      date: "AUG 2",
    },
    {
      title: "CONCORD PAVILION",
      place: "CONCORD, CA",
      date: "AUG 7",
    },
  ];

  return (
    <>
      <HomeHeading />
      <div className="container">
        <h4 className="mb-2 py-4">Tours</h4>
        <div className="align-items-center" style={{width:'80%',paddingLeft:'20vw'}}>
          {toursArray.map((item, index) => (
            <div className="row my-2 " key={index}>
              <div className="col-2">
                <h6>{item.date}</h6>
              </div>
              <div className="col-2">
                <span>${item.place}</span>
              </div>
              <div className="col-4">
                <span>{item.title}</span>
              </div>
              <div className="col-2">
                <Button variant="primary">Buy Ticket</Button>
              </div>
              <hr />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
