import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-google-deep-links',
  templateUrl: './google-deep-links.component.html',
  styleUrls: ['./google-deep-links.component.scss']
})
export class GoogleDeepLinksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // var text = document.getElementById("text")
    document.body.innerHTML= '[{relation": ["delegate_permission/common.handle_all_urls"],"target" :  { "namespace": "android_app", "package_name": "io.prenota.client","sha256_cert_fingerprints": ["BF:7B:F8:F5:B3:FF:59:3C:39:D2:F6:D0:D4:77:4F:A9:67:6B:1C:84:6B:B2:37:BC:F0:CF:1B:1B:D3:42:60:91"] }}]'
    // text.innerHTML = '[{relation": ["delegate_permission/common.handle_all_urls"],"target" :  { "namespace": "android_app", "package_name": "io.prenota.client","sha256_cert_fingerprints": ["BF:7B:F8:F5:B3:FF:59:3C:39:D2:F6:D0:D4:77:4F:A9:67:6B:1C:84:6B:B2:37:BC:F0:CF:1B:1B:D3:42:60:91"] }}]'
  }

}
