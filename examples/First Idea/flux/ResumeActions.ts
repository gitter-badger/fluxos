export interface ResumeActions {
	getResumes(): void;
	getResume(resumeId: number): void;
	gotResume(): void;
	gotResumes(): void;
}