import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputField } from "@/components/InputField/index";
import { SelectField } from "@/components/SelectField";
import { TextArea } from "@/components/TextArea";
import { shirtSizes, genders } from "@/constants";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  daysAttending: string;
}

export const Home = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    daysAttending: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormValues((formValue) => ({ ...formValue, [name]: value }));
  };

  const isFormValid: boolean =
    formValues.firstName.trim() !== "" &&
    formValues.lastName.trim() !== "" &&
    formValues.email.trim() !== "" &&
    formValues.phoneNumber.trim() !== "" &&
    formValues.daysAttending.trim() !== "";

  return (
    <form action="http://localhost:4242/create-checkout-session" method="POST">
      {/* Personal Info */}
      <InputField
        label="First Name"
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formValues.firstName}
        onChange={handleChange}
        required={true}
      />
      <InputField
        label="Last Name"
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formValues.lastName}
        onChange={handleChange}
        required={true}
      />
      <InputField
        label="Email"
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleChange}
        required={true}
      />

      <InputField
        label="Phone Number"
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formValues.phoneNumber}
        onChange={handleChange}
        required={true}
      />

      <SelectField
        placeholder="Select a T-Shirt Size"
        label="T-Shirt Size"
        selectItems={shirtSizes}
      />
      <SelectField
        placeholder="Select a Gender"
        label="Genders"
        selectItems={genders}
      />

      {/* CVCF Info */}
      <InputField
        label="Days Attending"
        type="text"
        name="daysAttending"
        placeholder="Select your days attending"
        value={formValues.daysAttending}
        onChange={handleChange}
        required={true}
      />

      {/* Medical Concerns */}
      <TextArea
        label="Medical Concerns"
        name="medicalConerns"
        placeholder="Enter any medical conerns"
      />

      {/* Additional Concerns */}
      <TextArea
        label="Additional Concerns"
        name="additionalConcerns"
        placeholder="Enter any additional conerns"
      />

      <Button type="submit" disabled={!isFormValid}>
        Checkout
      </Button>
    </form>
  );
};

export default Home;
