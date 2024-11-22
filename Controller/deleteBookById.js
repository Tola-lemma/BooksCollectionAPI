const db = require('../Database/connection')
exports.deleteBookById = async (req, res) => {
      const { id } = req.params;
    
      try {
        const bookCheckQuery = 'SELECT * FROM books WHERE id = $1';
        const bookCheckResult = await db.query(bookCheckQuery, [id]);
    
        if (bookCheckResult.rows.length === 0) {
          return res.status(404).json({ message: 'Book not found' });
        }
    
        const deleteQuery = 'DELETE FROM books WHERE id = $1 RETURNING *';
        const result = await db.query(deleteQuery, [id]);
    
        if (result.rows.length === 0) {
          return res.status(500).json({ message: 'Failed to delete the book.' });
        }
        const deletedBook = result.rows[0];
        delete deletedBook.cover_img;  
        res.status(200).json({ message: 'Book deleted successfully', deletedBook });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error while deleting book.' });
      }
    };
    