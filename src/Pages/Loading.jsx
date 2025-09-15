import { useEffect, useRef, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { Howl } from "howler";
import video from "../assets/video.mp4";
import music from "../assets/music.mp3";

/* ---------- 1. Styled components with video background ---------- */
const Screen = styled(Box)({
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  userSelect: "none",
  padding: 20,
  position: "relative",
  overflow: "hidden",
});

const VideoBackground = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 0,
  "&::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.4)",
  },
});

const Video = styled("video")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const Content = styled(Box)({
  position: "relative",
  zIndex: 1,
});

const Title = styled(Typography)({
  opacity: 0,
  marginBottom: "2rem",
});

const AudioButton = styled("button")({
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 10,
  background: "rgba(0, 0, 0, 0.5)",
  border: "2px solid #0099ff",
  borderRadius: "50%",
  width: 40,
  height: 40,
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    background: "rgba(0, 153, 255, 0.3)",
  },
});

/* ---------- 2. Ghost styles ---------- */
/* ---------- 3. Pixel-ghost converted to styled component ---------- */
const ghostCSS = `
  #ghost{position:relative;scale:.8}
  #red{animation:upNDown .5s infinite;position:relative;width:140px;height:140px;display:grid;grid-template-columns:repeat(14,1fr);grid-template-rows:repeat(14,1fr);grid-column-gap:0;grid-row-gap:0;grid-template-areas:"a1 a2 a3 a4 a5 top0 top0 top0 top0 a10 a11 a12 a13 a14""b1 b2 b3 top1 top1 top1 top1 top1 top1 top1 top1 b12 b13 b14""c1 c2 top2 top2 top2 top2 top2 top2 top2 top2 top2 top2 c13 c14""d1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 d14""e1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 e14""f1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 f14""top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4""top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4""top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4""top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4""top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4""top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4""st0 st0 an4 st1 an7 st2 an10 an10 st3 an13 st4 an16 st5 st5""an1 an2 an3 an5 an6 an8 an9 an9 an11 an12 an14 an15 an17 an18"
  }
  @keyframes upNDown{0%,49%{transform:translateY(0)}50%,100%{transform:translateY(-10px)}}
  #top0,#top1,#top2,#top3,#top4,#st0,#st1,#st2,#st3,#st4,#st5{background:#0099ff}
  #top0{grid-area:top0}#top1{grid-area:top1}#top2{grid-area:top2}#top3{grid-area:top3}#top4{grid-area:top4}
  #st0{grid-area:st0}#st1{grid-area:st1}#st2{grid-area:st2}#st3{grid-area:st3}#st4{grid-area:st4}#st5{grid-area:st5}
  #an1{grid-area:an1;animation:flicker0 .5s infinite}#an18{grid-area:an18;animation:flicker0 .5s infinite}
  #an2{grid-area:an2;animation:flicker1 .5s infinite}#an17{grid-area:an17;animation:flicker1 .5s infinite}
  #an3{grid-area:an3;animation:flicker1 .5s infinite}#an16{grid-area:an16;animation:flicker1 .5s infinite}
  #an4{grid-area:an4;animation:flicker1 .5s infinite}#an15{grid-area:an15;animation:flicker1 .5s infinite}
  #an6{grid-area:an6;animation:flicker0 .5s infinite}#an12{grid-area:an12;animation:flicker0 .5s infinite}
  #an7{grid-area:an7;animation:flicker0 .5s infinite}#an13{grid-area:an13;animation:flicker0 .5s infinite}
  #an9{grid-area:an9;animation:flicker1 .5s infinite}#an10{grid-area:an10;animation:flicker1 .5s infinite}
  #an8{grid-area:an8;animation:flicker0 .5s infinite}#an11{grid-area:an11;animation:flicker0 .5s infinite}
  @keyframes flicker0{0%,49%{background:#0099ff}50%,100%{background:transparent}}
  @keyframes flicker1{0%,49%{background:transparent}50%,100%{background:#0099ff}}
  #eye,#eye1{width:40px;height:50px;position:absolute;top:30px}
  #eye{left:10px}#eye1{right:30px}
  #eye::before,#eye1::before{content:"";background:white;width:20px;height:50px;transform:translateX(10px);display:block;position:absolute}
  #eye::after,#eye1::after{content:"";background:white;width:40px;height:30px;transform:translateY(10px);display:block;position:absolute}
  #pupil,#pupil1{width:20px;height:20px;background:#ffd900;position:absolute;top:50px;z-index:1;animation:eyesMovement 3s infinite}
  #pupil{left:10px}#pupil1{right:50px}
  @keyframes eyesMovement{0%,49%{transform:translateX(0)}50%,99%{transform:translateX(10px)}100%{transform:translateX(0)}}
  #shadow{background:black;width:140px;height:140px;position:absolute;border-radius:50%;transform:rotateX(80deg);filter:blur(20px);top:80%;animation:shadowMovement .5s infinite}
  @keyframes shadowMovement{0%,49%{opacity:.5}50%,100%{opacity:.2}}
`;

