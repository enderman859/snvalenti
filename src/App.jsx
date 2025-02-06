import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';

function App() {
  const jsConfetti = new JSConfetti();
  const [valueSi, setValueSi] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [giftSize, setGiftSize] = useState(100);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [contador, setContador] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const fechaObjetivo = new Date("2025-02-15").getTime();
      const ahora = new Date().getTime();
      const diferencia = fechaObjetivo - ahora;

      const days = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diferencia % (1000 * 60)) / 1000);

      setContador({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGiftClick = () => {
    if (giftSize < 300) {
      setGiftSize(giftSize + 20);
    } else {
      setShowFinalMessage(true);
      jsConfetti.addConfetti({
        emojis: ['🎉', '💖', '🎊', '😍'],
        confettiNumber: 100,
      });
    }
  };

  return (
    <main className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center">
      {!valueSi ? (
        <div className="p-5">
          <h1 className="text-white font-bold text-5xl text-center">¿Quieres ser mi San Valentín?</h1>
          <img 
            src="https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" 
            alt="Stitch" 
            className="mx-auto" 
            width={400} 
            height={400} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
            <button onClick={() => setValueSi(true)} className="bg-green-500 text-white font-bold p-2 rounded-md text-xl">
              Sí
            </button>
            <button className="bg-red-500 text-white font-bold p-2 rounded-md text-xl">
              No
            </button>
          </div>
        </div>
      ) : !showFinalMessage ? (
        <div className="flex flex-col items-center">
          <span className="text-6xl cursor-pointer" onClick={handleGiftClick}>🎁</span>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-5">
          <h1 className="text-4xl text-white font-bold">¡Sabía que dirías que sí! ❤️</h1>
          <img 
            src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif" 
            alt="Stitch feliz" 
            className="mx-auto"
          />
          <div className="text-white text-2xl font-bold">
            Tiempo restante: {contador.days}d {contador.hours}h {contador.minutes}m {contador.seconds}s
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
