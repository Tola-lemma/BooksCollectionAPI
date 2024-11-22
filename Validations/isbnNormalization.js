const normalizeIsbn = (isbn) => {
      // Check if the length of the original string (with hyphens) is greater than 13
      if (isbn.length > 13) {
        return isbn.replace(/-/g, ''); // Remove hyphens if length > 13
      }
    
      return isbn; // Return as is if length <= 13
    };
    module.exports  = {normalizeIsbn}