import React, { useState, useEffect } from "react";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SongCard from "./SongCard";

const App = () => {
  const [songs, setSongs] = useState([]);
  const [currentId, setCurrentId] = useState(null)
  const [color, setColor] = useState("rgb(245, 245, 245)")
  const [bgColor, setBgColor] = useState("rgb(10, 20, 30)")
  useEffect(() => {
    axios.get('/songs.json')
      .then(function (response) {
        setSongs(response.data)
      })
      .catch(function (error) {
        console.log(error);
      })
      }, []);
    
  const handleToggleLight = () => {
    color === "rgb(10, 20, 30)" ? setColor("rgb(245, 245, 245)") : setColor("rgb(10, 20, 30)")
    bgColor === "rgb(10, 20, 30)" ? setBgColor("rgb(245, 245, 245)") : setBgColor("rgb(10, 20, 30)")
  }

  return (
    <div style={{backgroundColor: bgColor, transition: "2s"}}className="wrapper">
      <div style={{color, transition: "2s"}} className="toggleLight" onClick={handleToggleLight}><span class="toggleLightIcon material-icons">
emoji_objects
</span></div>
      <div className="mainContainer row d-flex align-items-center justify-content-center">
          {
          songs.map(currentSong => {
              return <SongCard currentId={currentId} setCurrentId={setCurrentId} song={currentSong}/>
          })
          }
        </div>
    </div>
  );
};

export default App;
