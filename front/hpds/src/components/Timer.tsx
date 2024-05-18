interface Props {
  minutes: number;
  seconds: number;
}

const Timer = ({ minutes, seconds }: Props) => {
  return `Time left: ${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default Timer;
