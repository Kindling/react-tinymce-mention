let id = 0;

export default function uid(prefix = '') {
  return String(prefix + id++);
};
