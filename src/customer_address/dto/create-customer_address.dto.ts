export class CreateCustomerAddressDto {
  customer_id: number;
  region_id: number;
  district_id: number;
  name: string;
  street: string;
  house: string;
  flat: number;
  location: string;
  post_index: string;
  info: string;
}
