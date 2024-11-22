const validateIsbn = (isbn) => {
  // Remove dashes for uniformity
  const cleanIsbn = isbn.replace(/-/g, '');

  // Validate ISBN-10
  if (/^\d{9}[0-9X]$/.test(cleanIsbn)) {
    const sum = cleanIsbn
      .split('')
      .slice(0, 9)
      .reduce((acc, digit, index) => acc + (index + 1) * parseInt(digit, 10), 0);
    const checksum = sum % 11 === 10 ? 'X' : (sum % 11).toString();
    return checksum === cleanIsbn[9];
  }

  // Validate ISBN-13
  if (/^\d{13}$/.test(cleanIsbn)) {
    const sum = cleanIsbn
      .split('')
      .map((digit, index) => parseInt(digit, 10) * (index % 2 === 0 ? 1 : 3))
      .reduce((acc, value) => acc + value, 0);
    return sum % 10 === 0;
  }

  return false;
};
module.exports = {validateIsbn}