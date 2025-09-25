// utils/storageHelpers.js

const getImageUrl = (fileId, config) => {
  return `${config.endpoint}/storage/buckets/${config.bucketId}/files/${fileId}/view?project=${config.projectId}`;
};

const getAllImageUrls = (document, config) => {
  const urls = [getImageUrl(document.fileId, config)];

  if (document.additionalImageIds) {
    const additionalIds = document.additionalImageIds
      .split(',')
      .filter(id => id.trim());
    additionalIds.forEach(id => {
      urls.push(getImageUrl(id, config));
    });
  }

  return urls;
};

export { getImageUrl, getAllImageUrls };
