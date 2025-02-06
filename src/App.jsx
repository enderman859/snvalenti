import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';

function App() {
  const jsConfetti = new JSConfetti();
  const [agrandar, setAgrandar] = useState(45);
  const [valueSi, setValueSi] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [contador, setContador] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const fechaObjetivo = new Date("2025-02-15").getTime();
      const ahora = new Date().getTime();
      const diferencia = fechaObjetivo - ahora;
      setContador(Math.max(0, Math.floor(diferencia / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const randomResponse = () => {
    if (agrandar > 10) {
      setAgrandar(agrandar - 10);
    }
  };

  return (
    <main id="canvas" className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center">
      {
        !valueSi ? (
          <div className="p-5">
            <h1 className="text-white font-bold text-5xl text-center">¿Quieres ser mi San Valentín?</h1>
            <img src="https://i.pinimg.com/originals/db/aa/c1/dbaac13f6278b91a15e480752b8a7242.gif" alt="Stitch" className="mx-auto" width={400} height={400} />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
              <button onClick={() => {
                setValueSi(true);
              }} className="bg-green-500 text-white font-bold p-2 rounded-md text-xl" style={{ height: agrandar }}>
                Si
              </button>
              <button
                className="bg-red-500 text-white font-bold p-2 rounded-md text-xl"
                onClick={randomResponse}
                style={{ height: agrandar }}
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col space-y-10">
            {!showGift ? (
              <div className="flex flex-col items-center">
                <h1 className="text-white text-2xl mb-4">¡Abre el regalo!</h1>
                <img 
                  src="/mnt/data/7dddd696f44f65abd299f5b63c8ee549.jpg" 
                  alt="Regalo de Stitch" 
                  className="cursor-pointer transition-transform transform hover:scale-110" 
                  width={400} height={400}
                  onClick={() => {
                    setShowGift(true);
                    jsConfetti.addConfetti({
                      emojis: ['🎁', '🎉', '❤️'],
                      confettiNumber: 100,
                    });
                  }}
                />
              </div>
            ) : (
              <div className="text-center">
                <h1 className="text-4xl text-white font-bold">¡Sabía que dirías que sí! ❤️</h1>
                <img src="https://i.pinimg.com/originals/9b/dc/c6/9bdcc6206c1d36a37149d31108c6bb41.gif" alt="Stitch feliz" className="mx-auto mt-6" />
                <div className="text-white text-xl mt-4">Tiempo restante: {Math.floor(contador / 86400)} días {Math.floor((contador % 86400) / 3600)} horas {Math.floor((contador % 3600) / 60)} minutos</div>
              </div>
            )}
          </div>
        )
      }
    </main>
  );
}

export default App;
