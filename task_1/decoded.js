export function decodeFields(encodedData, translations) {
  const decodedData = [];
  const uniqueIds = new Set();

  encodedData.forEach(item => {
    const decodedItem = { ...item }; 

    for (const key in item) {
      if (key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
        const translationKey = item[key];
        if (translations[translationKey]) {
          decodedItem[key] = translations[translationKey];
        }
        uniqueIds.add(translationKey);
      }
    }

    decodedData.push(decodedItem);
  });

  return { decodedData, uniqueIds };
}

export function findMissingValues(uniqueIds, translations) {
  let missingValues = [];
  uniqueIds.forEach(id => {
      if (translations[id] === undefined) {
          missingValues.push(id);
      }
  });
  return missingValues;
}

