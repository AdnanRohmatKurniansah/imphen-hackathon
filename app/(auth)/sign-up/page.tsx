import RegisterPage from "./register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrasi Sekarang | NexaAI",
};

export default function Page() {
  return <RegisterPage />;
}
