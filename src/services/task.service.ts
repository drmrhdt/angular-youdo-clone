import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs'

import { baseUrl } from 'src/environments'

import { ITaskResponse, ITasksResponse } from 'src/models'

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(private _httpClient: HttpClient) {}

	getTasksByFilter(values?): Observable<ITasksResponse> {
		return this._httpClient.get<ITasksResponse>(`${baseUrl}/tasks`, {
			params: values
		})
	}

	// TODO
	getTasksFromSuggestionsByExecutorIdAndFilters(
		values
	): Observable<ITasksResponse> {
		debugger
		return this._httpClient.get<ITasksResponse>(`${baseUrl}/suggestions`, {
			params: { ...values, category: 'WebDevelopment', subcategory: 'WebDev' }
		})
	}
	//TODO

	getTaskById(id: string): Observable<ITaskResponse> {
		return this._httpClient.get<ITaskResponse>(`${baseUrl}/tasks/${id}`)
	}

	createTask(formValues) {
		return this._httpClient.post(`${baseUrl}/tasks`, formValues)
	}

	updateTask(id, body): Observable<ITaskResponse> {
		return this._httpClient.patch<ITaskResponse>(`${baseUrl}/tasks`, {
			id,
			body
		})
	}

	getRandomTask(): Observable<ITaskResponse> {
		return this._httpClient.get<ITaskResponse>(`${baseUrl}/tasks/random`)
	}

	getMatchingTaskToInput(input: string): Observable<ITaskResponse> {
		return this._httpClient.get<ITaskResponse>(`${baseUrl}/tasks/match`, {
			params: { input }
		})
	}
}
