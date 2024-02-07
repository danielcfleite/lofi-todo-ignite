import styles from "./currentSong.module.css";
import { songs } from "../../songs";
import { TbHeadphonesOff, TbHeadphones } from "react-icons/tb";
import { useState } from "react";

interface Props {
  isPlaying: boolean;
  songIndex: number;
}

export function CurrentSong({ isPlaying, songIndex }: Props) {
  function hide() {
    setIsHidden((current) => !current);
  }
  const [isHidden, setIsHidden] = useState(false);
  return (
    <>
      {isHidden ? (
        <button className={styles.headPhones} onClick={hide}>
          {isPlaying ? <TbHeadphones /> : <TbHeadphonesOff />}
        </button>
      ) : (
        <div
          className={isPlaying ? styles.boxActive : styles.boxInnactive}
          onClick={hide}
        >
          <header className={isHidden ? styles.hidden : styles.currentHeader}>
            <div className={styles.songInfo}>
              <span className={styles.playing}>Now Playing</span>
              <h1 className={styles.songTitle}>{songs[songIndex].title}</h1>
            </div>
            <img src={songs[songIndex].imgUrl} className={styles.channelImg} />
          </header>
        </div>
      )}
    </>
  );
}
