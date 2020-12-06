export default function excerpt(pargraph, limit) {
  let splitted = pargraph.split(" ");
  let newString = "";
  for (let i = 0; i < splitted.length; i++) {
    newString += (splitted[i] || "") + " ";
    if (i === limit) {
      return newString + "...";
    }
  }
  return newString;
}
