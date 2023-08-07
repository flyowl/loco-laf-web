import Joi from 'joi';
import { NowData } from '@/public'
import cloud from "@lafjs/cloud";
import delault from '@/model';




const video_course = {
  delault,
  "title": Joi.string().required(),
  "num": Joi.number().default(0),
  "course_typed": Joi.number().default(0), //0 视频点播，1 视频直播
  "status": Joi.number().default(0), //0  未发布 1  已发布
  "markdown": Joi.string().allow(null).allow(""),
  "is_class": Joi.boolean().default(false),
  "cover": Joi.string().default(null).allow(null)
}


const video_user = { //课程加入用户
  delault,
  "courseId": Joi.string().default(null).allow(null),  // 课程ID
  "userId": Joi.string().default(null).allow(null),  // 用户ID
}


const video_video = {
  delault,
  "title": Joi.string().required(), //标题
  "play_num": Joi.number().default(0), // 播放时间
  "star": Joi.number().default(0),  // 点赞
  "courseId": Joi.string().default(null).allow(null),  // 课程ID
  "duration": Joi.number().default(0),  // 课程时长(分钟)
  "status": Joi.number().default(0), // 0 未发布，1 已发布
  "url": Joi.string().default(null).allow(null), //播放地址
  "cover_url": Joi.string().default(null).allow(null), //封面地址
  "kid": Joi.string().default(null).allow(null)// 播放唯一ID
}

const video_video_time = {
  delault,
  "study_time": Joi.number().default(0),  // 学习时长
  "videoId": Joi.string().default(null).allow(null),  // 视频ID
  "status": Joi.number().default(0), // 0 未开始 1 学习中 2 已完成
  "userId": Joi.string().default(null).allow(null),  // 用户ID
  
}

const video_learning_time = { // 1分钟加一次
  delault,
  "videoId": Joi.string().default(null).allow(null),  // 视频ID
  "userId": Joi.string().default(null).allow(null),  // 用户ID
}

const video_class = { // 
  delault,
  "title": Joi.string().required(), //标题
  "num": Joi.number().default(0),
  "courseId": Joi.string().default(null).allow(null),  // 课程ID
  "cover": Joi.string().default(null).allow(null)

}

const video_class_user = { //  班级用户
  delault,
  "userId": Joi.string().default(null).allow(null),  // 用户ID
  "parentId": Joi.string().default("-1"), // 上级类型
  "postId": Joi.string().default(null).allow(null),  // 职位
  "classId": Joi.string().default(null).allow(null),  // 班级ID
}
const video_assignment = { // 作业任务
  delault,
  "userId": Joi.string().default(null).allow(null),  // 用户ID
  "classId": Joi.string().default(null).allow(null),  // 班级ID
  // "parentId": Joi.string().default("-1"), // 上级类型
  // "postId": Joi.string().default(null).allow(null),  // 职位
  "fraction": Joi.number().default(0), // 分数
  "taskLog": Joi.array().default([]), // 分数
  timeClassId: Joi.string().default(null).allow(null), //作业对应的ID
}

const video_time_class = { // 作业表 完成的作业
  delault,
  "videoId": Joi.string().default(null).allow(null),  // 视频ID
  "courseId": Joi.string().default(null).allow(null),  // 课程ID
  "classId": Joi.string().default(null).allow(null),  // 班级ID
  "startTime": Joi.date(), // 作业开始时间
  "endTime": Joi.date(),  // 作业结束时间
  "task": Joi.array().default([]), // 学习数据
}




const video_comments = { // 评论组件
  delault,
  "content": Joi.string().required(),
  "parentId": Joi.string().default("-1"),
  "star": Joi.string().default(0),
  "userId": Joi.string().default(null).allow(null),  // 用户ID
  "nickname": Joi.string().default(null).allow(null), //用户名称
  "courseId": Joi.string().default(null).allow(null),  // 课程ID
  "starUserList": Joi.array()  // 用户点赞_id
    .items(Joi.object()).default([]),
}



export {
  video_course,//课程
  video_video,//课程章节
  video_user,
  video_video_time,//视频学习时长
  video_learning_time,// 只做增量，不做减量
  video_comments, //评论
  video_class, // 班级
  video_class_user,  //班级用户
  video_assignment, //已完成的作业表
  video_time_class, // s
}