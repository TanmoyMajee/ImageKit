import mongoose, { Schema, model, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width:1024,
  height:768,
  quality:70,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?:boolean;
  tranformations?:{
    width:number;
    height:number;
    quality:number;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
  },
  videoUrl:{
    type:String,
    required:true,
  },
  thumbnailUrl:{
    type:String,
    required:true,
  },
  controls:{
    type:Boolean,
    default:true,
  },
  tranformations:{
    width:{
      type:Number,
      default:VIDEO_DIMENSIONS.width,
    },
    height:{
      type:Number,
      default:VIDEO_DIMENSIONS.height,
    },
    quality:{
      type:Number,
      min:1,
      max:100,
    },
  }
},{timestamps:true});

const Video = models?.ImageKitVideo || model<IVideo>("ImageKitVideo",videoSchema);

export default Video;
  
