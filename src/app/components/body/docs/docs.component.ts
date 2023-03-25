import { ComponentStoreService } from './../../../services/component-store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.css'],
})
export class DocsComponent implements OnInit, OnDestroy {
  constructor(private _store: ComponentStoreService) {}

  ngOnInit(): void {
    this._store.changeStyleForDoc(true);
  }
  ngOnDestroy(): void {
    this._store.changeStyleForDoc(false);
  }
}
