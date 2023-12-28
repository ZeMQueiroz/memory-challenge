import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pauseGame, resumeGame } from "../../redux/reducers/game";
import { logoutUser } from "../../redux/reducers/user";
import { saveHighScore } from "../../utils";
import useGameLogic from "../../hooks/useGameLogic";

import Timer from "../../components/Timer";
import ScoreModal from "../../components/ScoreModal";
import LogoutButton from "../../components/LogoutButton";
import GameComplete from "../../components/GameComplete";

import styles from "./style";

const Board = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isPaused = useSelector((state) => state.game.isPaused);
  const username = useSelector((state) => state.user.user);

  const {
    cards,
    flipCard,
    isGameComplete,
    timeCount,
    resetGame,
    setTimeCount,
    timerActive,
  } = useGameLogic(username);

  const handleShowHighScores = () => {
    navigate("/game/scores");
  };

  //adding highscore
  useEffect(() => {
    if (isGameComplete) {
      const highScore = {
        username,
        time: timeCount,
      };
      saveHighScore(highScore);
    }
  }, [isGameComplete, timeCount, username]);

  //logout
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  // show modal if route is /game/scores and also pause/resume game
  useEffect(() => {
    if (location.pathname === "/game/scores") {
      dispatch(pauseGame());
      setModalOpen(true);
    } else {
      dispatch(resumeGame());
      setModalOpen(false);
    }
  }, [location, dispatch]);

  const renderTitleRow = () => {
    return (
      <div style={styles.titleRowContainer}>
        <h1 style={styles.userTitle}>Welcome {username}</h1>
        <h1 style={styles.gameTitle}>Probely Memory Game Challenge</h1>
        <LogoutButton handleLogout={handleLogout} />
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div style={styles.headerContainer}>
        {renderTitleRow()}
        <div style={styles.headerBottomContainer}>
          <div style={styles.timerContainer}>
            <Timer
              timeCount={timeCount}
              setTimeCount={setTimeCount}
              timerActive={timerActive}
              isPaused={isPaused}
            />
          </div>
          <button style={styles.highScore} onClick={handleShowHighScores}>
            High Scores
          </button>
        </div>
      </div>
    );
  };

  const renderBoard = () => {
    return (
      <div style={styles.board}>
        {cards.map((card) => (
          <div
            key={card.id}
            style={
              card.flipped
                ? card.matched
                  ? styles.matched
                  : styles.flipped
                : styles.card
            }
            onClick={() => !card.flipped && flipCard(card.id)}
          >
            {card.flipped || card.matched ? (
              <img src={card.image} alt='card' />
            ) : (
              <div style={styles.cardBack}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {renderHeader()}
      {isGameComplete ? (
        <GameComplete
          checkScore={() => setModalOpen(true)}
          handlePlayAgain={resetGame}
        />
      ) : (
        renderBoard()
      )}
      {modalOpen && (
        <ScoreModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default Board;
