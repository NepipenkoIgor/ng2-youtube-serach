/**
 * Created by igor on 1/31/16.
 */
import {Component} from 'angular2/core'
import {HTTP_PROVIDERS} from 'angular2/http'
import {bootstrap} from 'angular2/platform/browser';
import {SearchResult, YouTubeService} from 'YouTubeService'
import {SearchResultComponent} from 'YouTubeDisplayComponent'
import {SearchBox} from 'YouTubeSearchBoxComponent'

let loadingGif = 'images/loading.gif';

@Component({
    selector: 'youtube-search',
    directives: [SearchBox, SearchResultComponent],
    template: `
    <div class='container'>
<div class="page-header"> <h1>YouTube Search
<div class="load_gif">
<img
style="float: right;" *ngIf="loading" src='${loadingGif}' />
</div>

</h1> </div>
<div class="row">
<div class="input-group input-group-lg col-md-12 search-input">
<search-box
(loading)="loading = $event" (results)="updateResults($event)"
            ></search-box>
 </div>
     </div>
<div class="row-content"> <search-result
          *ngFor="#result of results"
[result]="result"> </search-result>
     </div>
  </div>
    `
})
export class YouTubeSearchComponent {
    results:SearchResult[];

    updateResults(results:SearchResult[]):void {
        this.results = results;
    }
}


bootstrap(YouTubeSearchComponent, [YouTubeService, HTTP_PROVIDERS]);