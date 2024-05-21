import React, { useEffect, useState } from 'react'
import { FaDiamond, FaHeart } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import { BsFillPentagonFill, BsHexagonFill } from "react-icons/bs";
import { GiCardJoker } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { addTile, clearTile, removeUnMatchingTiles } from './store/tileSlice';



const App = () => {

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  const tilesList = [
    {
      type: "diamond",
      shape: <FaDiamond size={24} color='red' />
    },
    {
      type: "triangle",
      shape: <IoTriangle size={24} color='green' />
    },
    {
      type: "heart",
      shape: <FaHeart size={24} color='red' />,
    },
    {
      type: "diamond",
      shape: <FaDiamond size={24} color='red' />,
    },
    {
      type: "heart",
      shape: <FaHeart size={24} color='red' />,
    },
    {
      type: "pentagon",
      shape: <BsFillPentagonFill size={24} color='blue' />,
    },
    {
      type: "triangle",
      shape: <IoTriangle size={24} color='green' />,
    },
    {
      type: "diamond",
      shape: <FaDiamond size={24} color='red' />,
    },
    {
      type: "pentagon",
      shape: <BsFillPentagonFill size={24} color='blue' />,
    },
    {
      type: "hexagon",
      shape: <BsHexagonFill size={24} color='pink' />,
    },
    {
      type: "diamond",
      shape: <FaDiamond size={24} color='red' />,
    },
    {
      type: "heart",
      shape: <FaHeart size={24} color='red' />,
    },
    {
      type: "hexagon",
      shape: <BsHexagonFill size={24} color='pink' />,
    },
    {
      type: "triangle",
      shape: <IoTriangle size={24} color='green' />,
    },
    {
      type: "heart",
      shape: <FaHeart size={24} color='red' />,
    },
    {
      type: "triangle",
      shape: <IoTriangle size={24} color='green' />,
    },
    {
      type: "pentagon",
      shape: <BsFillPentagonFill size={24} color='blue' />,
    },
    {
      type: "hexagon",
      shape: <BsHexagonFill size={24} color='pink' />,
    },
    {
      type: "pentagon",
      shape: <BsFillPentagonFill size={24} color='blue' />,
    },
    {
      type: "hexagon",
      shape: <BsHexagonFill size={24} color='pink' />,
    },
  ]
  const dispatch = useDispatch();
  const [randomTiles, setRandomTiles] = useState(null);
  const showTile = useSelector((state) => state.tile);
  const [onHold, setOnHold] = useState(false);
  const [isStart, setIsStart] = useState(false);

  const HandleShow = (id, type) => {
    if (!isPresentInShow(id))
      dispatch(addTile({ id: id, type: type }));
    setTimeout(() => {
      reverseMove(type);
    }, 500)

  }

  const reverseMove = (type) => {
    if (onHold) {
      setOnHold(false);
      if (!matching(type)) {
        dispatch(removeUnMatchingTiles());
      }
    }
    else {
      setOnHold(!onHold);
    }
  }

  const matching = (type) => {
    if (!showTile) return false;
    return showTile.tileList[showTile.tileList.length - 1].type === type;
  }

  const isPresentInShow = (id) => {
    for (let i = 0; i < showTile.tileList.length; i++) {
      if (showTile.tileList[i].id === id) {
        return true;
      }
    }
    return false;
  }

  const shuffleTiles = () => {
    setRandomTiles(shuffleArray(tilesList));
  }

  const [bestTime, setBestTime] = useState("0:00:00:00");

  const [time, setTime] = useState(0);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 100);

  // Milliseconds calculation
  const milliseconds = time % 100;

  const HandleRestartGame = () => {
    if (confirm("Are you sure want to restart?")) {
      shuffleTiles();
      dispatch(clearTile());
      setTime(0);
    }
  }
  const HandleStartGame = () => {
    setIsRunning(true);
    shuffleTiles();
    setIsStart(true);
    
  }
  const HandleHome = () => {
    if (confirm("Your progress will be lost if you leave...\nAre you sure want to go to main menu?")) {
      setIsStart(false);
      shuffleTiles();
      dispatch(clearTile());
      setIsRunning(false);
      setTime(0);
    }
  }

  useEffect(() => {
    if (showTile.tileList.length === 20) {
      alert("You win!!!");
      setBestTime(`${hours}:${minutes.toString().padStart(2, "0")}:
      ${seconds.toString().padStart(2, "0")}:
      ${milliseconds.toString().padStart(2, "0")}`);
      HandleHome();
    }
  }, [showTile.tileList])

  return (
    <div className='w-full h-screen flex items-center flex-col gap-4 justify-center bg-slate-200'>
      <h3 className='text-2xl font-semibold text-center w-full'>Remembering Game</h3>
      {
        isStart
          ? <div className="game-box bg-white px-4 py-4 grid grid-cols-4 lg:grid-cols-5 place-content-center rounded-lg shadow-lg gap-x-4 gap-y-4">
            {
              randomTiles
                ? randomTiles.map((tile, index) => {
                  return <div className={'rounded-lg flex justify-center items-center bg-ora h-24 w-20 shadow-md transition-colors delay-200 ' + (isPresentInShow(index) ? 'bg-white' : 'bg-indigo-300')}
                    onClick={() => HandleShow(index, tile.type)}
                    key={index}
                  >
                    {
                      isPresentInShow(index)
                        ? tile.shape
                        : < GiCardJoker size={56} color='white' />
                    }
                  </div>
                })
                : null
            }
          </div>
          : null

      }
      <div className="controllers">
        {
          isStart
            ? <div className='options-box flex justify-center flex-col items-center gap-4'>
              <button className="btnBox flex justify-center gap-4">
                <button className='px-3 py-2 bg-violet-600 text-white rounded-md'
                  onClick={HandleHome}
                >Home</button>
                <button className='px-3 py-2 bg-red-400 text-white rounded-md'
                  onClick={HandleRestartGame}
                >Restart Game</button>
              </button>
              <div className="timer text-xl font-medium w-full flex justify-center items-center">
                <p className="stopwatch-time">
                  {hours}:{minutes.toString().padStart(2, "0")}:
                  {seconds.toString().padStart(2, "0")}:
                  {milliseconds.toString().padStart(2, "0")}
                </p>
              </div>
            </div>
            : <div className='main-display flex flex-col justify-center items-center gap-4'>
              <div className="infos w-full">
                <p className="text text-xl font-normal">Best time : {bestTime}</p>
              </div>
              <button className='px-3 py-2 bg-black text-white rounded-md'
                onClick={HandleStartGame}
              >Start Game</button>
            </div>
        }
      </div>

    </div>
  )
}

export default App
