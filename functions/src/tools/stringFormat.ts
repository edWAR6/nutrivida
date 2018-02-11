function formatList(list: string) {
  let newList = list.replace(', ', '');
  newList = newList.replace(/,\s([^,]+)$/, ' y $1');
  return newList;
}

export {formatList};