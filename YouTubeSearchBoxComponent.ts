/**
 * Created by igor on 1/31/16.
 */
import {Component, EventEmitter, OnInit, ElementRef, Inject} from 'angular2/core'
import {SearchResult, YouTubeService} from 'YouTubeService'
import {Observable} from 'rxjs/Rx';

@Component({
    outputs: ['loading', 'results'],
    selector: 'search-box',
    template: `
    <input type="text" class="form-control" placeholder="Search" autofocus>
  `
})
export class SearchBox implements OnInit {
    loading:EventEmitter < boolean > = new EventEmitter<boolean>();
    results:EventEmitter < SearchResult[] > = new EventEmitter<SearchResult[]>();
    public youtube:YouTubeService;
    private el:ElementRef;

    constructor(@Inject(YouTubeService) youtube, @Inject(ElementRef) el) {
        this.youtube = youtube;
        this.el = el;
    }

    ngOnInit():void {
        Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e:any) => e.target.value)
            .filter((text:string) => {

                return text.length > 1
            })
            .debounceTime(400)
            .do(() => this.loading.next(true))
            .map((query:string) => {
                let youtube = <any>this.youtube;
                return youtube.search(query)
            })
            .switch()
            .subscribe(
                (results:SearchResult[]) => {
                    this.loading.next(false);
                    this.results.next(results);
                },
                (err:any) => {
                    console.log(err);
                    this.loading.next(false);
                },
                () => { // on completion
                    this.loading.next(false);
                }
            );

    }
}