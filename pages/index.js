import Head from 'next/head';
import { useRef, useState } from 'react';
import styles from '../styles/Index.module.css';
import Calendar from '../components/Calendar.js';
import Cake from '../components/Cake.js';

export default function Index() {
    const mainDiv = useRef(null);
    const audioElement = useRef(null)
    const videoElement = useRef(null);
    let [welcomeScreen, setWelcomeScreen] = useState(true);
    let [pastLyrics, setPastLyrics] = useState("");
    let [futureLyrics, setFutureLyrics] = useState("");

    const settings = {
        name: "Andrew",
        age: 22,
        month: "February",
        day: 6
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
    ];

    const finishedLoadingVideo = (e) => {
        console.log("Finished loading video!");
    }

    const startVideo = () => {
        setWelcomeScreen(false);
        mainDiv.current.requestFullscreen();
        // audioElement.current.currentTime = 40;
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

        // videoElement.current.play();
        console.log("Playing Video!");
    }

    const onAudioEnd = () => {
        console.log("Audio track finished! This shouldn't happen...");
    }

    const getVideoOpacity = () => {
        // return welcomeScreen ? 0 : 1;
        return 0;
    }

    return (
        <div ref={mainDiv} className={styles.mainDiv}>
            <Head>
                <title>Happy Birthday!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <audio ref={audioElement} onEnded={onAudioEnd} src="birthday.m4a"></audio>
            <video ref={videoElement} className={styles.video} onCanPlayThrough={finishedLoadingVideo} src="video.mp4" style={{opacity: getVideoOpacity()}}></video>
            
            {welcomeScreen ?
                <div className={styles.main}>
                    <div className={styles.header}>
                        <h1>Happy Birthday {settings.name}!</h1>
                        <p>Today's your special day! Since your friends aren't able to meet you in person, they have worked together to present this animation to you as a surprise!</p>
                    </div>

                    <hr style={{height: "3px", width: "100%", color: "black", backgroundColor: "black"}}></hr>

                    <div className={styles.startDiv}>
                        <p>This animation is designed to be played on a computer with audio on.</p>
                        <p>The browser will enter fullscreen mode.</p>
                        <button className={styles.startButton} onClick={startVideo}>Start Animation</button>
                    </div>
                </div>
            : 
                <>
                    <div className={styles.main}>
                        <div className={styles.header}>
                            <h1>{pastLyrics}<span className={styles.dim}>{futureLyrics}</span></h1>
                        </div>
                        <Calendar month={settings.month} day={settings.day}></Calendar>
                    </div>

                    <div className={styles.bottom}>
                        <Cake age={settings.age}></Cake>
                    </div>
                </>
            }
        </div>
    )
};