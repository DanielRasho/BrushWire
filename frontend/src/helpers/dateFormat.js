export default function formatDate(dateString) {
  const date = new Date(dateString);
  console.log(dateString);
  const options = { month: "short", day: "2-digit", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
}
