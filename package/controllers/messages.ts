import { HtmlData } from "../interfaces";

export const vacancyMessage = (vacancy: HtmlData) => `
  [${vacancy.title}](${vacancy.url}) at *${vacancy.company}*
  ${vacancy.description}
`;