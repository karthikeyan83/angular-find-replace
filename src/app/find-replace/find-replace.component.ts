import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-find-replace',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './find-replace.component.html',
  styleUrl: './find-replace.component.scss'
})
export class FindReplaceComponent {
  //Field Declarations
  findReplaceForm: FormGroup;

  //Variables to show the Original Text and Replaced Text
  showOriginalText: string = '';
  showReplaceText:string = '';

  //Variables to show the Number of Occurences and Text Replaced
  occurrences: string = '';
  textReplaced:boolean = false;
  constructor(private fb: FormBuilder) {
      this.findReplaceForm = this.fb.group({
        textArea: ['',[Validators.required]],
        searchText: ['',[Validators.required]],
        replaceText: ['']
      });
    }
// Helper methods to access form controls
 get textArea() {
   return this.findReplaceForm.get('textArea');
 }

 get searchText() {
   return this.findReplaceForm.get('searchText');
 }

 get replaceText() {
   return this.findReplaceForm.get('replaceText');
 }


findAndReplace() {
if (this.findReplaceForm.invalid) {
      this.findReplaceForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
      return;
}
this.textReplaced = false;
const text = this.findReplaceForm.get('textArea')?.value || '';
const search = this.findReplaceForm.get('searchText')?.value || '';
const replace = this.findReplaceForm.get('replaceText')?.value || '';
if (search) {
        const regex = new RegExp(search, 'g');
        const textcount = (text.match(regex) || []).length;
        this.occurrences = "Occurences Found:" + (textcount > 0 ? `${textcount} <br/> ${search} Replaced with ${replace}`: ' 0 <br/> No Text Replaced');
        this.showOriginalText = text.replace(regex, (match:string) => `<mark class='highlight'>${match}</mark>`);
        this.showReplaceText = text.replace(regex, (match:string) => `<mark class='highlight'>${replace}</mark>`);
        const updatedText = text.replace(regex, replace);
        this.findReplaceForm.get('textArea')?.setValue(updatedText);
        this.textReplaced = true;
}
else {
      this.occurrences = '0';
      this.textReplaced = true;
      this.showOriginalText = text;
  }
}

}
