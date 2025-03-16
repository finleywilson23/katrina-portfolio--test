"videogover function"



import {userEffect, useState, useRef} from "react;
  const HoverVideo = () => {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useref<HtMLVideoelement>(null);

  const handleMouseEnter= () => {
    setIsHovered(true);
    videoRef.current?.play();
  };
  const handleMouseLeave =() => {
    setIsHovered(false);
    videoRef.current?.pause();
    videoRef.current!.currentTime =0;
  };
  return(
    <div 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      class
  
  

  