const GhostWrapper = styled("div")``; // empty; CSS injected below

/* ---------- 4. Bouncing dots inside button ---------- */
const Dot = styled("span")({
  width: 10,
  height: 10,
  marginLeft: 4,
  borderRadius: "50%",
  display: "inline-block",
  background: "#ffd900",
});

const FancyButton = styled("button")({
  "--stone-50": "#fafaf9",
  "--stone-800": "#0099ffff",
  "--yellow-400": "#facc15",

  fontFamily: '"Rubik", sans-serif',
  cursor: "pointer",
  position: "relative",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  lineHeight: 1,
  fontSize: "1rem",
  borderRadius: "1rem",
  outline: "2px solid transparent",
  outlineOffset: "6px",
  color: "var(--stone-50)",
  background: "transparent",
  border: "none",
  padding: 0,

  "&:active": {
    outlineColor: "var(--yellow-400)",
  },
  "&:focus-visible": {
    outlineColor: "var(--yellow-400)",
    outlineStyle: "dashed",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    zIndex: 0,
    height: "200%",
    maxHeight: "100px",
    aspectRatio: "1 / 1",
    margin: "auto",
    background: "#0099ffff",
    clipPath: `polygon(
      100% 50%,91.48% 56.57%,97.55% 65.45%,87.42% 69.07%,90.45% 79.39%,
      79.7% 79.7%,79.39% 90.45%,69.07% 87.42%,65.45% 97.55%,56.57% 91.48%,
      50% 100%,43.43% 91.48%,34.55% 97.55%,30.93% 87.42%,20.61% 90.45%,
      20.3% 79.7%,9.55% 79.39%,12.58% 69.07%,2.45% 65.45%,8.52% 56.57%,
      0% 50%,8.52% 43.43%,2.45% 34.55%,12.58% 30.93%,9.55% 20.61%,
      20.3% 20.3%,20.61% 9.55%,30.93% 12.58%,34.55% 2.45%,43.43% 8.52%,
      50% 0%,56.57% 8.52%,65.45% 2.45%,69.07% 12.58%,79.39% 9.55%,
      79.7% 20.3%,90.45% 20.61%,87.42% 30.93%,97.55% 34.55%,91.48% 43.43%
    )`,
    animation: "star-rotate 4s linear infinite",
    opacity: 0.1,
  },
  "&:hover::before": {
    opacity: 1,
  },
  "& > div": {
    padding: "2px",
    borderRadius: "1rem",
    backgroundColor: "var(--yellow-400)",
    transform: "translate(-4px,-4px)",
    transition: "all 150ms ease",
    boxShadow: `
      0.5px 0.5px 0 0 var(--yellow-400),
      1px 1px 0 0 var(--yellow-400),
      2px 2px 0 0 var(--yellow-400),
      3px 3px 0 0 var(--yellow-400),
      0 0 0 2px var(--stone-800),
      2px 2px 0 2px var(--stone-800),
      3px 3px 0 2px var(--stone-800),
      4px 4px 0 2px var(--stone-800),
      0 0 0 4px var(--stone-50),
      3px 3px 0 4px var(--stone-50),
      4px 4px 0 4px var(--stone-50)
    `,
  },
  "&:hover > div": {
    transform: "translate(0,0)",
    boxShadow: `
      0 0 0 0 var(--yellow-400),
      0 0 0 2px var(--stone-800),
      0 0 0 4px var(--stone-50)
    `,
  },
  "& > div > div": {
    position: "relative",
    borderRadius: "calc(1rem - 2px)",
    backgroundColor: "var(--stone-800)",
    display: "flex",
    alignItems: "center",
    padding: "0.75rem 1.25rem",
    gap: "0.25rem",
    filter: "drop-shadow(0 -1px 0 var(--stone-800))",
  },
});

// add animations
const extraKeyframes = `
@keyframes star-rotate { from {transform: rotate(0deg);} to {transform: rotate(360deg);} }
@keyframes dots {
  0% { background-position: 0 0, 4px 4px; }
  100% { background-position: 8px 0, 12px 4px; }
}
`;

