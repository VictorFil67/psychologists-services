const AvatarIconSvg = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={40}
    fill="none"
    {...props}
  >
    <rect width={40} height={40} fill="#54BE96" rx={10} />
    <path
      fill="#FBFBFB"
      d="M20 12a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 10c4.42 0 8 1.79 8 4v2H12v-2c0-2.21 3.58-4 8-4Z"
    />
  </svg>
);
export default AvatarIconSvg;
