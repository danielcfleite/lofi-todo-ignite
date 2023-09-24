import alien from "../../assets/alienhead.jpg";
import style from "./modal.module.css";
import { useEffect, useState } from "react";

interface Props {
  onTalk: () => void;
  chill: boolean;
}

const LOCAL_STORAGE_ALIEN_KEY = "todo:alienTalked";

export function ModalTalk({ onTalk, chill }: Props) {
  const [line, setLine] = useState(1);
  const [linesMenu, setLinesMenu] = useState(false);
  const [exists, setExists] = useState(false);
  const [visited, setVisited] = useState(false);
  function nextLine() {
    if (line < 3) setLine((current) => current + 1);
    else {
      setExists(false);
    }
  }

  function ifVisited() {
    const hasVisited = localStorage.getItem(LOCAL_STORAGE_ALIEN_KEY);
    if (hasVisited) {
      setVisited(true);
    }
  }

  function startLinesMenu() {
    setLinesMenu(true);
  }

  function finishLinesMenu() {
    setLinesMenu(false);
  }

  function startTalk() {
    onTalk();
    if (chill === false && visited === false) {
      setLine(1);
      setExists(true);
      setVisited(true);
      localStorage.setItem(LOCAL_STORAGE_ALIEN_KEY, JSON.stringify(visited));
    }
  }

  useEffect(() => {
    ifVisited();
  }, []);

  return (
    <>
      <div className={style.menu}>
        <button
          className={style.alienMenu}
          onMouseEnter={startLinesMenu}
          onMouseLeave={finishLinesMenu}
          onClick={startTalk}
        >
          <img src={alien} className={style.alien} />
        </button>
        {linesMenu ? (
          <p className={style.MenuTalk}>
            {chill ? "Pronto para voltar?" : "Ei, afim de relaxar?"}
          </p>
        ) : (
          ""
        )}
      </div>
      <div className={exists ? "" : style.notExists}>
        <div className={style.modal} onClick={nextLine}>
          {line >= 1 && <p className={style.talk}>Oi</p>}

          {line >= 2 && (
            <p className={style.talk}>
              Se você quiser apenas ouvir música e relaxar
            </p>
          )}
          {line >= 3 && <p className={style.talk}>Sinta-se em casa</p>}
          <div className={style.alienBtn}>
            <img src={alien} className={style.alien} />
          </div>
        </div>
      </div>
    </>
  );
}
