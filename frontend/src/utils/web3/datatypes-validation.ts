import Web3 from "web3";

export function isInt(value: string) {
  return (
    Number.isInteger(parseFloat(value)) &&
    !isNaN(value as any) &&
    !`${value}`.includes(".")
  );
}

export function isUint(value: string) {
  return isInt(value) && !`${value}`.includes("-");
}

export function getBytesSize(type: string) {
  return parseInt(type.split("bytes").pop() as string);
}

export function isBytes(type: string, value: string) {
  if (type === "bytes") {
    return true;
  } else {
    const bytesSize = getBytesSize(type);
    const bytes = value.startsWith("0x")
      ? value
      : Web3.utils.stringToHex(value);
    return bytes.length <= (bytesSize * 2) + 2;
  }
}
