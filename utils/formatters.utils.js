export function formatUrlQueryData(data) {
  const ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

// export const formatExpirationTimestamp = (delta) => {
//   let expirationTimestampFormatted = new Date(
//     _.now() + delta * 1000
//   ).toISOString();
//   return expirationTimestampFormatted;
// };
