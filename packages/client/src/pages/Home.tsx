import { Button } from "@/components/ui/button";
import { InputField } from "@/components/InputField/index";
import { SelectField } from "@/components/SelectField";
import { TextArea } from "@/components/TextArea";
import { shirtSizes, genders } from "@/constants";

export const Home = () => {
  return (
    <form action="http://localhost:4242/create-checkout-session" method="POST">
      {/* Personal Info */}
      <InputField
        label="First Name"
        type="text"
        name="firstName"
        placeholder="First Name"
      />
      <InputField
        label="Last Name"
        type="text"
        name="lastName"
        placeholder="Last Name"
      />
      <InputField label="Email" type="email" name="email" placeholder="Email" />

      <InputField
        label="Phone Number"
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
      />

      <InputField
        label="Shirt Size"
        name="shirtSize"
        type="text"
        placeholder="Shirt Size"
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

      <Button type="submit">Checkout</Button>
    </form>
  );
};

export default Home;
