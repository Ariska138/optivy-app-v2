import React, { useState, useEffect, useCallback } from 'react';

/**
 * A component that displays a countdown timer to a target date.
 */
export const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const calculateTimeLeft = useCallback(() => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: {[key: string]: number} = {};
        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => { setTimeLeft(calculateTimeLeft()); }, 1000);
        return () => clearInterval(timer);
    }, [calculateTimeLeft]);

    return (
        <div className="flex justify-center gap-2 sm:gap-4">
            {Object.keys(timeLeft).length ? Object.entries(timeLeft).map(([interval, value]) => (
                <div key={interval} className="flex flex-col items-center p-2 bg-gray-100 rounded-lg w-16">
                    <span className="text-2xl sm:text-4xl font-bold">{String(value).padStart(2, '0')}</span>
                    <span className="text-xs uppercase">{interval}</span>
                </div>
            )) : <span className="p-4 font-semibold text-lg">Time's up!</span>}
        </div>
    );
};
