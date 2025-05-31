import Subscription from "../models/subscription.model.js";

export const createSubs = async (req, res, next) =>{
   try {
      const subs = await Subscription.create({
         ... req.body,
         user: req.user._id,
      });

      res.status(201).json({
         success: true,
         message: 'Subscription Created',
         data: subs,
      });

   } catch (error) {
      next(error);
   }
}