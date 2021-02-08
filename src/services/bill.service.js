import http from "../http-common";

class BillDataService {
  getAll(data) {
    return http.post(`/bills`, data);
  }

  get(id) {
    return http.get(`/bill/${id}`);
  }

  insert(data) {
    return http.post(`/bills/insert`, data);
  }

  update(id, data) {
    return http.put(`/bills/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bills/${id}`);
  }

  deleteAll() {
    return http.delete(`/bill`);
  }

}

export default new BillDataService();
