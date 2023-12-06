export function Button(props: any) {
  if (!props) return null;
  return <button>{props.text}</button>;
}
