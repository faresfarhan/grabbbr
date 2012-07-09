/*
  Grabbbr a PrototypeJS add-on to grab data from Dribbble API  
  This add-on is based on Jribbble - http://tylergaw.com/lab/jribbble/
  All credits goes to @tylergaw
 
  Adapted to PrototypeJS add-on by Fares Farhan - http://dribbble.com/faresfarhan
  Version : 0.1
  Last Updated : 04/06/2011  
*/

//  Create public object for grabbbr
var grabbbr = {
	strBaseUrl : 'http://api.dribbble.com',
    objApiPaths : {
		shots:     '/shots/',
		rebounds:  '/rebounds/',
		following: '/following/',
		players:   '/players/',
		followers: '/followers/',
		draftees:  '/draftees/',
		comments:  '/comments/',
		likes: '/likes/'
	},
	// Make a request to Dribbble's API endpoint
	// @param STRING url
	// @param FUNCTION callback
	// @param OBJ OPTIONAL pagingOpts	
	makeRequest : function (url, callback, pagingOpts){
		var options = {};
		if (pagingOpts != undefined) {
		   options =  pagingOpts;
		} 		
		var strApiUrl = url.replace('//', '/');
        new Ajax.JSONRequest(grabbbr.strBaseUrl+strApiUrl, {  
		  parameters: options,  
		  onCreate: function(response) {
		   // 
		  },
		  onSuccess: function(response) {
		    //  
		  },
		  onFailure: function(response) {
		    //
		  },
		  onComplete: function(response) {
		   	callback(response.responseJSON);
		  }
		});		
	},  
	// These are Public Static Methods, available at any time. You do not have to instantiate grabbbbr to call these methods     

	// SHOTS -------------------------------------------------------------------     

	// Retrieve the shot specified by shotID
	// @param INT shotID - The id of the shot you want.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback	
	grabShot : function (shotID, callback){
		grabbbr.makeRequest(grabbbr.objApiPaths.shots+shotID, callback);		
	}, 
	// Retrieve the rebounds of a shot specified by shotID
	// @param INT shotID - The id of the shot you want rebounds for.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination	  
	grabShotRebounds: function (shotID, callback, pagingOpts){ 
		pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
		grabbbr.makeRequest(grabbbr.objApiPaths.shots+shotID+grabbbr.objApiPaths.rebounds, callback, pagingOpts);
	},
	// @param STRING listName - One of the following: 'debuts', 'everyone', 'popular'
	// @param FUNCTION callback  - Function that will be called once the
	//                             request has successfully completed. The data
	//                             from the request will be passed to the callback
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	grabShotsByList : function (listName, callback, pagingOpts){
		pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
		grabbbr.makeRequest(grabbbr.objApiPaths.shots+listName, callback, pagingOpts);		
	},
	// Retrieve the most recent shots for the player specified by playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	grabPlayersShots : function (playerID, callback, pagingOpts){
        pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
        grabbbr.makeRequest(grabbbr.objApiPaths.players+playerID+grabbbr.objApiPaths.shots, callback, pagingOpts);
	}, 
	// Retrieve the most recent shots published by those the player, specified by playerId, follows
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	grabShotsFromFollowingList : function (playerID, callback, pagingOpts){
        pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
        grabbbr.makeRequest(grabbbr.objApiPaths.players+playerID+grabbbr.objApiPaths.shots+grabbbr.objApiPaths.following, callback, pagingOpts);		
	},
	// Retrieve the most recent shots liked by the player, specified by playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	grabShotsFromLikesList : function (playerID, callback, pagingOpts){
        pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
        grabbbr.makeRequest(grabbbr.objApiPaths.players+playerID+grabbbr.objApiPaths.shots+grabbbr.objApiPaths.likes, callback, pagingOpts);		
	},
	// PLAYERS ------------------------------------------------------------------ 
	// Retrieve profile details for the player specified by playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	grabPlayer : function (playerID, callback){
		grabbbr.makeRequest(grabbbr.objApiPaths.players+playerID, callback);
	},
	// Retrieve followers of a player by the playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback. 
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination	
	grabPlayerFollowers : function (playerID, callback, pagingOpts){   
		pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
		grabbbr.makeRequest(grabbbr.objApiPaths.players+playerID+grabbbr.objApiPaths.followers, callback, pagingOpts);
	},
	// Retrieve the list of players that are following playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	grabPlayerFollowing : function (playerID, callback, pagingOpts){   
		pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
		grabbbr.makeRequest(grabbbr.objApiPaths.players+playerID+grabbbr.objApiPaths.following, callback, pagingOpts);
	},
	// Retrieve the list of players drafted by the playerId
	// @param STRING | INT playerId - Can be 'username' or 2318
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	grabPlayerDraftees : function (playerID, callback, pagingOpts){   
		pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
		grabbbr.makeRequest(grabbbr.objApiPaths.players+playerID+grabbbr.objApiPaths.draftees, callback, pagingOpts);
	},
	// COMMENTS -------------------------------------------------------------------  
	// Retrieve the set of comments for the shot specified by shotID
	// @param INT shotID - The id of the shot you want comments for.
	// @param FUNCTION callback - Function that will be called once the
	//                            request has successfully completed. The data
	//                            from the request will be passed to the callback.
	// @param OBJ OPTIONAL pagingOpts - { page: 1, per_page: 15 } 
	//                                  @see http://dribbble.com/api#pagination
	grabShotComments: function(shotID, callback, pagingOpts){ 
		pagingOpts = Object.extend({
			page: 1, 
			per_page: 15
        }, pagingOpts || {});
		grabbbr.makeRequest(grabbbr.objApiPaths.shots+shotID+grabbbr.objApiPaths.comments, callback, pagingOpts);
	}    
};    







