export function findUniqueValues(array1, array2) {
  return array1.filter((element) => !array2.includes(element));
}

export function convertToLocalAM_PM(dateString) {
  const date = new Date(dateString);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
}
