import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import {MatListModule} from '@angular/material/list'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    RouterLink
  ],
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Output() onClose = new EventEmitter<void>();
  @Output() setHeader = new EventEmitter<string>();

  redirect(header: string) {
    this.close();
    this.changeHeader(header);
  }

  close() {
    this.onClose.emit();
  }

  changeHeader(header: string) {
    this.setHeader.emit(header);
  }
}
