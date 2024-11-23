const db = require('../Database/connection');

exports.FavoriteLists = async (req, res) => {
      try {
        const query = `
          SELECT 
            title,
            author,
            isbn,
           published_year,
           genre,
           language,
           publisher, 
           page_count,
           edition,
           description
          FROM books
          WHERE favorite = true;
        `;
    
        const result = await db.query(query);
    
        if (result.rows.length === 0) {
          return res.status(404).json({ message: 'No favorite books found.' });
        }
    
        res.status(200).json({ 'Your Favorite Lists': result.rows });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error while fetching favorite books.' });
      }
    }