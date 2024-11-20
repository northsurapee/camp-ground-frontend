interface CampgroundRequest {
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
}

interface CampgroundResponse {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

interface BookingRequest {
  bookingDate: string;
  checkoutDate: string;
}

interface BookingResponse {
  _id: string;
  bookingDate: string;
  checkoutDate: string;
  user: string;
  campground: CampgroundResponse;
  createdAt: string;
  __v: number;
}

interface RegisterRequest {
  name: string;
  email: string;
  tel: string;
  password: string;
}
