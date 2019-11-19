import request from '@/utils/request'

/**
 * result
 * @param studentId studentId
 */
export const result = (studentId) => {
  return request({
    url: '/gauge/record/result/' + studentId,
    method: 'get'
  })
}
