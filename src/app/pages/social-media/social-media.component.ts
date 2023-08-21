import { Component } from '@angular/core';
import { Popover, PopoverOptions, PopoverInterface } from "flowbite";

const options: PopoverOptions = {
  placement: 'left',
  triggerType: 'click',
  offset: 10,
  onHide: () => {
  },
  onShow: () => {
  },
  onToggle: () => {
  }
};


@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css']
})
export class SocialMediaComponent {

  ngOnInit() {
    const $targetEl: HTMLElement = document.getElementById('popoverContent')!;
    const $triggerEl: HTMLElement = document.getElementById('popoverButton')!;
    
    if ($targetEl) {
      /*
      * targetEl: required
      * triggerEl: required
      * options: optional
      */
      const popover: PopoverInterface = new Popover($targetEl, $triggerEl, options);

    }
  }
}
