import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  const jsConfetti = new JSConfetti();
  const [valueSi, setValueSi] = useState(false);
  const [showGift, setShowGift] = useState(false);
  const [giftSize, setGiftSize] = useState(100);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [contador, setContador] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [noSize, setNoSize] = useState(100);
  const [images, setImages] = useState([
    { id: 1, src: "/foto1.jpeg", x: 50, y: 50 },
    { id: 2, src: "/foto2.jpeg", x: 200, y: 100 },
    { id: 3, src: "/foto3.jpeg", x: 100, y: 300 },
    { id: 4, src: "/foto4.jpeg", x: 300, y: 200 },
  ]);

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

  const handleNoClick = () => {
    if (noSize > 0) {
      setNoSize(noSize - 20);
    }
  };

  const handleDrag = (id, event) => {
    const newX = event.clientX;
    const newY = event.clientY;
    setImages((prevImages) =>
      prevImages.map((img) =>
        img.id === id ? { ...img, x: newX, y: newY } : img
      )
    );
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <main className="fondo w-screen h-screen bg-no-repeat bg-cover flex items-center justify-center bg-center">
      {!valueSi ? (
        <div className="p-5">
          <h1 className="text-white font-bold text-5xl text-center">¿Quieres ser mi San Valentín?</h1>
          <img 
            src="/stich1.gif" 
            alt="San Valentín" 
            className="mx-auto" 
            width={400} 
            height={400} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5 items-center">
            <button onClick={() => setValueSi(true)} className="bg-green-500 text-white font-bold p-2 rounded-md text-xl">
              Sí
            </button>
            {noSize > 0 && (
              <button 
                onClick={handleNoClick} 
                className="bg-red-500 text-white font-bold p-2 rounded-md text-xl" 
                style={{ fontSize: `${noSize}%` }}
              >
                No
              </button>
            )}
          </div>
        </div>
      ) : !showFinalMessage ? (
        <div className="flex flex-col items-center">
          <img 
            src="/regalo.jpg" 
            alt="Regalo" 
            className="cursor-pointer" 
            width={giftSize} 
            height={giftSize} 
            onClick={handleGiftClick}
          />
        </div>
      ) : (
        <div className="relative w-full h-full flex justify-center items-center flex-col space-y-5">
          <h1 className="text-4xl text-white font-bold">¡Sabía que dirías que sí! ❤️</h1>
          <img 
            src="/stich2.gif" 
            alt="Sabía que dirías que sí" 
            className="mx-auto"
          />
          <div className="text-white text-2xl font-bold">
            Tiempo restante: {contador.days}d {contador.hours}h {contador.minutes}m {contador.seconds}s
          </div>
          <div className="w-1/2">
            <Slider {...settings}>
              {images.map((img) => (
                <div key={img.id}>
                  <img
                    src={img.src}
                    alt="Collage"
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
