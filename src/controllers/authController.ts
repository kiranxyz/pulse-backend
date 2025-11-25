// src/controllers/authController.ts
import { RequestHandler } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "#auth/auth.ts";
import { registerSchema, loginSchema } from "#schemas/authSchemas.ts";
import { UserProfile } from "#models/userProfile.ts";

/**
 * Register a new user
 */
export const register: RequestHandler = async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      details: parsed.error.format(),
    });
  }

  const { email, password, username, title, address, role } = parsed.data;

  try {
    // 1️⃣ Create the user
    const authUser = await auth.api.signUpEmail({
      body: { name: username, email, password },
      headers: fromNodeHeaders(req.headers),
    });

    // 2️⃣ Create user profile
    const profile = await UserProfile.create({
      authId: authUser.user.id,
      username,
      email,
      title,
      address,
      role: role || "participant",
    });

    const result = await auth.api.signInEmail({
      body: { email, password },
      headers: fromNodeHeaders(req.headers),
    });

    console.log("Login result:", result); // check what's returned

    if (!result?.user) {
      // If user is null, login did not succeed
      return res.status(401).json({ error: "Login failed" });
    }

    // Fetch session to confirm cookie/session is set
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    console.log("Session after login:", session);

    return res.status(201).json({
      message: "Registration and login successful",
      user: session?.user,
      session: session?.session,
      profile,
    });
  } catch (err: any) {
    console.error("Register error:", err);

    if (err.body?.code === "EMAIL_ALREADY_EXISTS") {
      return res.status(409).json({ error: "Email already exists" });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};
/**
 * Login user
 */
export const login: RequestHandler = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid input",
      details: parsed.error.format(),
    });
  }

  const { email, password } = parsed.data;

  try {
    // Sign in user
    await auth.api.signInEmail({
      body: { email, password },
      headers: fromNodeHeaders(req.headers),
    });

    // Fetch session after login
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      return res.status(401).json({ error: "Login failed: session not found" });
    }

    console.log("User logged in:", session.user);

    return res.status(200).json({
      message: "Login successful",
      user: session.user,
      session: session.session,
    });
  } catch (err: any) {
    console.error("Login error:", err);

    return res.status(401).json({
      error: "Invalid email or password",
      details: err?.body ?? null,
    });
  }
};

/**
 * Logout user
 */
export const logout: RequestHandler = async (req, res) => {
  try {
    await auth.api.signOut({ headers: fromNodeHeaders(req.headers) });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ error: "Failed to logout" });
  }
};

/**
 * Get current session
 */
export const getSession: RequestHandler = async (req, res) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    return res.status(200).json({
      message: session?.user ? "Session fetched" : "No active session",
      user: session?.user ?? null,
      session: session?.session ?? null,
    });
  } catch (err) {
    console.error("Get session error:", err);
    return res.status(500).json({ error: "Failed to fetch session" });
  }
};
