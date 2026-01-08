import Stripe from "stripe";
import Course from "../model/Course.js";
import User from "../model/User.js";
import Purchase from "../model/purchase.js";


export const getUserData=async(req,res)=>{
    try {
        const userId=req.auth().userId;
        const users=await User.findById(userId)   
        if(!users){
           return res.status(404).json({success:false, message:"User not found"});
        }
      return res.status(200).json({success:true, users});
    } 
    catch (error) {
        return res.status(500).json({success:false, message:error.message});
    }
}

//Users Enrolled Courses with lecture Links
export const userEnrolledCourses=async(req,res)=>{
    try {
        const userId=req.auth().userId;
        const userData=await User.findById(userId).populate('enrolledCourses');
        return res.json({success:true, enrolledCourses:userData.enrolledCourses});
    } catch (error) {
        return res.json({success:false, message:error.message});
    }
}

export const PurchaseCourse=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const {origin}=req.headers;
        const userId=req.auth().userId;
        const userData=await User.findById(userId);
        const courseData=await Course.findById(courseId); 
        if(!userData || !courseData){
            return res.json({success:false,message:'Data Not Found'});
        }

        const purchaseData={
          courseId:courseData._id,
          userId,
          amount:(courseData.coursePrice-courseData.discount * courseData.coursePrice/100).toFixed(2)
        }
        const newPurchases=await Purchase.create(purchaseData)
        const StripeInstance=new Stripe(process.env.STRIPE_SECRET_KEY);
        const currency=process.env.CURRENCY.toLowerCase();

        const line_item=[{
            price_data:{
                currency:currency,
                product_data:{
                    name:courseData.courseTitle,
                },
                unit_amount:Math.floor(newPurchases.amount)*100,
            },
            quantity:1,
        }]

        const session=await StripeInstance.checkout.sessions.create({
            success_url:`${origin}/loading/my-enrollments`,
            cancel_url:`${origin}/`,
            line_items:line_item,
            mode:'payment',
            metadata:{
                purchaseId:newPurchases._id.toString()
            }
        })
        
    res.json({success:true, session_url:session.url});

    } catch (error) {
        res.json({success:false, message:error.message});

    }
}