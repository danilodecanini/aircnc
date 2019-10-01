const User = require('../models/User');
const Booking = require('../models/Booking');
const Spot = require('../models/Spot');

module.exports = {

    async store(req, res){
        
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const current_spot = await Spot.findById(spot_id);
        const current_user = await User.findById(user_id);

        if(!current_spot || !current_user){
            return res.status(404).json({
                error: "User or Spot not found"
            });
        }

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });

        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);

    }
}