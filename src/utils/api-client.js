// src/utils/api-client.js

export const fetchRomanNumeral = async integer => {
    const response = await fetch(`http://localhost:8080/romannumeral?query=${integer}`);
    const data = await response?.json();
  
    if (!response?.ok) {
      throw new Error(data?.error || 'Something went wrong');
    }
  
    return data;
  };
  