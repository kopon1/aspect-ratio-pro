const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());
app.use(express.static('public'));

// Newsletter subscription endpoint
app.post('/api/subscribe', (req, res) => {
    const { email } = req.body;
    
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    db.run('INSERT INTO newsletter_subscribers (email) VALUES (?)', [email], function(err) {
        if (err) {
            if (err.message.includes('UNIQUE constraint failed')) {
                return res.status(400).json({ error: 'Email already subscribed' });
            }
            return res.status(500).json({ error: 'Server error' });
        }
        res.json({ message: 'Successfully subscribed!' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 