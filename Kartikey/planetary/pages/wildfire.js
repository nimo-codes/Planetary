import axios from "axios";
import React, { useState } from "react";

const wildfire = () => {
  const [displayImage, setDisplayImage] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [date, setDate] = useState();
  const [result, setResult] = useState();
  const apiKey = "HGgzNs8K2j8VrmMgNshhbbf4w1QYkKTUng0oBA5v";
  // const [thumbnailUrl, setThumbnailUrl] = useState();
  const url = "http://127.0.0.1:8000/api/";
  const callNasaApi = async (e) => {
    if (longitude !== "" && latitude !== "" && date !== "") {
      e.preventDefault();
      try {
        let nasaUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}.062&lat=${latitude}.228&date=${date}&&dim=0.10&api_key=${apiKey}`;
        console.log(nasaUrl);
        const resp = await axios.get(nasaUrl);
        if (resp.data.url) {
          uploadModelInput(resp.data.url);
        }
      } catch (error) {
        console.log(error); // !toast
        // console.log(error.response.data.msg); // !toast
      }
    }
  };

  const uploadModelInput = async (thumbnail) => {
    // * code for download and querying
    let thumbnailUrl = thumbnail;
    await axios
      .get(thumbnailUrl, { responseType: "blob" })
      .then(function (response) {
        const formData = new FormData();

        formData.append("image", response.data, "1.png");

        axios
          .post(url, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(function (response) {
            console.log(response);
            setDisplayImage(response.data.image_path);
            setResult(response.data.result);
          })
          .catch(function (error) {
            console.error("Request failed:", error);
          });
      })
      .catch(function (error) {
        console.error("Failed to download thumbnail image:", error);
      });
  };
  return (
    <div>
      {result && <h1>{result}</h1>}
      <form method="POST" onSubmit={callNasaApi}>
        <label htmlFor="lat">latitude</label>
        <input
          type="number"
          name="lat"
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label htmlFor="lon">longitude</label>
        <input
          type="number"
          name="lon"
          onChange={(e) => setLongitude(e.target.value)}
        />
        <label htmlFor="lon">Date</label>
        <input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit" className="m-5 bg-slate-400">
          Submit
        </button>
      </form>
      <img src={`http://127.0.0.1:8000${displayImage}`} alt="" />
    </div>
  );
};

export default wildfire;
