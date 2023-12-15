export const CircleButton = (props) => {
  return (
    <button
      style={{
        padding: "4.5px 13.12px",
        border: "none",
        margin: 0,
        boxSizing: "border-box",
        fontSize: "16px",
        display: "inline-flex",
        outline: 0,
        position: "relative",
        alignItems: "center",
        verticalAlign: "middle",
        justifyContent: "center",
        textDecoration: "none",
        background: "#E7E7E7",
        borderRadius: "30px",
        cursor: "pointer",
        ...props.style,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
export const InputQuantity = (props) => {
  return (
    <input
      type="text"
      maxLength={props.maxLength}
      value={props.value}
      onClick={props.onClick}
      onChange={props.onChange}
      style={{
        width: "100%",
        border: "none",
        margin: 0,
        outline: 0,
        padding: "3px",
        boxSizing: "border-box",
        textAlign: "center",
        ...props.style,
      }}
    />
  );
};