import sasoApi from '../api/SasoApi';

const getEvent = status => {
  return sasoApi.getData(`/customer/event${status ? '?status=' + status : ''}`);
};

const eventService = {
  getEvent,
};
export default eventService;
