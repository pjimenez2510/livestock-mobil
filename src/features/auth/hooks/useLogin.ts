import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Keyboard } from "react-native";
import { useToast } from "react-native-toast-notifications";
import { z } from "zod";
import { AuthService } from "../services/auth.service";
import { useAuth } from "@/src/core/providers/AuthProvider";

const schema = z.object({
  username: z.string().min(1, "El email es requerido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type FormFields = z.infer<typeof schema>;

export function useLogin() {
  const toast = useToast();
  const { signIn } = useAuth();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    Keyboard.dismiss();
    try {
      await signIn(data.username, data.password);
    } catch (error) {
      console.log(error);
    }
    //loogin
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
}
