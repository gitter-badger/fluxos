import {FluxosStore} from 'fluxos';
import ResumePayloadData from './ResumePayload';
import Resume from '../models/Resume';
import constants from "./Constants";

export default class ResumeStore extends FluxosStore<ResumePayloadData>{

	resumes: Resume[];
	currentResume: Resume;

	constructor() {
		super();
		let bindLinks: { [key: string]: Function } = {};
		
		bindLinks[constants.GET_RESUME] = this.getResume;
		bindLinks[constants.GET_RESUMES] = this.getResumes;
		bindLinks[constants.GOT_RESUME] = this.gotResume;
		bindLinks[constants.GOT_RESUMES] = this.gotResumes;
		
		this.link(bindLinks);
	}

	getResumes(data: ResumePayloadData) {
		if (data.fromUserId) {
			//fetch for the user
		}//else fetch all
	}

	gotResumes(data: ResumePayloadData) {
		this.publish();
	}

	getResume(data: ResumePayloadData) {
		if (data.resumeId) {
			//fetch resume by it's id.
			
		}
	}

	gotResume(payload: ResumePayloadData) {
		this.publish();
	}


}