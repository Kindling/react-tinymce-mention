export default function spliceSplit(str, index, count, add) {
  var ar = str.split('');
  ar.splice(index, count, add);
  return ar.join('');
}
