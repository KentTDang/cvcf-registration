import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
}

export const TextArea = ({ label, name, placeholder }: TextAreaProps) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Textarea name={name} placeholder={placeholder} />
    </div>
  );
};
