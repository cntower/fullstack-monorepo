import { Component, OnInit, Input } from '@angular/core';
import { PostUserRO } from '@app/services/api.service';

@Component({
  selector: 'mono-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  @Input() post: PostUserRO;
  constructor() { }

  ngOnInit() {
  }

}
