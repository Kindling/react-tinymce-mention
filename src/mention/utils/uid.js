var id = 0;

export default function uid(prefix = '') {
  return prefix + id++;
};
