import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendWelcomeEmail = (email: string, name: string) => {
  sgMail.send({
    to: email,
    from: "lucas.fernandes1454@gmail.com",
    subject: "Welcome to the Task Manager App!",
    text: `We are so happy to have you with us, ${name}! To start things off, here's a quick rundown of the main features you're going to find on the app...`,
  });
};

export const sendCancelationEmail = (email: string, name: string) => {
  sgMail.send({
    to: email,
    from: "lucas.fernandes1454@gmail.com",
    subject: "Goodbye :(",
    text: `Thank you for using our app, ${name}. Before we leave you, please help us understand what we could have done better. Any feedback is appreciated!`,
  });
};
