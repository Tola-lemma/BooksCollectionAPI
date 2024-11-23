const db = require('../Database/connection');

exports.AddtoFavoriteList = async (req, res) => {
      const { id } = req.params;
    
      try {
        // Check if the book exists
        const bookCheckQuery = 'SELECT * FROM books WHERE id = $1';
        const bookCheckResult = await db.query(bookCheckQuery, [id]);
    
        if (bookCheckResult.rows.length === 0) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        const book = bookCheckResult.rows[0];
        if (book.favorite) {
          return res.status(400).json({ message: 'Book is already marked as favorite.' });
        }
    
        // Update the favorite status to true
        const updateQuery = 'UPDATE books SET favorite = true WHERE id = $1 RETURNING *';
        const updateResult = await db.query(updateQuery, [id]);
        const newUpdatedBook = updateResult.rows[0];
   
        if (newUpdatedBook.cover_img) {
          const fileName = `cover_${newUpdatedBook.id}.jpg`; 
          newUpdatedBook.cover_img = { fileName };  
        } else {
          newUpdatedBook.cover_img = null;
        }
        res.status(200).json({ message: 'Book marked as favorite.', book: newUpdatedBook });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error while updating favorite status.' });
      }
    }