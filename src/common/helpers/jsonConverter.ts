export const objectToJson = (json) => {
  return JSON.stringify(json);
};

export const jsonToObject = (json: string) => {
  return JSON.parse(json);
};
