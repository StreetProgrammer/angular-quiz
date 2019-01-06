import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class QuizService {
  // ---------------- Properties---------------
  readonly rootUrl = 'http://backup.sports-mate.net/api/';
  readonly imagesUrl = 'http://backup.sports-mate.net/api/storage/answers/';
  qns: any[];
  seconds: number;
  countDownSeconds: number = 60 ;
  timer;
  qnProgress: number;
  correctAnswerCount: number = 0;

  // ---------------- Helper Methods---------------
  constructor(private http: HttpClient) { }

  displayTimeElapsed() {
    return Math.floor(this.seconds / 3600) + ':' + Math.floor(this.seconds / 60) + ':' + Math.floor(this.seconds % 60);
  }

  displayTimeCountDown() {
    return Math.floor(this.countDownSeconds / 3600) + ':' + Math.floor(this.countDownSeconds / 60) + ':' + Math.floor(this.countDownSeconds % 60);
  }

  getParticipantName() {
    const participant = JSON.parse(localStorage.getItem('participant'));
    return participant.name;
  }


  // ---------------- Http Methods---------------

  insertParticipant(name: string, email: string) {
    const body = {
      name: name,
      email: email
    }
    return this.http.post(this.rootUrl + 'participant', body);
  }

  getQuestions() {
    return this.http.get(this.rootUrl + 'Questions');
  }

  getAnswers() {
    const body = this.qns.map(x => x.id);
    return this.http.post(this.rootUrl + 'Answers', body);
  }

  submitScore() {
    const body = JSON.parse(localStorage.getItem('participant'));
    body.Score = this.correctAnswerCount;
    body.TimeSpent = this.seconds;
    return this.http.post(this.rootUrl + '/api/UpdateOutput', body);
  }

}
