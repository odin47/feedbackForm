import { Component, OnInit } from '@angular/core';
import { FeedbackDataServiceService } from '../feedback-data-service.service';
import { Observable } from 'rxjs/Observable';
import { MatSpinner, MatProgressSpinnerModule, MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, FormControlName} from '@angular/forms';
import {FeedbackDialogComponent } from '../feedback-dialog/feedback-dialog.component';



@Component({
  selector: 'app-feedback-view',
  templateUrl: './feedback-view.component.html',
  styleUrls: ['./feedback-view.component.css']
})
export class FeedbackViewComponent implements OnInit {

 public questions = [];
 public questionTypeArray = [];
 public questionTypeTemp: string;
 public spinnerFlag: boolean;
 public userFeedback: FormGroup;
 public userAnswer = [];
 public questionID: string;
 public userQuestion: FormArray;
 public userAnswers: FormArray;
 public userInfo = {};
 public managerName = {};
   constructor(private questionService: FeedbackDataServiceService, private fb: FormBuilder, private dialog: MatDialog) {
     console.log('constructor....');
    }

  ngOnInit() {
    this.spinnerFlag = true;
    this.questionService.getQuestions().subscribe(data => {this.questions = (data as any).question;
      console.log(data);
      this.userInfo = (data as any).userInfo;
      this.managerName = (data as any).managerName;
            for ( let i = 0; i < this.questions.length; i++) {
              if ( this.questionTypeTemp === this.questions[i].type) {

                 } else {
                   this.questionTypeArray.push(this.questions[i].type);
                 }
                 this.questionTypeTemp = this.questions[i].type;
              }
              this.spinnerFlag = false;
              this.insertQuestion(this.questionTypeArray, this.questions);
            });
          }

  onSubmit(updatedForm) {
    this.spinnerFlag = true;
    const submittedAnswerArr = [];
         // console.log(updatedForm.length);
        for (let i = 0; i < updatedForm.length; i++) {
          for (let j = 0; j < updatedForm.controls[i].controls.userQuestionAnswers.controls.length; j++) {
              const submittedAnswer = {
                  userQuestionID: updatedForm.controls[i].controls.userQuestionAnswers.controls[j].controls.questionID.value,
                  userAnswerID: updatedForm.controls[i].controls.userQuestionAnswers.controls[j].controls.answer_360.value,
                  userID: 'dpod'
              };
              submittedAnswerArr.push(submittedAnswer);
          }
           }
            const finalSubmission = {
             givenFeedback: submittedAnswerArr,
             userID: 'dpod'
           };
     console.log('On submit working!!!!!!!!!!');
     // console.log(finalSubmission);
     this.questionService.postQuestion(finalSubmission).subscribe(data => {
       console.log(data);
       if ((data as any).ok === 1) {
        this.spinnerFlag = false;
        this.openDialog('Successfully Submitted');
         }
     });
  }
  onReset() {

  }
  insertQuestion(questionType, questions) {
    const arr = [];
    for (let i = 0; i < questionType.length; i++) {
        arr.push(this.answerType(questionType[i], questions));
    }
    this.userFeedback = this.fb.group({
     userQuestionsType: this.fb.array(arr)
      });
    }

  answerType(questionType, questions): FormGroup {
        const questionAnswerArr = [];
    for (let j = 0; j < questions.length; j++) {
      if (questionType === questions[j].type) {
      questionAnswerArr.push(this.questionAnswers(questions[j]));
      }
    }
     return this.fb.group({
      categoryType: [questionType],
      userQuestionAnswers: this.fb.array(questionAnswerArr)
    });
  }

  questionAnswers(individualQuestion): FormGroup {
    return this.fb.group({
      questionID: [individualQuestion._id],
      question_360: [individualQuestion.question],
      answer_360: ['', Validators.required]
    });
  }

  openDialog(message: string): void {
   this.dialog.open(FeedbackDialogComponent, {
     data: {msg: message}, width : '500px', disableClose : true
   });
  }

  resetForm() {
    console.log('resettingggggggg');
  }
 }


