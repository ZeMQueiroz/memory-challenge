import { useState, useEffect } from "react";
import {
  initializeGame,
  saveGameState,
  loadGameState,
  clearGameState,
} from "../utils";

const useGameLogic = (username) => {
  const [isInitalLoading, setInitialLoading] = useState(true); // Ensure the game is marked as initially loading
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState(new Set());
  const [isGameComplete, setIsGameComplete] = useState(false); // Manage game completion
  const [timeCount, setTimeCount] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [cantFlipMore, setCanFlipMore] = useState(false);

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

  useEffect(() => {
    if (
      matchedCards.size === cards.length &&
      cards.length > 0 &&
      !isInitalLoading
    ) {
      setTimerActive(false);
      setIsGameComplete(true);
    }
  }, [matchedCards, cards, isGameComplete, isInitalLoading]);

  // Game Initialization
  useEffect(() => {
    const setupGame = async () => {
      const savedData = loadGameState();
      if (savedData && savedData.username === username) {
        if (!savedData.isGameComplete) {
          setCards(savedData.cards);
          setFlippedCards(savedData.flippedCards);
          setMatchedCards(new Set(savedData.matchedCards));
          setTimeCount(savedData.timeCount);
          setTimerActive(savedData.timerActive);
          setCanFlipMore(savedData.cantFlipMore);
          setIsGameComplete(savedData.isGameComplete);
        } else {
          const newCards = await initializeGame();
          setCards(newCards);
          setInitialLoading(false);
        }
      } else {
        const newCards = await initializeGame();
        setCards(newCards);
        setInitialLoading(false);
      }
    };
    setupGame();
  }, [username]);

  const resetGame = async () => {
    clearGameState();
    const newCards = await initializeGame();
    setCards(newCards);
    setFlippedCards([]);
    setMatchedCards(new Set());
    setTimeCount(0);
    setTimerActive(false);
    setIsGameComplete(false);
    setInitialLoading(false);
  };

  // Flip Cards
  const flipCard = (id) => {
    if (cantFlipMore || cards.find((card) => card.id === id).flipped) {
      return;
    }

    if (!timerActive) setTimerActive(true);

    setCards((cards) =>
      cards.map((card) => (card.id === id ? { ...card, flipped: true } : card))
    );
    setFlippedCards([...flippedCards, id]);
  };

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      setCanFlipMore(true);
      const [firstCardId, secondCardId] = flippedCards;
      const firstCard = cards.find((card) => card.id === firstCardId);
      const secondCard = cards.find((card) => card.id === secondCardId);

      if (firstCard.image === secondCard.image) {
        setMatchedCards(new Set([...matchedCards, firstCardId, secondCardId]));
        setCards((cards) =>
          cards.map((card) => {
            if (card.id === firstCardId || card.id === secondCardId) {
              return { ...card, matched: true };
            }
            return card;
          })
        );
        setFlippedCards([]);
        setCanFlipMore(false);
      } else {
        // card flip delay if mismatch
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
  }, [flippedCards, cards, matchedCards]);

  // Check for game completion
  useEffect(() => {
    if (matchedCards.size === cards.length && cards.length > 0) {
      setTimerActive(false);
      setIsGameComplete(true);
    }
  }, [matchedCards, cards, timeCount]);

  return {
    cards,
    flipCard,
    timeCount,
    timerActive,
    flippedCards,
    matchedCards,
    cantFlipMore,
    setTimeCount,
    resetGame,
    isGameComplete,
    setTimerActive,
    isInitalLoading,
  };
};

export default useGameLogic;
