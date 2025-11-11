import React from "react";
import BirthdayWrapper from "./BirthdayWrapper";
import BoomTitle from "./BoomTitle";
import MegaBoomName from "./MegaBoomName";
import BirthdayDate from "./BirthdayDate";
import AgeExplosion from "./AgeExplosion";
import EmojiBurst from "./EmojiBurst";
import "../../assets/css/animations.css";


export default function BirthdayCalligraphy() {
  return (
    <BirthdayWrapper>
      <BoomTitle />
      <MegaBoomName />
      <BirthdayDate />
      <AgeExplosion />
      <EmojiBurst />
    </BirthdayWrapper>
  );
}
