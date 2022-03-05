import { Component, Input, OnInit } from '@angular/core'
import { hexToRgba } from '@shared/utils'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
  @Input() color?: string

  style = {}

  ngOnInit() {
    if (this.color) {
      this.style = {
        color: this.color,
        'background-color': hexToRgba(this.color, 0.1)
      }
    }
  }
}
