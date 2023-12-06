import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JitsiService } from '../services/jitsy.service';
declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-jitsi',
  templateUrl: './jitsi.component.html',
  styleUrls: ['./jitsi.component.scss']
})


export class JitsiComponent implements OnInit {
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
        private http:HttpClient,
        private jitsiService: JitsiService
    ) { }
    userconected =JSON.parse(localStorage.getItem('User') || '');

    ngOnInit(): void {
      this.route.params.subscribe(async params => { 
        console.log("salaaaaaaaaaaaaaaaaaaaaaaaaam");
        console.log(params['id']);
        const meetingId = params['id']; // Assuming you have a route parameter 'id'
        await this.fetchMeetingInfoFromNode(meetingId);
        console.log(this.room);
        this.jitsiService.moveRoom(this.room, true);

    }); 


    }
  token = localStorage.getItem('authToken') || '';
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
    

    async fetchMeetingInfoFromNode(meetingId: string): Promise<void> {
      try {
          const data = await this.http.get<any>(`http://localhost:8000/meetings/${meetingId}`, { headers: this.headers }).toPromise();
          this.room = data.jitsiRoom;
          console.log(data);
      } catch (error) {
          console.error('Error fetching meeting information', error);
      }
  }
  
  executeCommand(data: any) {
    console.log(
      'this.jitsiService.getParticipants():',
      this.jitsiService.getParticipants()
    );

    this.jitsiService.api.executeCommand(
      'sendEndpointTextMessage',
      this.jitsiService.getParticipants(),
      'mover a principal'
    );
  }

}