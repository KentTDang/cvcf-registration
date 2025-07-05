import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
}

export const InputField = ({
  label,
  type,
  name,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input type={type} name={name} placeholder={placeholder} />
    </div>
  );
};
