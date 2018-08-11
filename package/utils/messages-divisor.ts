import { IVacancy } from '../interfaces';
import { vacancyMessage } from '../templates';

export function messageDivisor(messages: IVacancy[]) {
  const MAX_CHARACTERS = 4096;
  let stringAcc: string = '';

  return messages.reduce<string[]>((acc, message, index) => {
    const newMessage = vacancyMessage(message) + '\n';
    const tempString = stringAcc + newMessage;

    if (Buffer.byteLength(tempString, 'utf8') >= MAX_CHARACTERS) {
      acc.push(stringAcc);
      stringAcc = newMessage;
    } else {
      stringAcc = tempString;
    }

    if (index + 1 === messages.length) {
      acc.push(stringAcc);
    }

    return acc;
  }, []);
}
