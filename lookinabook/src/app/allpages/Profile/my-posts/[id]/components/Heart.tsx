


interface HeartIconProps {
  filled?: boolean;
  size?: number;
  color?: string;
}

const HeartIcon: React.FC<HeartIconProps> = ({
  filled = false,
  size = 24,
  color = 'red',
}) => {
  return (
    <svg
      width={size}
      height={(size * 571) / 650.7} // сохраняем пропорции
      viewBox="0 0 172.16511 151.07721"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="m 85.546188,15.624413 c 0,0 -17.734342,-10.6927651 -40.945469,-9.1279701 C 21.389595,8.0612373 0.34213415,27.418631 9.3928338,59.699469 17.216807,87.604981 87.632581,144.1984 87.632581,144.1984 c 0,0 84.716579,-65.823581 75.631759,-107.188458 C 151.63339,-15.947974 85.546188,15.624413 85.546188,15.624413 Z"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth="7"
      />
    </svg>
  );
};

export default HeartIcon;
