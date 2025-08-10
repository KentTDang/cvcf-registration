import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  required?: boolean;
}

export const InputField = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required = false,
}: InputFieldProps) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor={name}>{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};
