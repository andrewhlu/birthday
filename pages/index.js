import Head from 'next/head';
import { useRef, useState } from 'react';
import styles from '../styles/Index.module.css';
import Calendar from '../components/Calendar.js';
import Cake from '../components/Cake.js';
import Gift from '../components/Gift.js';

export default function Index() {
    const mainDiv = useRef(null);
    const videoDiv = useRef(null);
    const audioElement = useRef(null)
    const videoElement = useRef(null);
    let [isAnimationStarted, setIsAnimationStarted] = useState(false);
    let [isSongFinished, setIsSongFinished] = useState(true);
    let [isVideoFadeStarted, setIsVideoFadeStarted] = useState(false);
    let [isVideosStarted, setIsVideosStarted] = useState(false);
    let [pastLyrics, setPastLyrics] = useState("");
    let [futureLyrics, setFutureLyrics] = useState("");
    let [currentVideo, setCurrentVideo] = useState(0);
    let [isGiftOpened, setIsGiftOpened] = useState(false);

    const settings = {
        name: "Andrew",
        age: 22,
        month: "February",
        day: 6
    }

    // The first entry is a placeholder and is necessary for the videos to work
    const videos = [
        {
            url: "#",
        },
        {
            url: "yucy.mkv",
            name: "Yucy Jia",
            gift: "$25 Amazon Gift Card",
            openTime: 26500
        },
        {
            url: "jayleen.mp4",
            name: "Jayleen Li",
            gift: "3D Printed Frog",
            openTime: 21500
        },
        {
            url: "daniel.mp4",
            name: "Daniel Gultom"
        }
    ]

    const getAgeWithSuffix = () => {
        let i = settings.age;
        let j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "st";
        }
        if (j == 2 && k != 12) {
            return i + "nd";
        }
        if (j == 3 && k != 13) {
            return i + "rd";
        }
        return i + "th";
    }

    const liveLyrics = [
        [0, "It's a special day!", " (Your Birthday!)"],
        [3129, "Sing along with us!", ""],
        [5401, "🎵 Hap", "py Birthday to You! 🎵"],
        [5556, "🎵 Happy ", "Birthday to You! 🎵"],
        [5729, "🎵 Happy Birth", "day to You! 🎵"],
        [6048, "🎵 Happy Birthday", " to You! 🎵"],
        [7669, "🎵 Happy Birthday to", " You! 🎵"],
        [8341, "🎵 Happy Birthday to You!", " 🎵"],
        [10605, "🎵 Hap", "py Birthday to You! 🎵"],
        [10760, "🎵 Happy ", "Birthday to You! 🎵"],
        [10933, "🎵 Happy Birth", "day to You! 🎵"],
        [11252, "🎵 Happy Birthday", " to You! 🎵"],
        [12873, "🎵 Happy Birthday to", " You! 🎵"],
        [13545, "🎵 Happy Birthday to You!", " 🎵"],
        [15535, "🎵 Hap", `py Birthday to ${settings.name}! 🎵`],
        [15842, "🎵 Happy ", `Birthday to ${settings.name}! 🎵`],
        [16195, "🎵 Happy Birth", `day to ${settings.name}! 🎵`],
        [17505, "🎵 Happy Birthday", ` to ${settings.name}! 🎵`],
        [18147, "🎵 Happy Birthday to", ` ${settings.name}! 🎵`],
        [18807, `🎵 Happy Birthday to ${settings.name}!`, " 🎵"],
        [20768, "🎵 Hap", "py Birthday to You! 🎵"],
        [21066, "🎵 Happy ", "Birthday to You! 🎵"],
        [21411, "🎵 Happy Birth", "day to You! 🎵"],
        [22318, "🎵 Happy Birthday", " to You! 🎵"],
        [23351, "🎵 Happy Birthday to", " You! 🎵"],
        [24023, "🎵 Happy Birthday to You!", " 🎵"],
        [26610, `🎉 Andrew, it's your ${getAgeWithSuffix()} birthday! 🎉`, ""],
    ];

    const onVideoEnd = (e) => {
        startNextVideo();
        console.log("Finished loading video!");
    }

    const startAnimation = () => {
        setIsAnimationStarted(true);
        mainDiv.current.requestFullscreen();
        audioElement.current.play();

        setTimeout(() => {
            setInterval(() => {
                audioElement.current.currentTime = 5.058;
            }, 41790);
        }, 5058);

        liveLyrics.forEach(lyric => {
            setTimeout(() => {
                setPastLyrics(lyric[1]);
                setFutureLyrics(lyric[2]);
            }, lyric[0]);
        });

        setTimeout(() => {
            setIsSongFinished(true);
        }, 26610);

        console.log("Playing Video!");
    }

    const startVideo = () => {
        if (isSongFinished) {
            console.log("Starting Video");

            for (let i = 1; i <= 10; i++) {
                setTimeout(() => {
                    audioElement.current.volume = 1 - (i * 0.09);
                }, 100 * i);
            }

            setIsVideoFadeStarted(true);
            setTimeout(() => {
                setIsVideosStarted(true);
                startNextVideo();
            }, 1000);
        }
    }

    const startNextVideo = () => {
        const videoNum = currentVideo + 1;
        setIsGiftOpened(false);

        if (videoNum < videos.length) {
            setCurrentVideo(videoNum);

            videoElement.current.volume = 1;
            setTimeout(() => {
                videoElement.current.play();
            }, 500);

            if (videos[videoNum].openTime !== undefined) {
                setTimeout(() => {
                    setIsGiftOpened(true);
                }, videos[videoNum].openTime + 500);
            }
        } else {
            console.log("Videos Finished!");
        }
    }

    const onAudioEnd = () => {
        console.log("Audio track finished! This shouldn't happen...");
    }

    return (
        <>
            <audio ref={audioElement} onEnded={onAudioEnd} src="birthday.m4a"></audio>
            {!isVideosStarted ?
                <div ref={mainDiv} className={`${styles.mainDiv} ${isVideoFadeStarted ? styles.fadeoutAnimation : ""}`}>
                    <Head>
                        <title>Happy Birthday!</title>
                        <link rel="icon" href="/favicon.ico" />
                    </Head>
                    
                    {isAnimationStarted ?
                        <>
                            <div className={styles.main}>
                                <div className={styles.header}>
                                    <h1>{pastLyrics}<span className={styles.dim}>{futureLyrics}</span></h1>
                                </div>
                                <Calendar month={settings.month} day={settings.day}></Calendar>
                                {isSongFinished &&
                                    <div className={styles.header}>
                                        <p>Today's your special day!</p>
                                        <p>Since your friends aren't able to meet you in person, they have worked together to present this animation to you as a surprise!</p>
                                        <p>Let's see what messages and presents your friends left for you!</p>
                                        <p>Click the cake to continue.</p>
                                    </div>
                                }
                            </div>

                            <div className={styles.bottom} onClick={startVideo}>
                                <Cake age={settings.age}></Cake>
                            </div>
                        </>
                    :
                        <div className={styles.main}>
                            <div className={styles.header}>
                                <h1>Happy Birthday {settings.name}!</h1>
                            </div>

                            <hr style={{height: "3px", width: "100%", color: "black", backgroundColor: "black"}}></hr>

                            <div className={styles.startDiv}>
                                <p>This animation is designed to be played on a computer with audio on.</p>
                                <p>The browser will enter fullscreen mode.</p>
                                <button className={styles.startButton} onClick={startAnimation}>Start Animation</button>
                            </div>
                        </div>
                    }
                </div>
            :
                <div ref={videoDiv} className={styles.videoDiv}>
                    <div className={styles.topBar}>{videos[currentVideo].name}</div>
                    <video ref={videoElement} className={styles.video} onEnded={onVideoEnd} src={videos[currentVideo].url}></video>
                    {videos[currentVideo].gift !== undefined &&
                        <div className={styles.bottomDiv}>
                            <Gift gift={videos[currentVideo]?.gift} opened={isGiftOpened} name={videos[currentVideo].name}></Gift>
                        </div>
                    }
                </div>
            }
        </>
    )
};