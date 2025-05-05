const User = require('../models/User');

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
