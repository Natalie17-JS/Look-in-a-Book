import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { VERIFY_CODE } from "@/app/GraphqlOnClient/mutations/verifyCodeMutation";
import { useRouter } from "next/navigation";

const CODE_LENGTH = 6;

export default function VerifyCodeForm({ email }: { email: string }) {
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(CODE_LENGTH).fill(null));
  const [verifyCode, { loading, error }] = useMutation(VERIFY_CODE);
  const router = useRouter();

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return; // Разрешаем только цифры (или пустую строку)
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Переключаем фокус на следующее поле
    if (value && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Если все поля заполнены, отправляем код
    if (newCode.every((num) => num !== "")) {
      submitCode(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submitCode = async (fullCode: string) => {
    try {
      const { data } = await verifyCode({ variables: { email, code: fullCode } });
      alert(data.verifyCode); // Выводим сообщение об успешном подтверждении
      router.push("/"); // Перенаправляем пользователя
    } catch (err) {
      console.error("Verification error:", err);
    }
  };

  return (
    <div>
      <h2>Enter the verification code</h2>
      <div style={{display: "flex", gap: "5px"}}>
        {code.map((num, index) => (
          <input
            key={index}
            ref={(el) => {
                inputRefs.current[index] = el;
              }} // ✅ Исправлено: теперь массив корректно наполняется рефами
            type="text"
            maxLength={1}
            value={num}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      {error && <p>{error.message}</p>}
    </div>
  );
}
