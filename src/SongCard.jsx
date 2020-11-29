import React, {useState, useEffect, useMemo} from "react";

const SongCard = (props) => {

  const [play, setPlay] = useState(false)
  const [timer, setTimer] = useState('')
  const [bgPixel, setBgPixel] = useState(200)
  const [intervalId, setIntervalId] = useState(null)
  const [audioDuration, setAudioDuration] = useState(null)

  const audio = useMemo(() => new Audio(props.song.path), [])

  useEffect(() => {
    if(props.currentId === props.song.id) {
      playAudio()
      let timeDuration = Math.round(audio.duration)
      let minutesDuration = Math.floor(timeDuration / 60);
      let secondesDuration = timeDuration - minutesDuration * 60;
      secondesDuration = fmtMSS(secondesDuration)
      setAudioDuration(minutesDuration+':'+secondesDuration)
    } else {
      stopAudio()
    }
  }, [props.currentId])

  useEffect(() => {
    if(props.currentId === props.song.id && audio.currentTime === 0) {
      setTimer("0:00")
    }
  }, [play])

  const Minuter = () => {  
    if (props.currentId === props.song.id) {
      updateTimer()
      setBgPixel((200 - Math.round((200 * Math.round(audio.currentTime)) / Math.round(audio.duration)))+"px")
      if(Math.round(audio.currentTime) === Math.round(audio.duration)) {
        props.setCurrentId(null)
      }
    }
  }


  const playAudio = async () => {
    setPlay(true);
    const id = setInterval(Minuter, 1000)
    setIntervalId(id)
    try {
      await audio.play()
    } catch (err) {
    }
  }

  const stopAudio = () => {
    audio.pause();
    if(props.currentId === props.song.id) {
      props.setCurrentId(null)
    }
    audio.currentTime = 0;
    setBgPixel(200+"px")
    setTimer("")
    clearInterval(intervalId)
    setPlay(false)
  }
  const pauseAudio = () => {
    updateTimer()
    audio.pause();
    setPlay(false)
    clearInterval(intervalId)
    if(audio.currentTime === 0) {
      setTimer("0:00")
    }
  }

  function fmtMSS(s) {
    if(s <= 9) {
      return "0"+s
    } else {
      return s
    }
  }

  const updateTimer = () => {
    var time = Math.round(audio.currentTime)
    var minutes = Math.floor(time / 60);
    var secondes = time - minutes * 60;
    secondes = fmtMSS(secondes)
    setTimer(minutes+':'+secondes)
  }

  const changeCurrentTime = (e) => {
    if(props.song.id === props.currentId) {
      e.stopPropagation();
      var bounds = e.nativeEvent.path[1].getBoundingClientRect();
      var x = e.clientX - bounds.left;
      audio.currentTime = x*Math.round(audio.duration)/200
      setBgPixel((200 - Math.round((200 * Math.round(audio.currentTime)) / Math.round(audio.duration)))+"px")
    }
  }

  return (
    <div className="m-4 col-4 col-sm-4 col-md-3 col-lg-2 songCard">
      <div onClick={changeCurrentTime} className="coverContainer">
        {props.currentId === props.song.id ? (<div className="songTimer"><div>{timer}</div><div>/{audioDuration}</div></div>) : <div></div>}
        {props.currentId === props.song.id ? (<div style={{width: bgPixel}} className="playingSong"></div>) : <div></div>}
        <img alt={props.song.nom} className="thumbnail" src={props.song.thumbnail}/>
      </div>
      <div className="infoContainer">
        {play === true && props.currentId === props.song.id ? (<div className="playPauseButton" onClick={() => pauseAudio()}>II</div>)
        : play === false && props.currentId === props.song.id ? (<div className="playPauseButton" onClick={() => playAudio()}>►</div>)
        : (<div className="playPauseButton" onClick={() => props.setCurrentId(props.song.id)}>►</div>)
        }
          <div className="playPauseButton" onClick={() => stopAudio()}>&#9632;</div>  
        <div className="songTitle">{props.song.nom}</div>
      </div>
    </div>
  );
};

export default SongCard;