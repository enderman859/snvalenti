 import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';
function App() {
  const jsConfetti = new JSConfetti();
  const [agrandar, setAgrandar] = useState(45);
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
    
      {!valueSi ? (
        


          

¿Quieres ser mi San Valentín?


          
          


             setValueSi(true)} className="bg-green-500 text-white font-bold p-2 rounded-md text-xl">
              Sí
            
            
              No
            
          


        


      ) : !showFinalMessage ? (
        


          

¡Aquí tienes un regalo! 🎁


          
        


      ) : (
        


          

¡Sabía que dirías que sí! ❤️


          
        


      )}
      


        {contador.days}d {contador.hours}h {contador.minutes}m {contador.seconds}s
      


    
  );
}
export default App;
