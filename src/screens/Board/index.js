import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { pauseGame, resumeGame } from "../../redux/reducers/game";
import { logoutUser } from "../../redux/reducers/user";
import {
  fetchImages,
  saveGameState,
  loadGameState,
  clearGameState,
  saveHighScore,
} from "../../utils";

import Timer from "../../components/Timer";
import ScoreModal from "../../components/ScoreModal";
import LogoutButton from "../../components/LogoutButton";
import GameComplete from "../../components/GameComplete";

import styles from "./style";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [isInitalLoading, setInitialLoading] = useState(true); // to ensure that the game is saved after the initial load

  const [flippedCards, setFlippedCards] = useState([]);

  const [matchedCards, setMatchedCards] = useState(new Set());

  const [timeCount, setTimeCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [cantFlipMore, setCanFlipMore] = useState(false); // to ensure that the user can't flip more than 2 cards at a time
  const [modalOpen, setModalOpen] = useState(false);
  const [isGameComplete, setIsGameComplete] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isPaused = useSelector((state) => state.game.isPaused);
  const username = useSelector((state) => state.user.user);
  console.log("location", location);
  //save

  useEffect(() => {
    if (!isInitalLoading) {
      const gameState = {
        username,
        cards,
        flippedCards,
        // have to covert matchedCards to an array to be able to save it
        matchedCards: Array.from(matchedCards),
        timeCount,
        timerActive,
        cantFlipMore,
        isGameComplete,
      };
      saveGameState(gameState);
    }
  }, [
    cards,
    flippedCards,
    matchedCards,
    timeCount,
    timerActive,
    cantFlipMore,
    isInitalLoading,
    username,
    isGameComplete,
  ]);

  //load
  useEffect(() => {
    const savedData = loadGameState();
    console.log(
      "🚀🚀 ~  file: index.js:74 ~  useEffect ~  savedData:",
      savedData
    );

    if (savedData && savedData.username === username) {
      if (!savedData.isGameComplete) {
        // Load the game state
        setCards(savedData.cards);
        setFlippedCards(savedData.flippedCards);
        setMatchedCards(new Set(savedData.matchedCards));
        setTimeCount(savedData.timeCount);
        setTimerActive(savedData.timerActive);
        setCanFlipMore(savedData.cantFlipMore);
      } else {
        gameInit();
      }
    } else {
      // Initialize a new game
      gameInit();
    }
  }, [username]);

  // Passar para utils <------
  const gameInit = async () => {
    const images = await fetchImages();
    const doubledImages = [...images, ...images]; // Double the images for pairs
    // Shuffle and create cards
    const shuffledCards = doubledImages
      .map((image) => ({
        id: Math.random(),
        image,
        flipped: false,
        matched: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setInitialLoading(false);
  };
  const handleShowHighScores = () => {
    navigate("/game/scores");
  };

  const flipCard = (id) => {
    // flip + flipped + paused + gameOver
    if (
      cantFlipMore ||
      cards.find((card) => card.id === id).flipped ||
      isPaused
    ) {
      return null;
    }

    if (!timerActive) setTimerActive(true);

    setCards((cards) =>
      cards.map((card) => {
        if (card.id === id) {
          return { ...card, flipped: true };
        }
        return card;
      })
    );
    setFlippedCards((flippedCards) => [...flippedCards, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlipMore(true);
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard.image === secondCard.image) {
        setCards((prevCards) =>
          prevCards.map((card) => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return { ...card, matched: true };
            }
            return card;
          })
        );
        setMatchedCards(
          (matchedCards) =>
            new Set([...matchedCards, firstCardId, secondCardId])
        );
        setFlippedCards([]);
        setCanFlipMore(false);
      } else {
        setTimeout(() => {
          setCards((cards) =>
            cards.map((card) => {
              if (card.id === firstCardId || card.id === secondCardId) {
                return { ...card, flipped: false };
              }
              return card;
            })
          );
          setFlippedCards([]);
          setCanFlipMore(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.size === cards.length && !isInitalLoading) {
      setTimerActive(false);
      setIsGameComplete(true);
    }
  }, [matchedCards, cards, timeCount, isInitalLoading]);

  const resetGame = () => {
    clearGameState();
    setInitialLoading(true);
    setCards([]);
    setFlippedCards([]);
    setMatchedCards(new Set());
    setTimeCount(0);
    setTimerActive(false);
    setIsGameComplete(false);
    gameInit();
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

  return (
    <div style={styles.container}>
      {renderHeader()}
      {isGameComplete ? (
        <GameComplete
          checkScore={() => setModalOpen(true)}
          handlePlayAgain={resetGame}
        />
      ) : (
        <div style={styles.board}>
          {cards.map((card) => (
            <div
              key={card.id}
              style={
                // passar logica para fora
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
      )}
      {modalOpen && (
        <ScoreModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
};

export default Board;
