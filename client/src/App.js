import MainNav from "./components/MainNav";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [carData, setCarData] = useState([]);

  // get some data
  useEffect(() => {
    fetch("/api/unsplash")
      .then((res) => res.json())
      .then((data) => setCarData(data.data.results));
  }, []);

  return (
    <div className="App">
      {/* Add a navbar */}
      <MainNav />
      {/* Add card container */}
      <div className="card-container">
        {carData &&
          carData.map((data, index) => (
            <p key={index}>{data?.alt_description}</p>
          ))}
      </div>
    </div>
  );
}

export default App;
