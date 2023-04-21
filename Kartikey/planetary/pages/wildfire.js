import axios from "axios";
import React, { useState } from "react";

const wildfire = () => {
  const [displayImage, setDisplayImage] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [date, setDate] = useState();
  const [result, setResult] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const apiKey = "HGgzNs8K2j8VrmMgNshhbbf4w1QYkKTUng0oBA5v";
  // const [thumbnailUrl, setThumbnailUrl] = useState();
  const url = "http://127.0.0.1:8000/api/";
  const options = [
    { lat: -3.23, lon: -62.23, date: "2019-03-03", name: "Amazon Forest" },
    { lat: 61.01, lon: 28.75, date: "2020-10-29", name: "Tiaga Forest" },
    {
      lat: -6.62,
      lon: 146.988,
      date: "2021-10-29",
      name: "New Guineau Rainforest",
    },
    { lat: 12.23, lon: 92.83, date: "2020-03-03", name: "Baratang" },
  ];
  const [drop, setDrop] = useState(options[0]);
  const callNasaApi = async (e) => {
    if (!show) {
      setLoading(true);
      if (longitude !== "" && latitude !== "" && date !== "") {
        e.preventDefault();
        console.log(longitude);
        console.log(latitude);
        try {
          let nasaUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${longitude}&lat=${latitude}&date=${date}&&dim=0.10&api_key=${apiKey}`;
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
    } else {
      e.preventDefault();
      console.log(drop);
      try {
        let nasaUrl = `https://api.nasa.gov/planetary/earth/assets?lon=${drop.lon}&lat=${drop.lat}&date=${drop.date}&&dim=0.10&api_key=${apiKey}`;
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
            setLoading(false);
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
    <div className="flex flex-col">
      <button
        onClick={(e) => {
          setShow((prev) => !prev);
        }}
      >
        SWITCH
      </button>
      <div className="flex">
        {show ? (
          <>
            <form onSubmit={callNasaApi}>
              <select onChange={(e) => setDrop(options[e.target.value])}>
                {options.map((option, index) => (
                  <option key={index} value={index}>
                    {`${option.name}`}
                  </option>
                ))}
              </select>

              <button type="submit">Submit</button>
            </form>
            {result ? (
              <>
                <h1 className="text-5xl font-semibold">{result}</h1>
                <img
                  className="w-[800px] mt-5"
                  src={`http://127.0.0.1:8000${displayImage}`}
                  alt=""
                />
              </>
            ) : (
              <h1>loading...</h1>
            )}
          </>
        ) : (
          <>
            <form onSubmit={callNasaApi}>
              <label className="font-semibold mx-2" htmlFor="lat">
                latitude
              </label>
              <input
                step=".001"
                type="number"
                name="lat"
                onChange={(e) => setLatitude(e.target.value)}
              />
              <label className="mx-2 font-semibold" htmlFor="lon">
                longitude
              </label>
              <input
                step=".001"
                type="number"
                name="lon"
                onChange={(e) => setLongitude(e.target.value)}
              />
              <input
                className="font-semibold"
                type="date"
                name="date"
                onChange={(e) => setDate(e.target.value)}
              />
              <button
                type="submit"
                className="m-5 px-3 py-2 rounded-3xl bg-slate-400"
              >
                Submit
              </button>
              {result ? (
                <>
                  <h1 className="text-5xl font-semibold">{result}</h1>
                  <img
                    className="w-[800px] mt-5"
                    src={`http://127.0.0.1:8000${displayImage}`}
                    alt=""
                  />
                </>
              ) : (
                loading && <h1>loading...</h1>
              )}
              {/* violated DRY :[ */}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default wildfire;
