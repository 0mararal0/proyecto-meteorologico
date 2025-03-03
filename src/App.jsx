import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { NavbarApiWeather } from "./components/NavbarApiWeather";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_key } from "./services/apiKeys";
import { CardApiWeather } from "./components/CardApiWeather";

function App() {
  const [city, setCity] = useState("valladolid");
  const [info, setInfo] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast/?q=${city}&units=metrics&appid=${API_key}`
      )
      .then((res) => setInfo(res.data))
      .catch((err) => {
        if (err.response) {
          console.log("Error en la respuesta:", err.response.data);
        } else if (err.request) {
          console.log("Error en la solicitud:", err.request);
        } else {
          console.log("Error:", err.message);
        }
      });
  }, [city]);

  const onSearch = (text) => {
    if (text) {
      setCity(text.toLowerCase());
    }
  };
  const prov = info?.list?.filter((ele) =>
    ele?.dt_txt.slice(11, 13).includes("15")
  );
  return (
    <>
      <div className="d-flex flex-wrap container-ppal">
        <div className="navbar-ppal">
          <NavbarApiWeather onSearch={onSearch} />
        </div>
        <div className="container-body">
          <div className="title-ppal">
            <h1>
              Pronóstico del tiempo en <br />
              <span className="city">{info?.city?.name}</span>
            </h1>
          </div>
          <div className="container-cards">
            {info &&
              prov?.map((elem, idx) => {
                return <CardApiWeather key={idx} data={elem} />;
              })}
          </div>
          <div>{/* <Grafica /> */}</div>
        </div>
      </div>
    </>
  );
}

export default App;
