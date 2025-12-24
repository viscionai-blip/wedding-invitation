import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach((interval) => {
        timerComponents.push(
            <div key={interval} className="flex flex-col items-center mx-2">
                <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-burgundy/40 backdrop-blur-md rounded-xl border border-gold/20 shadow-lg text-cream text-xl md:text-2xl font-bold font-sans">
                    {timeLeft[interval]}
                </div>
                <span className="text-[10px] uppercase tracking-widest mt-2 text-cream/60 font-sans">
                    {interval}
                </span>
            </div>
        );
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex justify-center mt-6"
        >
            {timerComponents.length ? timerComponents : <span className="text-white text-xl font-script">The Big Day is Here!</span>}
        </motion.div>
    );
};

export default Countdown;
