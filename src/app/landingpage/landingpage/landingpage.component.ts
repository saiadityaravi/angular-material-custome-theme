import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import 'rxjs/add/operator/map';
import { ScrollDispatcher, CdkScrollable } from '@angular/cdk/scrolling';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { enrollmentDialogComponent } from '../../shared/components/enrollment-dialog/enrollment-dialog.component';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingpageComponent implements OnInit {
  private readonly SHRINK_TOP_SCROLL_POSITION = 50;
  shrinkToolbar = false;
  theme = "landingpageTheme"
  owntheme = "landingpageowncomponentsTheme"
  constructor(private scrollDispatcher: ScrollDispatcher,
    private ngZone: NgZone, private dialog: MatDialog) {

  }
  imageUrl = "../../../assets/images/logo.png";
  imageUrl_dark: any;
  ngOnInit() {
    this.scrollDispatcher.scrolled()
      .map((event: CdkScrollable) => this.getScrollPosition(event))
      .subscribe(scrollTop => this.ngZone.run(() => this.shrinkToolbar = scrollTop > this.SHRINK_TOP_SCROLL_POSITION ? true : false));
  }

  getScrollPosition(event) {
    this.imageUrl_dark = new Image();
    this.imageUrl_dark = "../../../assets/images/logo_dark.png"
    if (event) {
      return event.getElementRef().nativeElement.scrollTop;
    } else {
      return window.pageYOffset;
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(enrollmentDialogComponent, dialogConfig);
  }
}
