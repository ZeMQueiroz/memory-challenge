import React, { useEffect, useState } from "react";
import { logoutUser } from "../../reducers/user";
import { fetchImages } from "../../utils";

import Timer from "../../components/Timer";

import styles from "./style";

const Board = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [timeCount, setTimeCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [cantFlipMore, setCanFlipMore] = useState(true); // to ensure that the user can't flip more than 2 cards at a time
  const [gameOver, setGameOver] = useState(false);

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

  const flipCard = (id) => {
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
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard.image === secondCard.image) {
        // It's a match
        setMatchedCards(
          (matchedCards) =>
            new Set([...matchedCards, firstCardId, secondCardId])
        );
      } else {
        // Not a match, flip the cards back after a short delay
        setTimeout(() => {
          setCards((cards) =>
            cards.map((card) => {
              if (card.id === firstCardId || card.id === secondCardId) {
                return { ...card, flipped: false };
              }
              return card;
            })
          );
        }, 1000);
      }

      setFlippedCards([]);
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
      <Timer
        timeCount={timeCount}
        setTimeCount={setTimeCount}
        timerActive={timerActive}
      />
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
    </div>
  );
};

export default Board;
