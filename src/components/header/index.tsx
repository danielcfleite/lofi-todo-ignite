import Plus from "../../assets/plus.svg";
import BG1 from "../../assets/gif-logi-radio.gif";
import BG2 from "../../assets/bg-2.gif";
import BG3 from "../../assets/bg-3.gif";
import BG4 from "../../assets/bg-4.gif";
import BG5 from "../../assets/bg-5.gif";
import BG6 from "../../assets/bg-6.gif";
import style from "./header.module.css";
import { IoChevronForwardOutline } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
import { IoPlayCircleSharp } from "react-icons/io5";
import { IoPlaySkipBackCircleSharp } from "react-icons/io5";
import { IoPlaySkipForwardCircle, IoPauseCircleSharp } from "react-icons/io5";
import { ChangeEvent, FormEvent, useRef } from "react";
import { useState } from "react";
import { songs } from "../../songs";
import { CurrentSong } from "../currentSong/currentSong";

interface Props {
  onAddTask: (taskTitle: string) => void;
}

export function Header({ onAddTask }: Props) {
  const song1 = useRef<HTMLAudioElement>(null);
  const song2 = useRef<HTMLAudioElement>(null);
  const song3 = useRef<HTMLAudioElement>(null);
  const [title, setTitle] = useState("");
  const bgs = [BG1, BG2, BG3, BG4, BG5, BG6];
  const [bgIndex, setBgIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const songsToPlay = [song1, song2, song3];

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onAddTask(title);
    setTitle("");
  }

  function play() {
    if (isPlaying === false) {
      songsToPlay[songIndex].current!.play();
      setIsPlaying(true);
      console.log(songIndex);
    } else {
      songsToPlay[songIndex].current!.pause();
      setIsPlaying(false);
    }
  }

  function backBG() {
    if (bgIndex > 0) {
      setBgIndex((current) => current - 1);
    } else {
      setBgIndex(bgs.length - 1);
    }
  }

  function nextBG() {
    if (bgIndex < bgs.length - 1) {
      setBgIndex((current) => current + 1);
    } else {
      setBgIndex(0);
    }
  }

  async function skipBackSong() {
    if (songIndex > 0) {
      pauseAll();
      setIsPlaying(false);
      setSongIndex((current) => current - 1);
    } else {
      pauseAll();
      setIsPlaying(false);
      console.log(songIndex);
      setSongIndex(2);
    }
  }

  function skipSong() {
    if (songIndex < 2) {
      pauseAll();
      setIsPlaying(false);
      setSongIndex((current) => current + 1);
    } else {
      pauseAll();
      setIsPlaying(false);
      console.log(songIndex);
      setSongIndex(0);
    }
  }

  function pauseAll() {
    song1.current!.pause();
    song2.current!.pause();
    song3.current!.pause();
  }

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
  }

  return (
    <>
      <header className={style.header}>
        <audio src={songs[0].music} ref={song1}></audio>
        <audio src={songs[1].music} ref={song2}></audio>
        <audio src={songs[2].music} ref={song3}></audio>
        <div className={style.VhsOverlay}></div>
        <img src={bgs[bgIndex]} className={style.BG} />
        <div className={style.logoWrapper}>
          <div className={style.logo}>
            <span className={style.magic}>TO</span>
            <div className={style.dot}></div>
            <span>DO</span>
          </div>
          <div className={style.iconsWrapper}>
            <IoPlaySkipBackCircleSharp
              className={style.btnControls}
              size={30}
              onClick={skipBackSong}
            />
            {isPlaying ? (
              <IoPauseCircleSharp
                size={30}
                className={style.btnControls}
                onClick={play}
              />
            ) : (
              <IoPlayCircleSharp
                size={30}
                className={style.btnControls}
                onClick={play}
              />
            )}
            <IoPlaySkipForwardCircle
              size={30}
              className={style.btnControls}
              onClick={skipSong}
            />
          </div>
        </div>
        <form className={style.taskForm} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={handleOnChange}
            value={title}
          />
          <button>
            Criar <img src={Plus} alt="" />
          </button>
          <div className={style.bgConfig}>
            <button type="button" onClick={backBG}>
              <IoChevronBackOutline />
            </button>
            <button type="button" onClick={nextBG}>
              <IoChevronForwardOutline />
            </button>
          </div>
        </form>
        <CurrentSong songIndex={songIndex} isPlaying={isPlaying} />
      </header>
    </>
  );
}