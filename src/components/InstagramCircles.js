// import React from "react";
// import "./InstagramCircles.css";

// const InstagramCircles = () => {
//   const instagramContent = [
//     { id: 1, videoUrl: "/videos/Video1.mp4" },
//     { id: 2, videoUrl: "/videos/Video2.mp4" },
//     { id: 3, videoUrl: "/videos/Video3.mp4" },
//     { id: 4, videoUrl: "/videos/Video4.mp4" },
//     { id: 5, videoUrl: "/videos/Video5.mp4" },
//   ];

//   return (
//     <div className="instagram-section">
//       <h2 className="section-heading"></h2>

//       <div className="circle-thumbnails-below-offer">
//         {instagramContent.map((item) => (
//           <div key={item.id} className="circle-thumb">
//             <video
//               src={item.videoUrl}
//               autoPlay
//               muted
//               loop
//               playsInline
//               className="circle-video"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
    
//   );
// };

// export default InstagramCircles;
import React from "react";

const InstagramCircles = () => {
  return (
    <div>
      <h2>Video Test</h2>
      <video
        src="/videos/Video1.mp4"
        autoPlay
        muted
        loop
        playsInline
        controls
        style={{
          width: "400px",
          height: "300px",
          display: "block",
          backgroundColor: "black",
          zIndex: 9999
        }}
      />
    </div>
  );
};

export default InstagramCircles;
