export function decodeFields(encodedData, translations) {
  const decodedData = [];
  const untranslatedValuesSet = new Set();

  encodedData.forEach(item => {
    const decodedItem = { ...item };

    for (const key in item) {
      if (key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
        let translationKey = item[key];
        if (translations[translationKey] !== undefined) {
          decodedItem[key] = translations[translationKey];
        } else {
          untranslatedValuesSet.add(translationKey);
        }
      }
    }
    decodedData.push(decodedItem);
  });

  const missingValues = Array.from(untranslatedValuesSet);//преобразуем в массив
  return { decodedData, missingValues };
}
