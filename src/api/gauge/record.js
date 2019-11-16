import request from '@/utils/request'

/**
 * selectListByUserId
 */
export const list = (userId) => {
  return request({
    url: '/gauge/record/list',
    method: 'get',
    params: {
      userId: userId
    }
  })
}
