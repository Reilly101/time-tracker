import React, { useState, useEffect, useRef } from "react";

export default function Card({ name, play, setPlay, level }) {
  let [timer, setTimer] = useState(0);
  let [time, setTime] = useState(0);
  let key = useRef();
  let [inputs, setInputs] = useState([
    {
      start: "Sat Jul 20 2022 10:48:35 GMT-0700 (Pacific Daylight Time)",
      end: "Sat Jul 20 2022 20:28:38 GMT-0700 (Pacific Daylight Time)",
    },
    {
      start: "Sat Jul 21 2022 10:48:35 GMT-0700 (Pacific Daylight Time)",
      end: "Sat Jul 21 2022 20:28:38 GMT-0700 (Pacific Daylight Time)",
    },
    {
      start: "Sat Jul 26 2022 10:48:35 GMT-0700 (Pacific Daylight Time)",
      end: "Sat Jul 26 2022 16:42:38 GMT-0700 (Pacific Daylight Time)",
    },

    {
      start: "Sat Jul 28 2022 15:48:35 GMT-0700 (Pacific Daylight Time)",
      end: "Sat Jul 28 2022 16:42:38 GMT-0700 (Pacific Daylight Time)",
    },
    {
      start: "Sat Aug 02 2022 15:48:35 GMT-0700 (Pacific Daylight Time)",
      end: "Sat Aug 02 2022 21:42:38 GMT-0700 (Pacific Daylight Time)",
    },
    {
      start: "Sat Aug 03 2022 15:48:35 GMT-0700 (Pacific Daylight Time)",
      end: "Sat Aug 03 2022 21:42:38 GMT-0700 (Pacific Daylight Time)",
    },
    {
      start: "Sat Aug 04 2022 15:48:35 GMT-0700 (Pacific Daylight Time)",
      end: "Sat Aug 04 2022 16:22:38 GMT-0700 (Pacific Daylight Time)",
    },
  ]);
  let [start, setStart] = useState("");

  function countlenghts(start, end) {
    let from = new Date(start);
    let to = new Date(end);
    return to - from;
  }
  function parsetime(seconds) {
    let hours = Math.floor(seconds / (60 * 60));
    let minutes = Math.floor((seconds - hours * 60 * 60) / 60);
    let secondsV = seconds - hours * 60 * 60 - minutes * 60;
    return `${hours < 10 ? 0 : ""}${hours}:${minutes < 10 ? 0 : ""}${minutes}:${
      secondsV < 10 ? 0 : ""
    }${secondsV}`;
  }
  function checkwhatweek(timestring, level) {
    let timedate = new Date();
    timedate.setHours(0);
    timedate.setMinutes(0);
    timedate.setSeconds(0);
    let checked = new Date(timestring);
    let getcurrentdate = timedate.getDate();
    switch (level) {
      case "Week":
        let getcurrentday = timedate.getDay();
        let distancetomonday = getcurrentday - 1;
        timedate.setDate(getcurrentdate - distancetomonday);
        let currentMonday = timedate.setMilliseconds(0);
        let previousMonday = timedate.setDate(
          getcurrentdate - distancetomonday - 7
        );

        return checked < currentMonday
          ? checked > previousMonday
            ? "last"
            : false
          : "current";
        break;
      case "Day":
        let currentDay = timedate.getTime();
        let previousDay = timedate.setDate(getcurrentdate - 1);
        return checked < currentDay
          ? checked > previousDay
            ? "last"
            : false
          : "current";
        break;
      case "Month":
        let currentmonth = timedate.getMonth();
        timedate.setMonth(currentmonth - 1);
        let previousmonth = timedate.getMonth();
        return checked.getMonth() < currentmonth
          ? checked.getMonth() == previousmonth
            ? "last"
            : false
          : "current";
    }
  }

  useEffect(() => {
    if (play) {
      key.current = setInterval(() => {
        setTimer(++timer);
      }, 1000);
    } else {
      clearInterval(key.current);
    }
  }, [play]);
  return (
    <div>
      <div className="square">
        <div className="backcontainer"></div>
        <div className="frontcontainer">
          <div className="toptitle">
            <div className="title">{name}</div>
            {play ? (
              <span
                class="material-symbols-outlined"
                onClick={() => {
                  setPlay(false);
                  let end = new Date().toString();

                  let newInput = { start, end };
                  console.log(newInput);
                  setInputs([...inputs, newInput]);
                }}
              >
                pause_circle
              </span>
            ) : (
              <span
                class="material-symbols-outlined"
                onClick={() => {
                  setPlay(true);
                  setStart(new Date().toString());
                }}
              >
                play_circle
              </span>
            )}
          </div>
          <div className="box">
            <div className="hours">
              {parsetime(
                timer +
                  inputs
                    .filter(
                      (input) =>
                        checkwhatweek(input.start, level) === "current" &&
                        checkwhatweek(input.end, level) === "current"
                    )
                    .reduce(
                      (all, input) =>
                        (all += countlenghts(input.start, input.end) / 1000),
                      0
                    )
              )}
              <div className="period">
                Last {level}:{" "}
                {parsetime(
                  inputs
                    .filter(
                      (input) =>
                        checkwhatweek(input.start, level) === "last" &&
                        checkwhatweek(input.end, level) === "last"
                    )
                    .reduce(
                      (all, input) =>
                        (all += countlenghts(input.start, input.end) / 1000),
                      0
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
