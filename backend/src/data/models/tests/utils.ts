export function mongooseError(error: any): string | boolean {
  if (error) {
    const key = Object.keys(error.errors)[0];
    return error?.errors[key].message;
  }
  return true;
}

export function longString(length: number) {  
  return new Array(length).fill('f').join();
}