const express = require('express');
const router = express.Router();

// Newsletter subscription endpoint
router.post('/newsletter/subscribe', 
    [
        body('email').isEmail().normalizeEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email } = req.body;
            const success = await newsletter.addSubscriber(email);
            
            if (success) {
                res.json({ message: 'Successfully subscribed to newsletter' });
            } else {
                res.json({ message: 'Already subscribed to newsletter' });
            }
        } catch (error) {
            console.error('Subscription error:', error);
            res.status(500).json({ error: 'Failed to subscribe to newsletter' });
        }
    }
);

// Newsletter unsubscribe endpoint
router.post('/newsletter/unsubscribe',
    [
        body('email').isEmail().normalizeEmail()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email } = req.body;
            const success = await newsletter.unsubscribe(email);
            
            if (success) {
                res.json({ message: 'Successfully unsubscribed from newsletter' });
            } else {
                res.json({ message: 'Email not found in newsletter subscriptions' });
            }
        } catch (error) {
            console.error('Unsubscribe error:', error);
            res.status(500).json({ error: 'Failed to unsubscribe from newsletter' });
        }
    }
);

module.exports = router; 