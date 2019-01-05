import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../shared/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, public quizService: QuizService) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('seconds')) > 0) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      if (this.quizService.qnProgress == 14)
        this.router.navigate(['/result']);
      else
        this.startTimer();
    }
    else {
      this.quizService.seconds = 0;
      this.quizService.qnProgress = 0;
      this.quizService.getQuestions().subscribe(
        (data: any) => {
          this.quizService.qns = data;
          this.startTimer();
        }
      );
    }
  }

  startTimer() {
    this.quizService.timer = setInterval(() => {
      if (this.quizService.countDownSeconds == 0) {
        //localStorage.clear();
        alert('time is out') ;
        clearInterval(this.quizService.timer);
        this.router.navigate(['/register']);
      }else{
        this.quizService.countDownSeconds--;
        this.quizService.seconds++;
        localStorage.setItem('seconds', this.quizService.seconds.toString());
      }
      
    }, 1000);
  }

  Answer(qID, choice) {
    console.log('choice', choice);
    this.quizService.qns[this.quizService.qnProgress].answer = choice;
    localStorage.setItem('qns', JSON.stringify(this.quizService.qns));
    this.quizService.qnProgress++;
    localStorage.setItem('qnProgress', this.quizService.qnProgress.toString());
    if (this.quizService.qnProgress == 14) {
      clearInterval(this.quizService.timer);
      this.router.navigate(['/result']);
    }
    console.log('localStorage', localStorage.qnProgress);
    console.log('qns', this.quizService.qns);
    
  }

}
