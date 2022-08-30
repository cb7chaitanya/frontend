export interface ErrorType<T> {
  error?: T;
  status: Response['status'];
  statusText: Response['statusText'];
}

export default function clientFetch<Response, Error>(path: string, init: RequestInit): Promise<Response | ErrorType<Error>> {
  return fetch(path, init).then(response => {
    if (!response.ok) {
      return response.json().then(
        (jsonError) => Promise.reject({
          error: jsonError as Error,
          status: response.status,
          statusText: response.statusText,
        }),
        () => Promise.reject({
          status: response.status,
          statusText: response.statusText,
        }),
      );

    } else {
      return response.json() as Promise<Response>;
    }
  });
}