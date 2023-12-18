import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css"

function App() {
    const hourInputRef = useRef<HTMLInputElement>(null);
    const minInputRef = useRef<HTMLInputElement>(null);
    const secInputRef = useRef<HTMLInputElement>(null);
    const [totalTime, setTotalTime] = useState(0);
    const [isTimerStarted, setIsTimerStarted] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTime = totalTime - 1;
            if (newTime < 0) {
                clearInterval(intervalId);
                setIsTimerStarted(false);
                initalizeTimerFields();
            }
            else {
                updateTimerFields(newTime);
                setTotalTime(newTime);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [totalTime])

    function startButtonClickHandler() {
        if (
            hourInputRef.current!.value ||
            minInputRef.current!.value ||
            secInputRef.current!.value
        ) {
            const hourInSec = hourInputRef.current!.value ? Number(hourInputRef.current!.value) * 3600 : 0;
            const minInSec = minInputRef.current!.value ? Number(minInputRef.current!.value) * 60 : 0;
            const sec = secInputRef.current!.value ? Number(secInputRef.current!.value) : 0;

            const time = hourInSec + minInSec + sec;
            if (time > 0) {
                setTotalTime(hourInSec + minInSec + sec);
                setIsTimerStarted(true);
            }
        }
    }

    function resetButtonClickHandler() {
        setTotalTime(0);
    }

    function updateTimerFields(time: number) {
        const hour: number = Math.floor(time / 3600);
        const min: number = Math.floor((time % 3600) / 60);
        const sec: number = Math.floor((time % 3600) % 60);
        hourInputRef.current!.value = String(hour).length === 1 ? `0${String(hour)}` : String(hour);
        minInputRef.current!.value = String(min).length === 1 ? `0${String(min)}` : String(min);
        secInputRef.current!.value = String(sec).length === 1 ? `0${String(sec)}` : String(sec);
    }

    function initalizeTimerFields() {
        hourInputRef.current!.value = "";
        minInputRef.current!.value = "";
        secInputRef.current!.value = "";
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.timer_container}>
                    <input type="number" placeholder="H" ref={hourInputRef} disabled={isTimerStarted} /> :
                    <input type="number" placeholder="M" ref={minInputRef} disabled={isTimerStarted} /> :
                    <input type="number" placeholder="S" ref={secInputRef} disabled={isTimerStarted} />
                </div>
                <div className={styles.action_container}>
                    <button
                        className={styles.reset_btn}
                        onClick={resetButtonClickHandler}
                    >
                        Reset
                    </button>
                    <button
                        className={styles.start_btn}
                        onClick={startButtonClickHandler}
                        disabled={isTimerStarted}
                    >
                        Start
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;