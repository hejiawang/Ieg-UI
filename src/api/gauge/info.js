import request from '@/utils/request'

/**
 * list
 */
export const list = () => {
  return request({
    url: '/gauge/info/list',
    method: 'get'
  })
}

/**
 * modify
 * @param obj obj
 */
export const modify = (obj) => {
  return request({
    url: '/gauge/info/modify',
    method: 'put',
    data: obj
  })
}
