interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const getTimeLeft = (from: Date, till: Date): TimeLeft => {
  const difference = till.getTime() - from.getTime();

  if (difference < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

export const isTimeLeft = (timeLeft: TimeLeft): Boolean => {
  return !(timeLeft.days == 0 && timeLeft.hours == 0 && timeLeft.minutes == 0 && timeLeft.seconds == 0);
}

export default TimeLeft;