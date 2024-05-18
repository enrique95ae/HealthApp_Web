import { Component } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  showPopover(popover: NgbPopover): void {
    popover.open();
  }

  hidePopover(popover: NgbPopover): void {
    popover.close();
  }
}
