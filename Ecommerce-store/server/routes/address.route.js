import express from 'express';
import User from '../models/User.model.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

// GET /api/address - Get user addresses
router.get('/', protectRoute, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('addresses defaultAddressId');
        res.status(200).json({
            success: true,
            addresses: user.addresses,
            defaultAddressId: user.defaultAddressId
        });
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch addresses'
        });
    }
});

// POST /api/address - Add new address
router.post('/', protectRoute, async (req, res) => {
    try {
        const { street, city, state, postalCode, country, landmark, addressType, isDefault } = req.body;

        // Validation
        if (!street || !city || !state || !postalCode) {
            return res.status(400).json({
                success: false,
                message: 'Street, city, state, and postal code are required'
            });
        }

        // PIN code validation
        if (!/^\d{6}$/.test(postalCode)) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid 6-digit PIN code'
            });
        }

        const user = await User.findById(req.user._id);

        // If this is the first address or marked as default
        const shouldBeDefault = isDefault || user.addresses.length === 0;

        // If setting as default, remove default from other addresses
        if (shouldBeDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }

        // Create new address
        const newAddress = {
            street: street.trim(),
            city: city.trim(),
            state: state.trim(),
            postalCode: postalCode.trim(),
            country: country || 'India',
            landmark: landmark?.trim(),
            addressType: addressType || 'home',
            isDefault: shouldBeDefault
        };

        user.addresses.push(newAddress);

        // Set default address ID if this is default
        if (shouldBeDefault) {
            user.defaultAddressId = user.addresses[user.addresses.length - 1]._id;
        }

        await user.save();

        res.status(201).json({
            success: true,
            message: 'Address added successfully',
            address: newAddress
        });
    } catch (error) {
        console.error('Error adding address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add address'
        });
    }
});

// PUT /api/address/:id - Update address
router.put('/:id', protectRoute, async (req, res) => {
    try {
        const { street, city, state, postalCode, country, landmark, addressType, isDefault } = req.body;
        const addressId = req.params.id;

        const user = await User.findById(req.user._id);
        const address = user.addresses.id(addressId);

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Update fields
        if (street) address.street = street.trim();
        if (city) address.city = city.trim();
        if (state) address.state = state.trim();
        if (postalCode) {
            if (!/^\d{6}$/.test(postalCode)) {
                return res.status(400).json({
                    success: false,
                    message: 'Please enter a valid 6-digit PIN code'
                });
            }
            address.postalCode = postalCode.trim();
        }
        if (country) address.country = country;
        if (landmark) address.landmark = landmark.trim();
        if (addressType) address.addressType = addressType;

        // Handle default setting
        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
            address.isDefault = true;
            user.defaultAddressId = addressId;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Address updated successfully',
            address
        });
    } catch (error) {
        console.error('Error updating address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update address'
        });
    }
});

// DELETE /api/address/:id - Delete address
router.delete('/:id', protectRoute, async (req, res) => {
    try {
        const addressId = req.params.id;
        const user = await User.findById(req.user._id);

        const address = user.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        const wasDefault = address.isDefault;

        // Remove address
        user.addresses.pull(addressId);

        // If deleted address was default, set first remaining as default
        if (wasDefault && user.addresses.length > 0) {
            user.addresses[0].isDefault = true;
            user.defaultAddressId = user.addresses[0]._id;
        } else if (user.addresses.length === 0) {
            user.defaultAddressId = undefined;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Address deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete address'
        });
    }
});

// PUT /api/address/set-default/:id - Set address as default
router.put('/set-default/:id', protectRoute, async (req, res) => {
    try {
        const addressId = req.params.id;
        const user = await User.findById(req.user._id);

        const address = user.addresses.id(addressId);
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            });
        }

        // Remove default from all addresses
        user.addresses.forEach(addr => addr.isDefault = false);

        // Set this as default
        address.isDefault = true;
        user.defaultAddressId = addressId;

        await user.save();

        res.status(200).json({
            success: true,
            message: 'Default address updated',
            address
        });
    } catch (error) {
        console.error('Error setting default address:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to set default address'
        });
    }
});

export default router;
