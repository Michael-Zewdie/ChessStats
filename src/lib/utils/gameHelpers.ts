export function determineResult(
  userColor: 'white' | 'black',
  whiteResult?: string,
  blackResult?: string
): 'win' | 'loss' | 'draw' {
  if (!whiteResult || !blackResult) return 'draw';
  
  if (whiteResult === blackResult) return 'draw';
  
  if (userColor === 'white') {
    return whiteResult === 'win' ? 'win' : 'loss';
  } else {
    return blackResult === 'win' ? 'win' : 'loss';
  }
}