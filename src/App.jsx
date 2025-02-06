import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';

function App() {
  const jsConfetti = new JSConfetti();
  const [agrandar, setAgrandar] = useState(45);
  const [valueSi, setValueSi] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [contador, setContador] = useState({ days: 0, hours: 0, minutes: 0 });
  const [mostrarNo, setMostrarNo] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const fechaObjetivo = new Date("2025-02-15").getTime();
      const ahora = new Date().getTime();
      const diferencia = fechaObjetivo - ahora;

      if (diferencia > 0) {
        const days = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        setContador({ days, hours, minutes });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const randomResponse = () => {
    if (agrandar > 10) {
      setAgrandar(agrandar - 10);
    } else {
      setMostrarNo(false);
    }
  };

  return (
    <main id="canvas" className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center">
      {!valueSi ? (
        <div className="p-5">
          <h1 className="text-white font-bold text-5xl text-center">¿Quieres ser mi San Valentín?</h1>
          <img src="https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" alt="Stitch" className="mx-auto" width={400} height={400} />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
            <button onClick={() => {
              setValueSi(true);
              jsConfetti.addConfetti({
                emojis: ['😍', '🥰', '❤️', '😘'],
                emojiSize: 70,
                confettiNumber: 80,
              });
            }} className="bg-green-500 text-white font-bold p-2 rounded-md text-xl">
              Si
            </button>
            {mostrarNo && (
              <button
                className="bg-red-500 text-white font-bold p-2 rounded-md text-xl"
                onClick={randomResponse}
                style={{ height: agrandar }}
              >
                No
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col space-y-10">
          <h1 className="text-4xl text-white font-bold">¡Sabía que dirías que sí! ❤️</h1>
          {!showGift ? (
            <img src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif" alt="Stitch feliz" className="mx-auto" onClick={() => setShowGift(true)} />
          ) : (
            <div className="text-white text-2xl">Regalo próximamente</div>
          )}
          <div className="text-white text-xl">
            {contador.days}d {contador.hours}h {contador.minutes}m
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
