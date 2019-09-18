import request from '../utils/request';

export function query(): Promise<any> {
  return request('/api/users', {});
}
