import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';

function App() {
  const jsConfetti = new JSConfetti();
  const [valueSi, setValueSi] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [countdown, setCountdown] = useState("Calculando...");

  useEffect(() => {
    const targetDate = new Date("2025-02-15T00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const timeLeft = targetDate - now;
      
      if (timeLeft <= 0) {
        clearInterval(interval);
        setCountdown("¡Feliz 15 de febrero de 2025!");
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        setCountdown(`${days} días, ${hours} horas, ${minutes} minutos`);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="w-screen h-screen bg-[url('https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif')] bg-no-repeat bg-cover flex items-center justify-center bg-center">
      {!valueSi ? (
        <div className="p-5 text-center">
          <h1 className="text-white font-bold text-5xl">¿Quieres ser mi San Valentín?</h1>
          <img src="https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" 
               alt="Stitch" className="mx-auto mt-5" width={400} height={400} />
          <div className="mt-10 flex justify-center space-x-5">
            <button onClick={() => {
              setValueSi(true);
              jsConfetti.addConfetti({ emojis: ['😍', '🥰', '❤️', '😘'], emojiSize: 70, confettiNumber: 80 });
            }} className="bg-green-500 text-white font-bold p-4 rounded-md text-xl">
              Sí
            </button>
            <button className="bg-red-500 text-white font-bold p-4 rounded-md text-xl">
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center space-y-10">
          <h1 className="text-4xl text-white font-bold">¡Sabía que dirías que sí! ❤️</h1>
          {!showGift ? (
            <img src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif" 
                 alt="Regalo" className="cursor-pointer" width={300} onClick={() => setShowGift(true)} />
          ) : (
            <div className="text-white text-2xl">Regalo próximamente</div>
          )}
          <div className="text-white text-lg">Tiempo restante para el 15 de febrero de 2025: {countdown}</div>
        </div>
      )}
    </main>
  );
}

export default App;

