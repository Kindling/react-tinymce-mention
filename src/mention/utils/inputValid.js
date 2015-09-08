const INPUT_THRESHOLD = 1;

export default function inputValid(input) {
  const length = input.length;

  return (length > INPUT_THRESHOLD || length === 0)
    ? true
    : false;
}
