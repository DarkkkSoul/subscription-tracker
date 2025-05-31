import mongoose from "mongoose";

const subsSchema = new mongoose.Schema({
   name: {
      required: true,
      type: String,
      trim: true,
      minLength: 2,
   },
   price: {
      required: true,
      type: Number,
   },
   currency: {
      type: String,
      required: true,
      enum: ['USD', 'INR'],
      default: 'USD',
   },
   frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
   },
   category: {
      type: String,
      enum: ['sports', 'news', 'entertainment', 'technology'],
      required: true,
   },
   paymentMethod: {
      type: String,
      required: true,
   },
   status: {
      type: String,
      enum: ['Active', 'Cancelled', 'Expired'],
   },
   startDate: {
      type: Date,
      default: Date.now(),
      validate: {
         validator: (value) => value <= new Date(),
         messgae: 'Start date must be in the past'
      }
   },
   renewalDate: {
      type: Date,
      validate: {
         validator: function (value) { return value > this.startDate },
         messgae: 'Start date must be after start date'
      }
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
   }
}, { timestamps: true });



// auto calculate renewal date
subsSchema.pre('save', function (next) {
   const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
   };

   this.renewalDate = new Date(this.startDate);
   this.renewalDate.setDate(this.startDate.getDate() + renewalPeriods[this.frequency]);

   if (this.renewalDate < new Date()) {
      this.status = 'Expired';
   };

   next();
})


const Subscription = mongoose.model('Subscription', subsSchema);
export default Subscription;