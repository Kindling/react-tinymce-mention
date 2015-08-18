export default function containsConsistantType(source, type) {
  return source && type && source.every(source =>
    typeof source === type
  );
}
