const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Tenant, User } = require('../models');

const addUser = async (req, res) => {
  const { name, email, password, tenantId } = req.body;

  try {
    const tenant = await Tenant.findByPk(tenantId);
    if (!tenant) return res.status(404).json({ message: 'Tenant not found' });

    const existingUser = await User.findOne({ where: { email, tenantId } });
    if (existingUser)
      return res
        .status(400)
        .json({ message: 'User already exists for this tenant' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      tenantId,
    });

    return res
      .status(201)
      .json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({
      where: { email },
      include: ['roles', 'permissions', 'tenant'],
    });

    console.log(existingUser);
    if (!existingUser)
      return res.status(404).json({ message: 'User not found for the email' });

    const isPasswordMatch = bcrypt.compare(password, existingUser.password);
    if (!isPasswordMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const payload = {
      id: existingUser.id,
      tenantId: existingUser.tenantId,
      role: existingUser.roles.map((r) => r.name),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.status(200).json({
      message: 'Login successfull',
      token,
      user: { id: existingUser.id, name: existingUser.name, email },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error });
  }
};

module.exports = {
  addUser,
  login,
};