function Dots() {
  const dotsRef = useRef([]);
  useEffect(() => {
    gsap.to(dotsRef.current, {
      keyframes: { "0%": { y: 0 }, "50%": { y: -8 }, "100%": { y: 0 } },
      ease: "power1.inOut",
      duration: 0.6,
      stagger: 0.15,
      repeat: -1,
    });
  }, []);
  return (
    <>
      {[0, 1, 2].map((i) => (
        <Dot key={i} ref={(el) => (dotsRef.current[i] = el)} />
      ))}
    </>
  );
}

/* ---------- 4. Main component ---------- */
export default function Loading() {
  const titleRef = useRef(null);
  const btnRef = useRef(null);
  const ghostRef = useRef(null);
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const soundRef = useRef(null);
const [audioEnabled, setAudioEnabled] = useState(true); // default true

useEffect(() => {
  // Initialize Howler audio
  soundRef.current = new Howl({
    src: [music],
    loop: true,
    volume: 0.5,
    onplay: () => setAudioEnabled(true),
    onpause: () => setAudioEnabled(false),
    onstop: () => setAudioEnabled(false),
  });

  // Try autoplay immediately
  const attemptPlay = () => {
    soundRef.current.play();

    // Verify if blocked
    setTimeout(() => {
      if (!soundRef.current.playing()) {
        setAudioEnabled(false); // fallback to muted state
      }
    }, 300);
  };

  attemptPlay();

  // Cleanup
  return () => {
    if (soundRef.current) {
      soundRef.current.stop();
    }
  };
}, []);

  /* GSAP entrance */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
    tl.fromTo(
      titleRef.current,
      { y: -150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        btnRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 },
        "-=0.3"
      );
  }, []);

  /* Play video */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.log("Video autoplay blocked:", err));
    }
  }, []);

  /* Toggle audio */
const toggleAudio = () => {
  if (soundRef.current.playing()) {
    soundRef.current.pause();
  } else {
    soundRef.current.play();
  }
};


  /* Hover jump effect */
  const handleHover = () => {
    if (ghostRef.current) {
      gsap.to(ghostRef.current, { y: -150, duration: 0.5, ease: "power2.out" });
    }
  };
  const handleLeave = () => {
    if (ghostRef.current) {
      gsap.to(ghostRef.current, { y: 0, duration: 0.5, ease: "power2.inOut" });
    }
  };

  /* Button click → navigate */
  const handleClick = () => {
    if (soundRef.current) soundRef.current.stop();
    navigate("/home");
  };

  return (
    <>
      <style>{ghostCSS}</style>
      <style>{extraKeyframes}</style>

      <Screen>
        <VideoBackground>
          <Video ref={videoRef} autoPlay muted loop playsInline>
            <source src={video} type="video/mp4" />
          </Video>
        </VideoBackground>

        <AudioButton onClick={toggleAudio}>
          {audioEnabled ? "🔊" : "🔇"}
        </AudioButton>

        <Content>
          <Title
            ref={titleRef}
            variant="h1"
            sx={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: { xs: "2.5rem", sm: "4rem", md: "5rem" },
              fontFamily: "Keania One",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            C-Tech Fiesta
          </Title>

          {/* Ghost */}
          <GhostWrapper ref={ghostRef} sx={{ml:{ xs: 5.5, sm: 19 }, mb: 4 }}> 
            <div id="ghost">
              <div id="red">
                <div id="pupil"></div>
                <div id="pupil1"></div>
                <div id="eye"></div>
                <div id="eye1"></div>
                <div id="top0"></div>
                <div id="top1"></div>
                <div id="top2"></div>
                <div id="top3"></div>
                <div id="top4"></div>
                <div id="st0"></div>
                <div id="st1"></div>
                <div id="st2"></div>
                <div id="st3"></div>
                <div id="st4"></div>
                <div id="st5"></div>
                <div id="an1"></div>
                <div id="an2"></div>
                <div id="an3"></div>
                <div id="an4"></div>
                <div id="an5"></div>
                <div id="an6"></div>
                <div id="an7"></div>
                <div id="an8"></div>
                <div id="an9"></div>
                <div id="an10"></div>
                <div id="an11"></div>
                <div id="an12"></div>
                <div id="an13"></div>
                <div id="an14"></div>
                <div id="an15"></div>
                <div id="an16"></div>
                <div id="an17"></div>
                <div id="an18"></div>
              </div>
              <div id="shadow"></div>
            </div>
          </GhostWrapper>

          {/* Play button */}
          <FancyButton
            ref={btnRef}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            onClick={handleClick}
            sx={{ mt: 2 }}
          >
            <div>
              <div>
                Let’s Play <Dots />
              </div>
            </div>
          </FancyButton>
        </Content>
      </Screen>
    </>
  );
}