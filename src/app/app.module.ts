import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FeedbackViewComponent } from './feedback-view/feedback-view.component';
import { FeedbackDataServiceService } from './feedback-data-service.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule } from './material.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule } from '@angular/forms';
import { FeedbackDialogComponent } from './feedback-dialog/feedback-dialog.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RouterModule, Routes} from '@angular/router';


const appRoutes: Routes = [
  {path: 'all', component: FeedbackViewComponent},
  {path: 'admin_dashboard', component: AdminPanelComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FeedbackViewComponent,
    FeedbackDialogComponent,
    AdminPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
     ],
  providers: [FeedbackDataServiceService],
  bootstrap: [AppComponent],
  entryComponents: [FeedbackDialogComponent]
})
export class AppModule { }
