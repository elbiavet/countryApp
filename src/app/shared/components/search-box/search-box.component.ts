import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy{

  @Input()
  public placeholder:string = '';

  @Input()
  public initialValue:string = '';

  @Output()
  public onDebounce = new EventEmitter<string>();

  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;


  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value => this.onDebounce.emit(value))
  }

  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  onKeyPress( searchTerm: string ):void {
    this.debouncer.next( searchTerm );
  }

}



  