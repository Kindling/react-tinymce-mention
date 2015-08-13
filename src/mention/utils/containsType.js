export default function containsType(source, type) {
  return source && type && source.every(source =>
    typeof source === type
  );
}
