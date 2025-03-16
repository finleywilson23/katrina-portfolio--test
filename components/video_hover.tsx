"videogover function"



import {userEffect, useState, useRef} from "react
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
      className="w-64 h-40 border-2 border-gray-300 rounded-lg overflow-hidden"
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src="/path-to-your-video.mp4"
        muted
        loop
      />
    </div>
  );
};

export default HoverVideo;

  
  

  
