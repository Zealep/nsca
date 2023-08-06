import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

@Injectable({
  providedIn: 'root',
})
export class SpinnerOverlayService {

  private overlayRef?: OverlayRef = undefined;

  constructor(private overlay: Overlay) { }

  public show(): void {
    // Hack avoiding `ExpressionChangedAfterItHasBeenCheckedError` error
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        positionStrategy: this.overlay
          .position()
          .global()
          .centerHorizontally()
          .centerVertically(),
        hasBackdrop: true,
      });
      this.overlayRef.attach(new ComponentPortal(ProgressSpinnerComponent));
    });
  }

  public hide(): void {
    //if (this.overlayRef && this.overlayRef.hasAttached()) {
    this.overlayRef!.detach();
    this.overlayRef = undefined;
  }
  //}
}
