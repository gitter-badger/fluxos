import createContext from "fluxos";
import ResumePayloadData from './ResumePayload';
import {ResumeActions} from './ResumeActions';
import ResumeStore from './ResumeStore';

type Payload = ResumePayloadData; //| somethingelse | something


export default createContext<Payload, ResumeActions, ResumeStore>(ResumeStore);
		
