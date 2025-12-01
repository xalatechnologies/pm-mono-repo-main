// Admin credentials from environment variables with fallback for development
// IMPORTANT: Always set ADMIN_EMAIL and ADMIN_PASSWORD_HASH in production!
export const DEFAULT_ADMIN = {
  email: process.env.ADMIN_EMAIL || 'admin@example.com',
  // In production, use a bcrypt hash. For development fallback, this is a plain password.
  // Generate hash with: npx bcrypt-cli hash "your-password"
  passwordHash: process.env.ADMIN_PASSWORD_HASH || '$2b$10$development.placeholder.hash',
};

// Configuration
export const AUTH_CONFIG = {
  // Whether to use secure password hashing (should be true in production)
  useSecureAuth: process.env.NODE_ENV === 'production',
  // Session timeout in milliseconds (default: 24 hours)
  sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '86400000', 10),
  // Maximum login attempts before temporary lockout
  maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5', 10),
  // Lockout duration in milliseconds (default: 15 minutes)
  lockoutDuration: parseInt(process.env.LOCKOUT_DURATION || '900000', 10),
};
