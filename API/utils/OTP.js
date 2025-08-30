export const sendOTP = async (phoneNumber, otp) => {
  try {
    console.log(`OTP for ${phoneNumber} is ${otp}`);
    return true;
  } catch (error) {
    console.error(`Error sending otp`, error);
    return false;
  }
};
