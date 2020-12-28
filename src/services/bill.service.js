import http from "../http-common";

class BillDataService {
  getAll() {
    return http.get("/");
  }

  get(id) {
    return http.get(`/bill/${id}`);
  }

  create(data) {
    return http.post("/bill", data);
  }

  update(id, data) {
    return http.put(`/bill/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bill/${id}`);
  }

  deleteAll() {
    return http.delete(`/bill`);
  }

}

export default new BillDataService();
