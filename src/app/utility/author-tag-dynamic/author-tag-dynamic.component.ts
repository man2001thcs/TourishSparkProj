import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-author-tag-dynamic',
  templateUrl: './author-tag-dynamic.component.html',
  styleUrls: ['./author-tag-dynamic.component.css']
})
export class AuthorTagDynamicComponent {
  @Input()
  data!: string;
}
