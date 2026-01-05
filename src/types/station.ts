interface BikeStation {
  Id: string;
  AddressStr: string;
  Location: {
    lng: number;
    lat: number;
  };
  CreatedAt: string;
}

export default BikeStation;
