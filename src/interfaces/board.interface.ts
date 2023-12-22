export interface IBoardLocation {
  id?: string;
  _id?: string;
  country: string;
  city: string;
  address: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  description?: string;
  name: string;
  googlePlaceId?: string;
}

export enum BoardStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  MAINTENANCE = 'maintenance',
}

export interface IBoard {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  height: number;
  width: number;
  doubleSided: boolean;
  location: IBoardLocation;
  status: BoardStatus;
}
