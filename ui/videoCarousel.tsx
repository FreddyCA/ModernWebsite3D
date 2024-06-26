"use client";
import { hightlightsSlides } from "@/constants";
import { pauseImg, playImg, replayImg } from "@/lib";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface VideoMetadataEvent extends React.SyntheticEvent<HTMLVideoElement> {
  target: HTMLVideoElement;
}
// gsap.registerPlugin(ScrollTrigger)

export default function VideoCarousel() {
  // const videoRef = useRef([]);
  // const videoSpanRef = useRef([]);
  // const videoDivRef = useRef([]);
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const videoSpanRef = useRef<(HTMLSpanElement | null)[]>([]);
  const videoDivRef = useRef<(HTMLSpanElement | null)[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // const [loadedData, setLoadedData] = useState([]);
  const [loadedData, setLoadedData] = useState<HTMLVideoElement[]>([]);

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  // useEffect(() => {
  //   if (loadedData.length > 3) {
  //     if (!isPlaying) {
  //       videoRef.current[videoId].pause();
  //     } else {
  //       startPlay && videoRef.current[videoId].play();
  //     }
  //   }
  // }, [startPlay, videoId, isPlaying, loadedData]);
  useEffect(() => {
    if (loadedData.length > 3 && videoRef.current[videoId]) {
      const videoElement = videoRef.current[videoId];
      if (!isPlaying) {
        videoElement?.pause();
      } else {
        startPlay && videoElement?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e]);
  const handleLoadedMetadata = (i: number, e: VideoMetadataEvent) => {
    setLoadedData((prev) => [...prev, e.target]);
  };
  // useEffect(() => {
  //   const currentProgress = 0;
  //   let span = videoSpanRef.current;
  //   if (span[videoId]) {
  //     // animacion del progreso de un video
  //     let anim = gsap.to(span[videoId], {
  //       onUpdate: () => {},
  //       onComplete: () => {},
  //     });
  //   }
  // }, [videoId, startPlay]);
  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animation to move the indicator
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {
          // get the progress of the video
          const progress = Math.ceil(anim.progress() * 100);

          if (progress != currentProgress) {
            currentProgress = progress;

            // set the width of the progress bar
            gsap.to(videoDivRef.current[videoId], {
              width:
                window.innerWidth < 760
                  ? "10vw" // mobile
                  : window.innerWidth < 1200
                  ? "10vw" // tablet
                  : "4vw", // laptop
            });

            // set the background color of the progress bar
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },

        // when the video is ended, replace the progress bar with the indicator and change the background color
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });

      if (videoId == 0) {
        anim.restart();
      }

      // update the progress bar
      const animUpdate = () => {
        const videoElement = videoRef.current[videoId];
        if (videoElement) {
          anim.progress(
            videoElement.currentTime / hightlightsSlides[videoId].videoDuration
          );
        }
      };

      if (isPlaying) {
        // ticker to update the progress bar
        gsap.ticker.add(animUpdate);
      } else {
        // remove the ticker when the video is paused (progress bar is stopped)
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isPlaying]);

  type ProcessType = "video-end" | "video-last" | "video-reset" | "play";
  const handleProcess = (type: ProcessType, i: number) => {
    switch (type) {
      case "video-end":
        setVideo((pre) => ({ ...pre, isEnd: true, videoId: i + 1 }));
        break;

      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;

      case "video-reset":
        setVideo((pre) => ({ ...pre, isLastVideo: false, videoId: 0 }));
        break;

      case "play":
        setVideo((pre) => ({ ...pre, isPlaying: !pre.isPlaying }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="video-carousel_container">
              <div
                className="w-full h-full flex-center
              rounded-3xl overflow-hidden bg-black"
              >
                <video
                  // autoPlay loop
                  id="video"
                  playsInline={true}
                  muted
                  preload="auto"
                  key={list.video}
                  ref={(el) => {
                    videoRef.current[i] = el;
                  }}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  // onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                  onLoadedMetadata={(e) =>
                    handleLoadedMetadata(i, e as VideoMetadataEvent)
                  }
                >
                  <source src={list.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex-center mt-10">
        <div className="flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              // ref={(el) => {(videoDivRef.current[i] = el)}}
              ref={(el) => {
                if (el) {
                  videoDivRef.current[i] = el;
                }
              }}
              className="mx-2 w-3 h-3  bg-gray-200 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                // ref={(el) => {(videoSpanRef.current[i] = el)}}
                ref={(el) => {
                  if (el) {
                    videoSpanRef.current[i] = el;
                  }
                }}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <Image
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                ? () => handleProcess("play")
                : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
}
