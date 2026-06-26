import jwt from "jsonwebtoken";

const loginAdmin = async (password: string) => {
  // .env theke password ta niye asha hocche
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; 

  if (!ADMIN_PASSWORD) {
    throw new Error("Admin password is not defined in environment variables");
  }

  if (password !== ADMIN_PASSWORD) {
    throw new Error("Invalid admin password");
  }

  // JWT Secret-o .env theke asbe
  const token = jwt.sign(
    { role: "admin" }, 
    process.env.JWT_SECRET || "fallback_secret_do_not_use_in_production", 
    { expiresIn: "1d" }
  );

  return { token };
};

export const AuthService = { loginAdmin };