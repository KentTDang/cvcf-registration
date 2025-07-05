import { Button } from "@/components/ui/button";

export const Home = () => {
  return (
    <>
      <div>Home</div>
      <form
        action="http://localhost:4242/create-checkout-session"
        method="POST"
      >
        {/* Personal Info */}
        <input
          name="firstName"
          type="text"
          placeholder="Enter your first name"
        />
        <input name="lastName" type="text" placeholder="Enter your last name" />
        <input name="email" type="text" placeholder="Enter your email" />
        <input
          name="phoneNumber"
          type="text"
          placeholder="Enter your phone number"
        />
        <input
          name="shirtSize"
          type="text"
          placeholder="Enter your T-Shirt Size"
        />
        <input name="gender" type="text" placeholder="Enter your gender" />

        {/* Church Contact */}
        <input type="text" name="church" placeholder="Enter your church" />
        {/* TODO: this option should only show if the above is set to other */}
        <input type="text" name="otherChurch" placeholder="you" />
        <input
          type="text"
          name="churchPOC"
          placeholder="Enter your church point of ocontact name"
        />
        <input
          type="text"
          name="churchPOCNumber"
          placeholder="Enter your church point of contact number"
        />
        <input
          type="text"
          name="churchState"
          placeholder="Enter your church state"
        />

        {/* Emergency Contact */}
        <input
          type="text"
          name="emergencyContactFirstName"
          placeholder="Emergency contact first name"
        />
        <input
          type="text"
          name="emergencyContactLastName"
          placeholder="Emergency contact last name"
        />
        <input
          type="text"
          name="emergencyContactEmail"
          placeholder="Emergency contact email"
        />
        <input
          type="text"
          name="emergencyContactNumber"
          placeholder="Emergency contact phone number"
        />
        <input
          type="text"
          name="emergencyContactRelationship"
          placeholder="Emegency contact relationship"
        />

        {/* CVCF Info */}
        <input
          type="text"
          name="daysAttending"
          placeholder="Select your days attending"
        />

        {/* Medical Concerns */}
        <input
          type="text"
          name="medicalConcerns"
          placeholder="Do you have any medical concerns yes or no"
        />

        {/* Additional Concerns */}
        <input
          type="text"
          name="additionalConcerns"
          placeholder="Enter additional concerns"
        />

        <Button type="submit">Checkout</Button>
      </form>
    </>
  );
};

export default Home;
