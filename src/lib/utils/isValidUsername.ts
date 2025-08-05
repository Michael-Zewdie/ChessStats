/**
 * Validates if a Chess.com username exists by making an API call
 * @param username - The username to validate
 * @returns Promise<boolean> - true if username exists, false otherwise
 */
export async function isValidUsername(username: string): Promise<boolean> {
  if (!username || username.trim().length === 0) {
    return false;
  }

  try {
    const res = await fetch(`https://api.chess.com/pub/player/${username.trim().toLowerCase()}`);
    
    // If response is ok (status 200), user exists
    if (res.ok) {
      return true;
    }
    
    // If it's a 404, user doesn't exist
    if (res.status === 404) {
      return false;
    }
    
    // For other errors (network issues, etc.), assume invalid
    return false;
  } catch (error) {
    console.error('Error validating username:', error);
    return false;
  }
}