import request from '@/utils/request'

/**
 * 获取量表详细信息
 * @param gaugeId 量表id
 */
export const topic = (gaugeId) => {
  return request({
    url: '/gauge/topic/topic/' + gaugeId,
    method: 'get'
  })
}
