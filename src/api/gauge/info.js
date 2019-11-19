import request from '@/utils/request'

/**
 * 量表测评
 * @param obj obj
 */
export const handle = (obj) => {
  return request({
    url: '/gauge/info/handle',
    method: 'post',
    data: obj
  })
}

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
