import request from "../utils/request"
import { BASE_URL } from "../config"

// 出库单列表
export function getDeliveryOrder(data) {
  return request.get(`deliveryOrder/`, data)
}

// 出库单详细
export function getDeliveryOrderDetail(id, data) {
  return request.get(`deliveryOrder/${id}`, data)
}


// 出库单发货确认
export function delivery(id, remark) {
  return request.post(`deliveryOrder/${id}/delivery?remark=` + remark)
}

