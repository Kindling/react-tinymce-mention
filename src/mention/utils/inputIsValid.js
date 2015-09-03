const INPUT_THRESHOLD = 2;

export default function inputIsValid(input) {
  const length = input.length;

  return (length > INPUT_THRESHOLD || length === 0)
    ? true
    : false;
}
