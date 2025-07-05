import { Button } from "@/components/ui/button";
import { InputField } from "@/components/InputField";

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
      <InputField
        label="Gender"
        name="gender"
        type="text"
        placeholder="Gender"
      />

      {/* Church Contact */}
      <InputField
        label="Church Name"
        type="text"
        name="church"
        placeholder="Church Name"
      />
      {/* TODO: this option should only show if the above is set to other */}
      <InputField
        label="Other Church Name"
        type="text"
        name="otherChurch"
        placeholder="Other Church Name"
      />
      <InputField
        label="Church Point of Contact"
        type="text"
        name="churchPOC"
        placeholder="Church Point of Contact"
      />
      <InputField
        label="Church Point of Contact Number"
        type="text"
        name="churchPOCNumber"
        placeholder="Church Point of Contact Number"
      />
      <InputField
        label="Church State"
        type="text"
        name="churchState"
        placeholder="Church State"
      />

      {/* Emergency Contact */}
      <InputField
        label="Emergency Contact First Name"
        type="text"
        name="emergencyContactFirstName"
        placeholder="Emergency contact first name"
      />
      <InputField
        label="Emergency Contact Last Name"
        type="text"
        name="emergencyContactLastName"
        placeholder="Emergency contact last name"
      />
      <InputField
        label="Emergency Contact Email"
        type="text"
        name="emergencyContactEmail"
        placeholder="Emergency contact email"
      />
      <InputField
        label="Emergency Contact Number"
        type="text"
        name="emergencyContactNumber"
        placeholder="Emergency contact phone number"
      />
      <InputField
        label="Emergency Contact Relationship"
        type="text"
        name="emergencyContactRelationship"
        placeholder="Emegency contact relationship"
      />

      {/* CVCF Info */}
      <InputField
        label="Days Attending"
        type="text"
        name="daysAttending"
        placeholder="Select your days attending"
      />

      {/* Medical Concerns */}
      <InputField
        label="Medical Concerns"
        type="text"
        name="medicalConcerns"
        placeholder="Do you have any medical concerns yes or no"
      />

      {/* Additional Concerns */}
      <InputField
        label="Additional Concerns"
        type="text"
        name="additionalConcerns"
        placeholder="Enter additional concerns"
      />

      <Button type="submit">Checkout</Button>
    </form>
  );
};

export default Home;
