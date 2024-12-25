const express = require('express');
const router = express.Router();
const PersonalInfo = require('../models/PersonalInfo');

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonalInfo:
 *       type: object
 *       required:
 *         - userId
 *         - fullName
 *         - email
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the personal info
 *         userId:
 *           type: string
 *           description: The ID of the user
 *         fullName:
 *           type: string
 *           description: Full name of the user
 *         email:
 *           type: string
 *           description: Email address of the user
 *         address:
 *           type: string
 *           description: Address of the user
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the user
 *         dateOfBirth:
 *           type: string
 *           format: date
 *           description: Date of birth of the user
 *       example:
 *         userId: 63f88eae8b7a4a9d2c91f3f2
 *         fullName: John Doe
 *         email: john.doe@example.com
 *         address: 123 Elm Street
 *         phoneNumber: 1234567890
 *         dateOfBirth: 1990-01-01
 */

/**
 * @swagger
 * tags:
 *   name: PersonalInfo
 *   description: API for managing user personal information
 */

// CREATE personal info
/**
 * @swagger
 * /api/personal-info:
 *   post:
 *     summary: Create personal information for a user
 *     tags: [PersonalInfo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalInfo'
 *     responses:
 *       201:
 *         description: Personal info created successfully
 *       500:
 *         description: Server error
 */
router.post('/', async (req, res) => {
  try {
    const personalInfo = new PersonalInfo(req.body);
    const savedInfo = await personalInfo.save();
    res.status(201).json(savedInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error creating personal info' });
  }
});

// READ all personal info
/**
 * @swagger
 * /api/personal-info:
 *   get:
 *     summary: Get all personal information
 *     tags: [PersonalInfo]
 *     responses:
 *       200:
 *         description: List of all personal information
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const info = await PersonalInfo.find().populate('userId', 'username');
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching personal information' });
  }
});

// READ personal info by ID
/**
 * @swagger
 * /api/personal-info/{id}:
 *   get:
 *     summary: Get personal information by ID
 *     tags: [PersonalInfo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PersonalInfo ID
 *     responses:
 *       200:
 *         description: Personal info found
 *       404:
 *         description: Personal info not found
 *       500:
 *         description: Server error
 */
router.get('/:id', async (req, res) => {
  try {
    const info = await PersonalInfo.findById(req.params.id).populate('userId', 'username');
    if (!info) return res.status(404).json({ error: 'Personal info not found' });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching personal information' });
  }
});

// UPDATE personal info
/**
 * @swagger
 * /api/personal-info/{id}:
 *   put:
 *     summary: Update personal information
 *     tags: [PersonalInfo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PersonalInfo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonalInfo'
 *     responses:
 *       200:
 *         description: Personal info updated successfully
 *       404:
 *         description: Personal info not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
  try {
    const updatedInfo = await PersonalInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInfo) return res.status(404).json({ error: 'Personal info not found' });
    res.status(200).json(updatedInfo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating personal information' });
  }
});

// DELETE personal info
/**
 * @swagger
 * /api/personal-info/{id}:
 *   delete:
 *     summary: Delete personal information
 *     tags: [PersonalInfo]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: PersonalInfo ID
 *     responses:
 *       200:
 *         description: Personal info deleted successfully
 *       404:
 *         description: Personal info not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', async (req, res) => {
  try {
    const deletedInfo = await PersonalInfo.findByIdAndDelete(req.params.id);
    if (!deletedInfo) return res.status(404).json({ error: 'Personal info not found' });
    res.status(200).json({ message: 'Personal info deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting personal information' });
  }
});

module.exports = router;
