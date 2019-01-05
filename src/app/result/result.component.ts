import { Component, OnInit } from '@angular/core';
import { QuizService } from '../shared/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {



  constructor(public quizService: QuizService, private router: Router) { }

  ngOnInit() {
    if (parseInt(localStorage.getItem('qnProgress')) == 14) {
      this.quizService.seconds = parseInt(localStorage.getItem('seconds'));
      this.quizService.qnProgress = parseInt(localStorage.getItem('qnProgress'));
      this.quizService.qns = JSON.parse(localStorage.getItem('qns'));
      
      this.quizService.getAnswers().subscribe(
        (data: any) => {
          console.log('data', data);
          this.quizService.correctAnswerCount = 0;
          this.quizService.qns.forEach((e, i) => {
            
            if ( ( e.answer + 1 ) == e.Answer ) {
              console.log("it's true answer");
              this.quizService.correctAnswerCount++;
              e.correct = e.answer;
            }else{
              e.correct = (e.Answer - 1);
            }
            console.log('e => ', e) ;
            console.log('i => ', i) ;
            console.log('data[i] => ', data[i]);
            /*if (e.answer == data[i])
              this.quizService.correctAnswerCount++;
            e.correct = data[i];*/
          });
        }
      );
    }
    else
      this.router.navigate(['/quiz']);
  }


  OnSubmit() {
    this.quizService.submitScore().subscribe(() => {
      this.restart();
    });
  }

  restart() {
    localStorage.setItem('qnProgress', "0");
    localStorage.setItem('qns', "");
    localStorage.setItem('seconds', "0");
    this.router.navigate(['/quiz']);
    this.quizService.countDownSeconds = 60 ;
  }

}
