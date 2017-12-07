import * as fromMovies from './movies-reducer';
import * as moviesActions from './movies-actions';
import { DEFAULT_APP_STATE, IMoviesState } from './movies-state';

describe('movie reducer', () => {                                     
    it('should handle initial state', () => {   
      
        let state = fromMovies.reducer(undefined, {type: "none"});                          
        expect(state).not.toBeFalsy();
        expect(state.activeMovie).toBeFalsy();
        expect(state.loading).toEqual(DEFAULT_APP_STATE.loading);
        expect(state.error).toEqual(DEFAULT_APP_STATE.error);
        expect(state.errorMsg).toEqual(DEFAULT_APP_STATE.errorMsg);
        expect(state.popMovies.length).toEqual(0);
    });                                                                    
  
    it('should handle GET_MOVIES', () => {      
        let state = fromMovies.reducer(undefined, new moviesActions.GetMovies());   
        expect(state.loading).toEqual(true);                                                     
    });                                                                    
  
    it('should handle GOT_MOVIES', () => { 
        let payload = [
            {id: "1", title: "test1", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: ""}, 
            {id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: ""}
        ];  
        let state = fromMovies.reducer(undefined, new moviesActions.GotMovies(payload));   
        expect(state.loading).toEqual(false);
        expect(state.popMovies).toBeTruthy();  
        expect(state.popMovies.length).toEqual(payload.length);      
        expect(state.activeMovie).toBeTruthy();        
        expect(state.activeMovie.id).toEqual(payload[0].id);                                                
    });   
    
    it('should handle SHOW_MOVIE', () => { 
        let payload = {id: "2", title: "test2", overview: "", release_date: "", vote_average: 5, vote_count: 5, poster_path: ""};
       
        let state = fromMovies.reducer(undefined, new moviesActions.ShowMovie(payload));   
        expect(state.activeMovie).toBeTruthy();        
        expect(state.activeMovie.id).toEqual(payload.id);                                                             
    });  

    it('should handle ERROR_MOVIES', () => { 
        let error = "just a test";
        let state = fromMovies.reducer(undefined, new moviesActions.ErrorMovie(error));   
        expect(state.error).toBeTruthy();        
        expect(state.errorMsg).toEqual(error);                                                             
    });  
  });