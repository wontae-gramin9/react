import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BackButton() {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e) => {
        e.preventDefault();
        // Form 내부에 있어도 Form을 submit하지 않는다.
        navigate(-1);
      }}
    >
      &larr; Back
    </Button>
  );
}
