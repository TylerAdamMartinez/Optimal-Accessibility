import { getImageGrid } from "./Structure";
import { useState, useEffect } from "react";

/*
  This file will not be included in the final release
*/

function TestImageComponent() {
  const [imageGrid, setImageGrid] = useState({});
  const image = require("./assets/AdPoster.jpg");

  const imageStyles = {
    width: "33%",
    height: "33%",
    marginLeft: "1px",
  };

  useEffect(() => {
    getImageGrid(image)
      .then((val) => {
        setImageGrid(val);
      })
      .catch((e) => console.log(e));
  }, [image]);

  useEffect(() => {
    console.log(imageGrid);
  }, [imageGrid]);

  return imageGrid.images !== undefined ? (
    <div
      style={{
        width: "70%",
        height: "65%",
        margin: 80,
        flexDirection: "row",
        display: "flex",
      }}
    >
      <img
        alt="Test poster"
        src={image}
        style={{ width: "50%", height: "50%" }}
      />
      <div
        style={{
          height: "50%",
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="Test topLeft"
          src={imageGrid.images.topLeft.img}
          style={imageStyles}
        />
        <img
          alt="Test topMiddle"
          src={imageGrid.images.topMiddle.img}
          style={imageStyles}
        />
        <img
          alt="Test topRight"
          src={imageGrid.images.topRight.img}
          style={imageStyles}
        />
        <img
          alt="Test middleLeft"
          src={imageGrid.images.middleLeft.img}
          style={imageStyles}
        />
        <img
          alt="Test middle"
          src={imageGrid.images.middle.img}
          style={imageStyles}
        />
        <img
          alt="Test middleRight"
          src={imageGrid.images.middleRight.img}
          style={imageStyles}
        />
        <img
          alt="Test bottomLeft"
          src={imageGrid.images.bottomLeft.img}
          style={imageStyles}
        />
        <img
          alt="Test bottomMiddle"
          src={imageGrid.images.bottomMiddle.img}
          style={imageStyles}
        />
        <img
          alt="Test bottomRight"
          src={imageGrid.images.bottomRight.img}
          style={imageStyles}
        />
      </div>
      <div
        style={{
          height: "50%",
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <img
          alt="Test top"
          src={imageGrid.images.tempImages.top.img}
          style={{ width: "100%", height: "90%", margin: "1px" }}
        />
        <img
          alt="Test middle"
          src={imageGrid.images.tempImages.middle.img}
          style={{ width: "100%", height: "90%", margin: "1px" }}
        />
        <img
          alt="Test bottom"
          src={imageGrid.images.tempImages.bottom.img}
          style={{ width: "100%", height: "90%", margin: "1px" }}
        />
      </div>
    </div>
  ) : (
    <h3 style={{ margin: 80 }}>Image is processing...</h3>
  );
}

export default TestImageComponent;
