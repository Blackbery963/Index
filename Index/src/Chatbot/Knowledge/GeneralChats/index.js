import { aboutAI } from "./aboutAI";
import { platformCasual } from "./platformCasual";
import { emotionalChat } from "./emotionalChat";
import { utilityChat } from "./utilityChat";
import { generalChat } from "./generalChat";

console.log("newCommonChatResponses loaded");

export const newCommonChatResponses = {
  ...generalChat,
  ...aboutAI,
  ...platformCasual,
  ...emotionalChat,
  ...utilityChat,

}