/* 
 JSON-P implementation for Prototype.js somewhat by Dan Dean (http://www.dandean.com)
*/
Ajax.JSONRequest=Class.create(Ajax.Base,(function(){var b=0,a=document.getElementsByTagName("head")[0]||document.body;return{initialize:function($super,d,c){$super(c);this.options.url=d;this.options.callbackParamName=this.options.callbackParamName||"callback";this.options.timeout=this.options.timeout||10;this.options.invokeImmediately=(!Object.isUndefined(this.options.invokeImmediately))?this.options.invokeImmediately:true;if(!Object.isUndefined(this.options.parameters)&&Object.isString(this.options.parameters)){this.options.parameters=this.options.parameters.toQueryParams();}if(this.options.invokeImmediately){this.request();}},_cleanup:function(){if(this.timeout){clearTimeout(this.timeout);this.timeout=null;}if(this.transport&&Object.isElement(this.transport)){this.transport.remove();this.transport=null;}},request:function(){var d=new Ajax.JSONResponse(this);var g=this.options.callbackParamName,f="_prototypeJSONPCallback_"+(b++),c=function(){if(Object.isFunction(this.options.onComplete)){this.options.onComplete.call(this,d);}Ajax.Responders.dispatch("onComplete",this,d);}.bind(this);this.options.parameters[g]=f;var e=this.options.url+((this.options.url.include("?")?"&":"?")+Object.toQueryString(this.options.parameters));window[f]=function(h){this._cleanup();window[f]=undefined;d.status=200;d.statusText="OK";d.setResponseContent(h);if(Object.isFunction(this.options.onSuccess)){this.options.onSuccess.call(this,d);}Ajax.Responders.dispatch("onSuccess",this,d);c();}.bind(this);this.transport=new Element("script",{type:"text/javascript",src:e});if(Object.isFunction(this.options.onCreate)){this.options.onCreate.call(this,d);}Ajax.Responders.dispatch("onCreate",this);a.appendChild(this.transport);this.timeout=setTimeout(function(){this._cleanup();window[f]=Prototype.emptyFunction;if(Object.isFunction(this.options.onFailure)){d.status=504;d.statusText="Gateway Timeout";this.options.onFailure.call(this,d);}c();}.bind(this),this.options.timeout*1000);},toString:function(){return"[object Ajax.JSONRequest]";}};})());Ajax.JSONResponse=Class.create({initialize:function(a){this.request=a;},request:undefined,status:0,statusText:"",responseJSON:undefined,responseText:undefined,setResponseContent:function(a){this.responseJSON=a;this.responseText=Object.toJSON(a);},getTransport:function(){if(this.request){return this.request.transport;}},toString:function(){return"[object Ajax.JSONResponse]";}});




       

