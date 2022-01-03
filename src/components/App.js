import React, { useState, useEffect } from "react";

export const App = () => {
  //set first time picture at local storage
  if (localStorage.getItem("pictureOfTheDay") === null) {
    localStorage.setItem("pictureOfTheDay", Math.floor(Math.random() * (35 - 1 + 1) + 1));
  }

  //states
  const [pictureOfTheDay, setPictureOfTheDay] = useState(localStorage.getItem("pictureOfTheDay"));
  const [number, setNumber] = useState(pictureOfTheDay);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  //set date at local storage
  localStorage.setItem("date", date);

  //random picture of the day
  useEffect(() => {
    if (date !== new Date().toLocaleDateString()) {
      const temp = [+pictureOfTheDay];
      while (temp.length < 2) {
        let randomNumber = Math.floor(Math.random() * (35 - 1 + 1) + 1);
        if (temp.indexOf(randomNumber) === -1) {
          temp.push(randomNumber);
        }
      }
      localStorage.setItem("pictureOfTheDay", temp[1]);
      setPictureOfTheDay(temp[1]);
      setNumber(temp[1]);
      setDate(new Date().toLocaleDateString());
    }
  }, [pictureOfTheDay, date]);

  //random picture button
  const handleClick = (e) => {
    e.preventDefault();
    setNumber(Math.floor(Math.random() * (35 - 1 + 1) + 1));
  };

  return (
    <>
      <main className="mainBox">
        <h1 className="mainBox__title">Picture of the day:</h1>
        <div className="mainBox__imageBox">
          <img src={require(`./data/data(${number}).jpg`)} alt="cat" className="mainBox__imageBox__image"></img>
        </div>
        <a href="." onClick={(e) => handleClick(e)}>
          <p>
            <span className="background"></span>
            <span className="text">New picture</span>
          </p>
        </a>
      </main>
      <footer>
        <p>
          All images are from:{" "}
          <a href="https://pixabay.com/" target="_blank" rel="noreferrer">
            Pixabay.com
          </a>
        </p>
      </footer>
    </>
  );
};
