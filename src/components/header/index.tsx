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
import { ModalTalk } from "../modal/modal";
import { LiaGlobeSolid } from "react-icons/lia";

interface Props {
  onAddTask: (taskTitle: string) => void;
  onSetLanguage: () => void;
  isEnglish: boolean;
}

export function Header({ onAddTask, onSetLanguage, isEnglish }: Props) {
  const song1 = useRef<HTMLAudioElement>(null);
  const song2 = useRef<HTMLAudioElement>(null);
  const song3 = useRef<HTMLAudioElement>(null);
  const [title, setTitle] = useState("");
  const bgs = [BG1, BG2, BG3, BG4, BG5, BG6];
  const [bgIndex, setBgIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songIndex, setSongIndex] = useState(0);
  const [chill, setChill] = useState(false);
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

  function onTalk() {
    setChill((current) => !current);
    console.log(chill);
  }

  return (
    <>
      <ModalTalk onTalk={onTalk} chill={chill} isEnglish={isEnglish} />
      <header className={chill ? style.chill : style.header}>
        <audio src={songs[0].music} ref={song1}></audio>
        <audio src={songs[1].music} ref={song2}></audio>
        <audio src={songs[2].music} ref={song3}></audio>
        <div className={style.VhsOverlay}></div>
        <img src={bgs[bgIndex]} className={style.BG} />
        <div className={style.logoWrapper}>
          <div className={chill ? style.chillLogo : style.logo}>
            <span className={style.magic}>TO</span>
            <div className={style.dot}></div>
            <span>DO</span>
          </div>
          <div className={chill ? style.chillIconsWrapper : style.iconsWrapper}>
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
          <button
            type="button"
            className={
              chill ? style.chillLanguageSelector : style.languageSelector
            }
            onClick={onSetLanguage}
          >
            <LiaGlobeSolid size={30} />{" "}
            <span>{isEnglish ? "English" : "PT - BR"}</span>
          </button>
          <input
            type="text"
            placeholder={
              isEnglish ? "Add a new task" : "Adicione uma nova tarefa"
            }
            onChange={handleOnChange}
            value={title}
          />
          <button className={chill ? style.createChill : style.create}>
            Criar <img src={Plus} alt="" />
          </button>
          <div className={chill ? style.chillBgConfig : style.bgConfig}>
            <button
              type="button"
              className={chill ? style.chillBgConfigButton : ""}
              onClick={backBG}
            >
              <IoChevronBackOutline size={25} />
            </button>
            <button
              type="button"
              className={chill ? style.chillBgConfigButton : ""}
              onClick={nextBG}
            >
              <IoChevronForwardOutline size={25} />
            </button>
          </div>
        </form>
        <CurrentSong songIndex={songIndex} isPlaying={isPlaying} />
      </header>
    </>
  );
}
