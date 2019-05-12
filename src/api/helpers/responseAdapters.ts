const responseAdapter = (statusCode = 200) => message => ({
  statusCode,
  body: JSON.stringify(message, null, 2)
});

export const responseOk = responseAdapter(200);

export const responseError = responseAdapter(500);

export const parseParams = <T>(jsonStr: string): T | null => {
  let validJson = null;
  try {
    validJson = JSON.parse(jsonStr);
  } catch (e) {
    console.error('Cannot parse json', e.message);
  }
  return validJson;
};
