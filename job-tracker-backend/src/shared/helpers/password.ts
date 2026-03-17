import bcrypt from "bcrypt";

// Hash the password using bcrypt and return the hashed password
export const hashPassword = async (password: string) => {
  const SALT_ROUNDS = 12;

  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// Compare the provided password with the hashed password
// and return true if they match, false otherwise
export const comparePassword = async (password: string, hashed: string) => {
  return bcrypt.compare(password, hashed);
};
