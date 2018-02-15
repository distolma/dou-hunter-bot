import { parseString, OptionsV2 } from 'xml2js';

const conf: OptionsV2 = {
  explicitArray: false,
  trim: true,
};

export const xmlParser = (xml: string) => new Promise((resolve, reject) =>
  parseString(xml, conf, (err, result) => {
    if (err) reject(err);
    resolve(result);
  }));