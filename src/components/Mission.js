import React, { useEffect, useState } from "react";
import Restaurants from "./Restaurants";
import axios from "axios";
import MissionComponent from "./MissionComponent";

export default function Mission() {
  const [curLocation, setCurLocation] = useState({
    lat: 40.82302903,
    long: -73.93414657,
  });
  const [data, setData] = useState([]);
  const [dataAll, setDataAll] = useState({});
  const [activeFuncName, setActiveFuncName] = useState("0");

  const [loading, setLoading] = useState(false);

  const callData = (param) => {
    let path = "";
    if (param === "1") {
      path = "restaurants";
    } else if (param === "2") {
      path = "neighborhoods";
    } else if (param === "3") {
      path = "allrestaurantsinneighborhood";
    } else {
      path = "0";
    }

    setActiveFuncName(param);
    getDataFromApi(path);
  };

  const getDataFromApi = (path) => {
    if (path !== "0") {
      setLoading(true);
      axios
        .post(`http://localhost:9000/api/${path}`, curLocation)
        .then((res) => {
          if (path == "allrestaurantsinneighborhood") {
            setDataAll(res.data.result);
          } else {
            setData(res.data.result);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };
  if (loading) return <h1> Loading </h1>;

  return (
    <div style={{ display: "flex" }}>
      {console.log({ dataAll })}
      <MissionComponent
        curLocation={curLocation}
        activeFuncName={activeFuncName}
        data={data}
        dataAll={dataAll}
      />
      <div style={{ padding: "10px" }}>
        <h4 onClick={() => callData("0")}>Reset</h4>
        <h2 onClick={() => callData("1")}>
          Find the all restaurants (only points)
        </h2>
        <h2 onClick={() => callData("2")}>
          Find 100 Neighborhood in the Neighborhood (only polygons)
        </h2>
        <h2 onClick={() => callData("3")}>
          Find Restaurants in the Neighborhood (all point & one polygon)
        </h2>
      </div>
    </div>
  );
}
