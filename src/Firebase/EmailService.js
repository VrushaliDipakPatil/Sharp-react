import { firestore } from "./Firebase";


const sendEmailToReceiver = async (receiverUserId, emailData) => {
  // Store the email in the receiver's "inbox" folder
  await firestore.collection(`emails/${receiverUserId}/inbox`).add(emailData);

};

const storeEmailInSent = async (senderUserId, emailData) => {
  // Store the email in the sender's "sent" folder
  await firestore.collection(`emails/${senderUserId}/sent`).add(emailData);

};

export { sendEmailToReceiver, storeEmailInSent };
