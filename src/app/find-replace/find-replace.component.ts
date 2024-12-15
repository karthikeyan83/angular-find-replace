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
  findReplaceForm: FormGroup;
  highlightedText: string = '';
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
        this.occurrences = `${(text.match(regex) || []).length} Replaced with ${replace}`;
        this.highlightedText = text.replace(regex, (match:string) => `<mark class='highlight'>${match}</mark>`);
        const updatedText = text.replace(regex, replace);
        this.findReplaceForm.get('textArea')?.setValue(updatedText);
        this.textReplaced = true;
}
else {
      this.occurrences = '0';
      this.textReplaced = true;
      this.highlightedText = text;
      }
}

}
