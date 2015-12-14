
import Resume from '../models/Resume';

export interface GetResumesPayloadData {
	fromUserId?: number;
}

export interface GotResumesPayloadData {
	resumes?: Resume[];
}

export interface GetResumePayloadData {
	resumeId?: number;
}

export interface GotResumePayloadData {
	resume?: Resume;
}

export interface ResumePayloadData extends GetResumesPayloadData, GotResumesPayloadData, GetResumePayloadData, GotResumePayloadData {

}



export default ResumePayloadData;