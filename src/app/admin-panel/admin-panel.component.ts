import { Component, OnInit } from '@angular/core';
import { FeedbackDataServiceService } from '../feedback-data-service.service';
import { Observable } from 'rxjs/Observable';
import { MatTab, MatFormField, MatSelect, MatOption } from '@angular/material';
import { Chart, ChartData, Point } from 'chart.js';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

    public chart = [];
    public adminQuestions = [];
    public reportingManagers = [];
    public answers = [];
    public types = [];
    public options = [];
    public userAnswers = [];
    public ans = [];
    public graphData = [];
    constructor(private questionService: FeedbackDataServiceService) { }
    public filteredQuestions = [];
    public xAxis = [];
    public yAxis = [];
    selected = '';
    ngOnInit() {

             // Reporting managers names
        this.questionService.getAdminData().subscribe(data => {
            console.log(data);
            this.reportingManagers = data;
        });
    }

     getManagerAlias() {
        console.log('Selected' + this.selected);
        let avgValue = 0;
        let count = 0;

        this.questionService.getQuestions().subscribe(data => {
            this.adminQuestions = (data as any).question;
             console.log(data);
            this.answers = this.adminQuestions.map(question => question.type);
            this.types = this.answers.filter((type, pos, answers) => answers.indexOf(type) === pos);
            // console.log(this.types);

            this.types.forEach((eachType) => {
                avgValue = 0;
                count = 0;
                this.adminQuestions.filter((value) => {
                    if (value.type === eachType) {
                        value.answer.forEach(element => {
                            if (element.user === 'dpod') {
                                avgValue += element.answer;
                                count++;
                            }
                        });
                    }
                });
                const chartData = {
                    questionType: eachType,
                    questionValue: Math.round(avgValue / count) * 100

                };
                this.filteredQuestions.push(chartData);
            });

            // console.log(this.filteredQuestions);
            this.xAxis = this.filteredQuestions.map(value => value.questionType);
            this.yAxis = this.filteredQuestions.map(value => value.questionValue);
            // console.log(this.xAxis);

            function dynamicColors() {
                const r = Math.floor(Math.random() * 255);
                const g = Math.floor(Math.random() * 255);
                const b = Math.floor(Math.random() * 255);
                return 'rgba(' + r + ',' + g + ',' + b + ', 0.5)';
            }

            function poolColors(a) {
                const pool = [];
                for (let i = 0; i < a; i++) {
                    pool.push(dynamicColors());
                }
                return pool;
            }
            const ctx = (document as any).getElementById('myBarChart').getContext('2d');
            const chartBar = new Chart(ctx, {
                // The type of chart we want to create
                type: 'bar',

                // The data for our dataset
                data: {
                    labels: this.xAxis,
                    datasets: [{
                        label: 'Average Feedback Report',
                        backgroundColor: poolColors(this.xAxis.length),
                        borderColor: poolColors(this.xAxis.length),
                        data: this.yAxis,
                    }]
                },

                // Configuration options go here
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                autoSkip: false
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                autoSkip: false
                            }
                        }]
                    }
                }
            });

            const ctLine = (document as any).getElementById('myLineChart').getContext('2d');
            const chartLine = new Chart(ctLine, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: this.xAxis,
                    datasets: [{
                        label: 'Average Feedback Report',
                        backgroundColor: poolColors(this.xAxis.length),
                        borderColor: poolColors(this.xAxis.length),
                        data: this.yAxis,
                    }]
                },

                // Configuration options go here
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                autoSkip: false
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                autoSkip: false
                            }
                        }]
                    }
                }
            });


        });
    }

}
