interface ButtonProps {
  title: string;
  // eslint-disable-next-line react/require-default-props
  disabled?: boolean;
  // eslint-disable-next-line react/require-default-props
  onClick?: () => void;
}

const Button = ({ onClick, title, disabled = false }: ButtonProps) => {
  return (
    <button
      style={{ margin: '10px' }}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
