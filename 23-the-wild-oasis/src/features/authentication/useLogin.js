import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { isLoading, mutate: login } = useMutation({
    mutationFn: loginApi,
    onSuccess: (user) => {
      navigate("/");
      console.log(user);
    },
    onError: (e) => {
      toast.error("Provided wrong login crendential");
    },
  });

  return { isLoading, login };
}
