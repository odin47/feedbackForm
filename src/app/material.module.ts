import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule, MatRadioModule, MatCardModule,
     MatExpansionModule, MatProgressSpinnerModule, MatDialogModule, MatTabsModule, MatFormFieldModule,
      MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
    imports : [MatButtonModule, MatToolbarModule, MatRadioModule, MatCardModule,
         MatExpansionModule, MatProgressSpinnerModule, MatDialogModule, MatTabsModule, MatFormFieldModule, MatOptionModule,
          MatSelectModule],
    exports : [MatButtonModule, MatToolbarModule, MatRadioModule, MatCardModule,
         MatExpansionModule, MatProgressSpinnerModule, MatDialogModule, MatTabsModule, MatFormFieldModule, MatOptionModule,
         MatSelectModule]
})

export class MaterialModule {}
