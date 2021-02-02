import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";
import "./FAQCarousel.scss";
const items = [
  {
    title: "What is ACM Panel ?!",
    description:
      "Well ACM Panel is a platform made to let admins to controll and monitor the platform state and also help clients with their problems.",
    key: 1,
  },
  {
    title: "Anybody can be Admin ?",
    description:
      "No. You have to contact the superadmin to get access or to be admin. Even if you create an account from here it will be a regular account untill the SuperAdmin accept it.",
    key: 2,
  },
  {
    title: "I want become an admin",
    description:
      "To be admin who can monitor our platform and have many other actions in hand. Dosen't look easy you have to contact the director. Until you get his agreement you are welcome",
    key: 3,
  },
];

const FAQCasourel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.key}
        className="mb-5"
      >
        <div
          className="bg-gradient-aqua-90"
          style={{
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          <h1 className="text-center"> {item.title} </h1>
        </div>
        <p className="w-50 mx-auto text-center m-3">{item.description}</p>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default FAQCasourel;
