export default function GridDiv({ children, classname, cols }) {
  console.log(cols);
  const valueClass = classname || " ";
  const validCols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const colClass = validCols.includes(cols)
    ? `grid-cols-${cols}`
    : "grid-cols-1";
  console.log(colClass);
  return (
    <div className={`${valueClass} grid ${colClass} gap-2`}>{children}</div>
  );
}
