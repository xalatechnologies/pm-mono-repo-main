import crypto from 'crypto';

import { DefaultAuthProvider } from 'adminjs';

import { componentLoader } from './component-loader.js';
import { DEFAULT_ADMIN, AUTH_CONFIG } from './constants.js';

// Simple in-memory rate limiting for login attempts
const loginAttempts: Map<string, { count: number; lastAttempt: number; lockedUntil?: number }> = new Map();

/**
 * Timing-safe string comparison to prevent timing attacks
 */
function secureCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    // Still do the comparison to maintain constant time
    crypto.timingSafeEqual(Buffer.from(a), Buffer.from(a));
    return false;
  }
  return crypto.timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

/**
 * Check if the IP/email is currently locked out
 */
function isLockedOut(identifier: string): boolean {
  const attempts = loginAttempts.get(identifier);
  if (!attempts) return false;

  if (attempts.lockedUntil && Date.now() < attempts.lockedUntil) {
    return true;
  }

  // Reset if lockout has expired
  if (attempts.lockedUntil && Date.now() >= attempts.lockedUntil) {
    loginAttempts.delete(identifier);
    return false;
  }

  return false;
}

/**
 * Record a failed login attempt
 */
function recordFailedAttempt(identifier: string): void {
  const attempts = loginAttempts.get(identifier) || { count: 0, lastAttempt: 0 };
  attempts.count += 1;
  attempts.lastAttempt = Date.now();

  if (attempts.count >= AUTH_CONFIG.maxLoginAttempts) {
    attempts.lockedUntil = Date.now() + AUTH_CONFIG.lockoutDuration;
    // eslint-disable-next-line no-console
    console.warn(`[Auth] Account locked for ${identifier} due to too many failed attempts`);
  }

  loginAttempts.set(identifier, attempts);
}

/**
 * Clear login attempts on successful login
 */
function clearAttempts(identifier: string): void {
  loginAttempts.delete(identifier);
}

/**
 * Validate password against stored hash or plain text (development only)
 */
async function validatePassword(inputPassword: string, storedPassword: string): Promise<boolean> {
  // Check if stored password is a bcrypt hash (starts with $2)
  if (storedPassword.startsWith('$2')) {
    // Use dynamic import for bcrypt to avoid issues if not installed
    try {
      const bcrypt = await import('bcrypt');
      return bcrypt.compare(inputPassword, storedPassword);
    } catch {
      // eslint-disable-next-line no-console
      console.error('[Auth] bcrypt not available. Install it with: npm install bcrypt');
      // Fall back to timing-safe plain comparison in development
      if (process.env.NODE_ENV !== 'production') {
        // eslint-disable-next-line no-console
        console.warn('[Auth] Using plain text password comparison (development only)');
        return secureCompare(inputPassword, storedPassword);
      }
      return false;
    }
  }

  // Plain text comparison (development only - NOT recommended for production)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.warn('[Auth] Using plain text password comparison (development only)');
    return secureCompare(inputPassword, storedPassword);
  }

  // eslint-disable-next-line no-console
  console.error('[Auth] Plain text passwords are not allowed in production');
  return false;
}

/**
 * AdminJS Authentication Provider with proper security measures
 */
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate: async ({ email, password }) => {
    // Check for lockout
    if (isLockedOut(email)) {
      // eslint-disable-next-line no-console
      console.warn(`[Auth] Login attempt blocked - account locked: ${email}`);
      return null;
    }

    // Validate email
    const emailMatch = secureCompare(email.toLowerCase(), DEFAULT_ADMIN.email.toLowerCase());
    if (!emailMatch) {
      recordFailedAttempt(email);
      // eslint-disable-next-line no-console
      console.warn(`[Auth] Failed login attempt - invalid email: ${email}`);
      return null;
    }

    // Validate password
    const passwordValid = await validatePassword(password, DEFAULT_ADMIN.passwordHash);
    if (!passwordValid) {
      recordFailedAttempt(email);
      // eslint-disable-next-line no-console
      console.warn(`[Auth] Failed login attempt - invalid password for: ${email}`);
      return null;
    }

    // Successful authentication
    clearAttempts(email);
    // eslint-disable-next-line no-console
    console.info(`[Auth] Successful login: ${email}`);

    return {
      email,
      title: 'Administrator',
    };
  },
});

export default provider;
