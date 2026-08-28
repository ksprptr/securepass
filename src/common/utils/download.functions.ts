/**
 * Function to trigger a browser download for the given href
 **/
export const triggerDownload = (href: string, fileName: string) => {
  const link = document.createElement('a');

  link.href = href;
  link.download = fileName;
  link.click();
};

/**
 * Function to trigger a browser download for an in-memory text file
 **/
export const downloadTextFile = (contents: string, fileName: string, type: string) => {
  const url = URL.createObjectURL(new Blob([contents], { type }));

  triggerDownload(url, fileName);
  URL.revokeObjectURL(url);
};
