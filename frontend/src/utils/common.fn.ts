import { message } from "antd";
import moment from "moment";
import Web3 from "web3";

export const stripText = (str: string, size = 4, minLength = 9) => {
  if (str && str.length > minLength) {
    return (
      str.substr(0, size) +
      "..." +
      str.substr(str.length - size, str.length - 1)
    );
  } else {
    return str;
  }
};

export const toSmartContractTime = (date: moment.Moment) => {
  return Math.floor(date.toDate().getTime() / 1000);
};

export const fromSmartContractTime = (date: number | string) => {
  const dateStr = date.toString();
  date = parseInt(dateStr);
  return moment(dateStr.length === 13 ? date : date * 1000);
};

export const fromSmartContractTimeFromNow = (value: number | string) => {
  const date = fromSmartContractTime(value);
  return date.fromNow() + " (" + date.format("MMM-DD-YYYY HH:mm:ss A") + ")";
};

export const fromValToPeriodObject = (
  value: string,
  sequence: boolean = true
) => {
  value = value.trim();
  const values = value ? value.split(" ") : undefined;
  const obj: {
    i: number | string;
    p: number;
    s?: number;
    isSet: boolean;
  } = {
    i: values ? values[0] : 0,
    p: values
      ? ["day", "week", "month", "quarter", "half", "years"].indexOf(
          values[1].toLocaleLowerCase()
        )
      : 0,
    s: 0,
    isSet: value.trim() ? false : true,
  };
  if (!sequence) delete obj.s;
  return obj;
};

export const fromPeriodObjectToVal = (object: {
  i: string;
  p: string;
  s: string;
  isSet: boolean;
}) => {
  const periodUnit = ["day", "week", "month", "quarter", "half", "years"];
  return object.i.toString() !== "0"
    ? `${object.i} ${periodUnit[parseInt(object.p)]} ${
        object.s !== undefined ? (object.s ? "enabled" : "disabled") : ""
      }`
    : "None";
};

export function hex2asc(pStr: string, encodingBit = 16) {
  let tempStr = "";
  for (let b = 0; b < pStr.length; b = b + 2) {
    const code = parseInt(pStr.substr(b, 2), encodingBit);
    if (code !== 0) {
      tempStr = tempStr + String.fromCharCode(code);
    }
  }
  return tempStr.substr(1);
}

export function num2hex(str: any) {
  return "0x" + str.toString(16);
}

function fallbackCopyTextToClipboard(text: string) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

export function copyTextToClipboard(text: string) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

export function csvToJson(csv: string, headers?: string[]) {
  const lines = csv.split("\n");
  const result = [];
  const startPoint = headers ? 0 : 1;
  headers = headers || lines[0].split(",");
  for (let i = startPoint; i < lines.length; i++) {
    if (!lines[i]) continue;
    const obj: any = {};
    const currentLine = lines[i].split(",");
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j]?.toString().trim();
    }
    result.push(obj);
  }
  return result;
}

const templateRegex = /(?<variable>((\$)+(\{)+(?<prop>[^\}]*)+(})))/g;
export function processTemplate(template: string, object: any) {
  const list = template.matchAll(templateRegex);
  let done = false;
  const stringParts = [];
  let lastIndex = 0;
  while (!done) {
    let next = list.next();
    done = next.done || false;
    if (!done) {
      const { variable, prop }: { variable: string; prop: string } =
        next.value.groups;
      const index = template.indexOf(variable, lastIndex);
      stringParts.push(template.substring(lastIndex, index));
      stringParts.push(object[prop] || "");
      lastIndex = index + variable.length;
    } else {
      stringParts.push(template.substring(lastIndex, template.length));
    }
  }
  return stringParts.join("");
}

export function toLabel(text: string) {
  return (text.substr(0, 1).toUpperCase() + text.substr(1))
    .split(/(?=[A-Z])/)
    .map((value) => {
      return value.length === 1 ? value : value + " ";
    })
    .join("")
    .trim();
}
