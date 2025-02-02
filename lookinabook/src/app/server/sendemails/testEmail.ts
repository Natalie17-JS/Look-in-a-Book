import { sendVerificationEmail } from "./emailService";

// Функция для генерации случайного 6-значного кода
const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Генерирует число от 100000 до 999999
};

const testEmail = async () => {
  const verificationCode = generateVerificationCode(); // Генерация кода
  try {
    await sendVerificationEmail("Alextrazzza@gmail.com", verificationCode);
    console.log("Test email was send with a code:", verificationCode);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

testEmail();
