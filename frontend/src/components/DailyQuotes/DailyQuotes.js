import React, { useState, useEffect } from 'react';

const DailyQuotes = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Function to retrieve a random quote (replace with your logic)
    const getRandomQuote = () => {
      const quotes = [
        "The only way to do great work is to love what you do. – Steve Jobs",
        "Believe you can and you're halfway there. – Theodore Roosevelt",
        "It does not matter how slowly you go as long as you do not stop. – Confucius",
        "Health is a state of complete harmony of the body, mind, and spirit. When one is free from physical disabilities and mental distractions, the gates of the soul open. - B.K.S. Iyengar",
        "The greatest wealth is health. - Virgil",
        "Take care of your body. It's the only place you have to live. - Jim Rohn",
        "To keep the body in good health is a duty... otherwise we shall not be able to keep our mind strong and clear. - Buddha",
        "Physical fitness is not only one of the most important keys to a healthy body, but it is also the basis of dynamic and creative intellectual activity. - John F. Kennedy",
        "The only way to keep your health is to eat what you don't want, drink what you don't like, and do what you'd rather not. - Mark Twain",
        "Happiness is the highest form of health. - Dalai Lama",
        "He who has health has hope, and he who has hope has everything. - Arabian Proverb",
        "Your body hears everything your mind says. Stay positive. - Unknown",
        "Life is not merely being alive, but being well. - Marcus Valerius Martialis",
        "The secret of health for both mind and body is not to mourn for the past, worry about the future, or anticipate troubles, but to live in the present moment wisely and earnestly. - Buddha",
        "Health is not simply the absence of sickness. - Hannah Green",
        "The first wealth is health. - Ralph Waldo Emerson",
        "A healthy outside starts from the inside. - Robert Urich",
        "The groundwork of all happiness is health. - Leigh Hunt"
      ];
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    };

    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="motivational-quote">
      <h4>Daily Motivation:</h4>
      <p>{quote}</p>
    </div>
  );
};

export default DailyQuotes;
