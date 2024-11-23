const db = require('../Database/connection'); 

exports.bookRecommendation =  async (req, res) => {
  try {
    const query = 'SELECT * FROM books ORDER BY RANDOM() LIMIT 3';
    const result = await db.query(query);

    // If no books are found
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No books found in the collection.' });
    }
    const recommendations = result.rows;
    
    const numberOfBooks = recommendations.length;
    const message = numberOfBooks < 3
      ? `We only have ${numberOfBooks} book(s) available. Here are the recommendations for you:`
      : 'Here are the top three recommended books for you:';
    
    res.status(200).json({
      message: message,
      recommendations: recommendations
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching random books.' });
  }
};