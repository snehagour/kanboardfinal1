export function getData() {
  const list = localStorage.getItem("listData");
  if (list) {
    return JSON.parse(list);
  } else {
    return []
  }
}
