import {put} from 'redux-saga/effects'
import * as actions from '../action/index'
import axios from 'axios'


export function* init_ingredients_saga(action){
    
    
        try {
            const response = yield axios.get('https://burger-builder4735.firebaseio.com/ingredients.json')
            yield put(actions.fetch_ingredients(response.data.ingredients))
        } catch (error) {
            yield put(actions.failed_ingredients(error))
        }
			

}