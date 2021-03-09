import { TokenStorageService } from "./services/token-storage.service";
import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

import { IconSetService } from "@coreui/icons-angular";
import { freeSet } from "@coreui/icons";

@Component({
  // tslint:disable-next-line
  selector: "body",
  template: "<router-outlet></router-outlet>",
  providers: [IconSetService],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  email?: string;
  constructor(
    private router: Router,
    public iconSet: IconSetService,
    private tokenStorageService: TokenStorageService
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.email = user.email;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
