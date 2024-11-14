export default function HeaderRes({ children, classname }) {
  const valueClass = classname;
  return <div className={`marginJustification ${valueClass}`}>{children}</div>;
}
