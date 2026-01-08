import { createContext, useEffect, useState } from "react";
import App from "../App";
import { dummyCourses } from "../assets/assets/assets";
import humanizeDuration from "humanize-duration";
import { useAuth,useUser } from "@clerk/clerk-react";

export const AppContext = createContext();
const currency=import.meta.env.VITE_CURRENCY;

export const AppProvider = ({ children }) => {


    const [allcourses,setAllcourses]=useState([]);
    const [educator,setEducator]=useState(true);
    const [loading,setLoading]=useState(true);
    const [enrolledCourses,setEnrolledCourses]=useState([]);

const FetchAllCourses=async()=>{
    try {
        setLoading(true);
        setAllcourses(dummyCourses)
    } catch (error) {
        console.log("Error fetching courses:",error);
    } finally {
        setLoading(false);
    }
}

const courseRatting=(course)=>{
if(course.courseRatings.length===0)return 0;
let totalRatting=0;
course.courseRatings.forEach((rating)=>{
    totalRatting+=rating.rating;
})
return (totalRatting/course.courseRatings.length);

}

const ChapterTimeCalculation=(chapter)=>{
    let totalTime=0;
    chapter.map((lecture)=>{
        totalTime+=lecture.lectureDuration
    })
    return humanizeDuration(totalTime*60*1000,{round:true,units:['h','m']});
}

const TotalTimeDuration=(course)=>{
    let courseTotalTime=0;
    course.courseContent.map(chapter=>(chapter.chapterContent.map((Lecture)=>{Lecture.lectureDuration
        courseTotalTime+=Lecture.lectureDuration;
    })))

    return humanizeDuration(courseTotalTime*60*1000,{round:true,units:['h','m']});
}

const TotalLectures=(course)=>{
    let totalLectures=0;
    course.courseContent.forEach((chapter)=>{
        if(Array.isArray(chapter.chapterContent)){
            totalLectures+=chapter.chapterContent.length;
        }
    })
    return totalLectures
}

const fetchEnrolledCourses=async()=>{
    try {
        setLoading(true);
        setEnrolledCourses(dummyCourses);
    } catch (error) {
        console.log("Error fetching enrolled courses:",error);
    }
    finally {
        setLoading(false);
    }
}

useEffect(()=>{
    FetchAllCourses();
    fetchEnrolledCourses();
},[])

const {getToken}=useAuth();
const {user}=useUser();


const logToken=async()=>{
console.log(await getToken());
}

useEffect(()=>{
    if(user){
      logToken();
    }
},[user])

const value = {

    currency,
    allcourses,
    courseRatting,
    educator,
    setEducator,
    ChapterTimeCalculation,
    TotalTimeDuration,
    TotalLectures,
    loading,
    enrolledCourses,
    fetchEnrolledCourses,


   
};

    return(
        <AppContext.Provider value={value}>
        {children}
        </AppContext.Provider>
    )
  }