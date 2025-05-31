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

export const getSubs = async (req, res, next) =>{
   try {

      if(req.params.id !== req.user.id){
         const error = new Error('Not a owner');
         error.statusCode = 401;
         throw error;
      }

      const subs = await Subscription.find({ user: req.params.id });

      res.status(200).json({
         success: true,
         message: 'Subscription Found',
         data: subs,
      });

   } catch (error) {
      next(error);
   }
}

export const deleteSubs =async(req, res, next) =>{
   try {

      const subs = await Subscription.findById(req.params.id);

      if(!subs){
         const error = new Error('Subscription not found');
         error.statusCode = 404;
         throw error;
      }

      await subs.deleteOne();

      res.status(200).json({
         success: true,
         message: 'Subscription Deleted',
      });

   } catch (error) {
      next(error);
   }
}

export const updateSubs = async(req, res, next) =>{
   try {

      const subs = await Subscription.findById(req.params.id);

      if(!subs){
         let error =  new Error("Subscription not found");
         error.statusCode = 404;
         throw error;
      };
      
      subs.set(req.body);

      await subs.save();

      res.status(200).json({
         success: true,
         message: 'Subscription Updated',
         data: subs,
      });
      

   } catch (error) {
      next(error);
   }
}