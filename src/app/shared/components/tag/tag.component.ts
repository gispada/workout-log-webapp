import { Component, Input } from '@angular/core'
import { hexToRgba } from '@shared/utils'

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() color?: string
  @Input() inverted = false

  get className() {
    if (this.color) return ''
    return `default-color${this.inverted ? '-inverted' : ''}`
  }

  get style() {
    if (!this.color) return null
    return this.inverted
      ? {
          color: '#fafafa',
          'background-color': hexToRgba(this.color, 0.8)
        }
      : {
          color: this.color,
          'background-color': hexToRgba(this.color, 0.1)
        }
  }
}
