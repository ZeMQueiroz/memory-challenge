import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { pauseGame, resumeGame } from "../../redux/reducers/game";
import { fetchImages } from "../../utils";

import Timer from "../../components/Timer";
import ScoreModal from "../../components/ScoreModal";

import styles from "./style";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [cantFlipMore, setCanFlipMore] = useState(false); // to ensure that the user can't flip more than 2 cards at a time
  const [modalOpen, setModalOpen] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const dispatch = useDispatch();
  const isPaused = useSelector((state) => state.game.isPaused);

  const username = useSelector((state) => state.user.user);
  console.log("🚀🚀 ~  file: index.js:25 ~  Board ~  username:", username);

  useEffect(() => {
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
    };

    gameInit();
  }, []);

  const openModal = () => {
    setModalOpen(true);
    dispatch(pauseGame());
  };

  const closeModal = () => {
    setModalOpen(false);
    dispatch(resumeGame());
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
        }, 1000); // 1 second delay for the player to see the cards
      }
    }
  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.size === cards.length) {
      setTimerActive(false);
      console.log("Game complete! Time taken: " + timeCount + " seconds");
      // Handle game completion (e.g., stop timer, show message)
    }
  }, [matchedCards, cards, timeCount]);

  const resetGame = () => {
    setTimeCount(0);
    setTimerActive(false);
  };

  return (
    <div style={styles.container}>
      <h1>Welcome {username}</h1>
      <h1>Memory Game</h1>
      <div>
        <Timer
          timeCount={timeCount}
          setTimeCount={setTimeCount}
          timerActive={timerActive}
          isPaused={isPaused}
        />
        <button onClick={openModal}>High Scores</button>
      </div>
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
      {modalOpen && (
        <ScoreModal
          isOpen={modalOpen}
          onClose={closeModal}
          // scores={scores}
        />
      )}
    </div>
  );
};

export default Board;
