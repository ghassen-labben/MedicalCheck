import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.scss']
})


export class JitsiComponent implements OnInit, AfterViewInit {
    domain: string = "meet.jit.si"; // For self-hosted use your domain
    room: any;
    options: any;
    api: any;
  user:any;
    // For Custom Controls
    isAudioMuted = false;
    isVideoMuted = false;
  
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private http:HttpClient
    ) { }
    userconected =JSON.parse(localStorage.getItem('User') || '');

    ngOnInit(): void {
      this.route.params.subscribe(async params => { 
        console.log("salaaaaaaaaaaaaaaaaaaaaaaaaam");
        console.log(params['id']);
        const meetingId = params['id']; // Assuming you have a route parameter 'id'
        await this.fetchMeetingInfoFromNode(meetingId);
        this.user = {
            name:this.userconected.name  // Set your username
        };
        this.initializeJitsi();
    });
    }
  token = localStorage.getItem('authToken') || '';
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    ngAfterViewInit(): void {
        // Rest of your code remains the same
        this.initializeJitsi();
  
        this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  
        // Event handlers
        this.api.addEventListeners({
            readyToClose: this.handleClose,
            participantLeft: this.handleParticipantLeft,
            participantJoined: this.handleParticipantJoined,
            videoConferenceJoined: this.handleVideoConferenceJoined,
            videoConferenceLeft: this.handleVideoConferenceLeft,
            audioMuteStatusChanged: this.handleMuteStatus,
            videoMuteStatusChanged: this.handleVideoStatus
        });
    }
    initializeJitsi(): void {
      this.options = {
        roomName: this.room,
        width: 900,
        height: 500,
        configOverwrite: {
            prejoinPageEnabled: false,
            enableNoisyMicDetection: false, // Add this line to disable mic detection
            enableLobby: false, // Disable lobby feature
        },
        interfaceConfigOverwrite: {
            // overwrite interface properties
        },
        parentNode: document.querySelector('#jitsi-iframe'),
        userInfo: {
            displayName: this.user.name,
            email: "ghassenlabbencs@gmail.com",
             // Allow anonymous users
        }
    };
  
      this.api = new JitsiMeetExternalAPI(this.domain, this.options);
  
      // Event handlers
      this.api.addEventListeners({
          readyToClose: this.handleClose,
          participantLeft: this.handleParticipantLeft,
          participantJoined: this.handleParticipantJoined,
          videoConferenceJoined: this.handleVideoConferenceJoined,
          videoConferenceLeft: this.handleVideoConferenceLeft,
          audioMuteStatusChanged: this.handleMuteStatus,
          videoMuteStatusChanged: this.handleVideoStatus
      });
  }

    async fetchMeetingInfoFromNode(meetingId: string): Promise<void> {
      try {
          const data = await this.http.get<any>(`http://localhost:8000/meetings/${meetingId}`, { headers: this.headers }).toPromise();
          this.room = data.jitsiRoom;
          console.log(data);
      } catch (error) {
          console.error('Error fetching meeting information', error);
      }
  }
  
  handleClose = () => {
    console.log("handleClose");
}

handleParticipantLeft = async (participant: any) => {
    console.log("handleParticipantLeft", participant); // { id: "2baa184e" }
    const data = await this.getParticipants();
}

handleParticipantJoined = async (participant: any) => {
    console.log("handleParticipantJoined", participant); // { id: "2baa184e", displayName: "Shanu Verma", formattedDisplayName: "Shanu Verma" }
    const data = await this.getParticipants();
}

handleVideoConferenceJoined = async (participant: any) => {
    console.log("handleVideoConferenceJoined", participant); // { roomName: "bwb-bfqi-vmh", id: "8c35a951", displayName: "Akash Verma", formattedDisplayName: "Akash Verma (me)"}
    const data = await this.getParticipants();
}

handleVideoConferenceLeft = () => {
    console.log("handleVideoConferenceLeft");
    this.router.navigate(['/thank-you']);
}

handleMuteStatus = (audio: any) => {
    console.log("handleMuteStatus", audio); // { muted: true }
}

handleVideoStatus = (video: any) => {
    console.log("handleVideoStatus", video); // { muted: true }
}

getParticipants() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(this.api.getParticipantsInfo()); // get all participants
        }, 500)
    });
}
executeCommand(command: string) {
  this.api.executeCommand(command);
  this.api.addEventListener('videoConferenceJoined', () => {
    this.api.executeCommand('password', null);
});
  if(command == 'hangup') {
      this.router.navigate(['/thank-you']);
      return;
  }

  if(command == 'toggleAudio') {
      this.isAudioMuted = !this.isAudioMuted;
  }

  if(command == 'toggleVideo') {
      this.isVideoMuted = !this.isVideoMuted;
  }
}
}