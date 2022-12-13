import MainNav from "./components/MainNav";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [carData, setCarData] = useState([]);

  // get some data
  useEffect(() => {
    // const clientId = "nLM4Hq-rLb931DiT6toUYJdw6g2I-A9wGdZyc4i2YOI";
    // const searchTerm = "cars";
    // const resource = `https://api.unsplash.com/search/photos/?query=${searchTerm}&per_page=20&client_id=${clientId}`;

    // fetch(resource)
    //   .then((res) => res.json())
    //   .then((data) => setCarData(data.results));
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((data) => setCarData(data.data));
  }, []);

  return (
    <div className="App">
      {/* Add a navbar */}
      <MainNav />
      {/* Add card container */}
      <div className="card-container">
        {carData &&
          carData.map((data, index) => <p key={index}>{data?.title}</p>)}
      </div>
    </div>
  );
}

export default App;
