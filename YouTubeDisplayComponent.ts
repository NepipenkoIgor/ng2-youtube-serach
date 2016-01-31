/**
 * Created by igor on 1/31/16.
 */
import {Component} from 'angular2/core'
import {SearchResult} from 'YouTubeService'

@Component({
    inputs: ['result'],
    selector: 'search-result',
    template: `
<div class="col-sm-6 col-md-3"> <div class="thumbnail">
<img src="{{result.thumbnailUrl}}"> <div class="caption video-description">
<h3>{{result.title}}</h3> <p>{{result.description}}</p> <p><a href="{{result.videoUrl}}"
class="btn btn-default" role="button">Watch</a></p> </div>
     </div>
   </div>
`
})
export class SearchResultComponent {
    result:SearchResult;
}