export interface Restaurant {
  id?: string;
  placeBranch: string;
  hotlineNumber: string;
  supportEmail: string;
  headQuarterAddress: string;
  discountFloat: number;
  discountAmount: number;
  description: string;

  createDate?: Date;
  updateDate?: Date;
}


export interface HomeStay {
  id?: string;
  placeBranch: string;
  hotlineNumber: string;
  supportEmail: string;
  headQuarterAddress: string;
  discountFloat: number;
  discountAmount: number;
  description: string;

  createDate?: Date;
  updateDate?: Date;
}

export interface Hotel {
  id?: string;
  placeBranch: string;
  hotlineNumber: string;
  supportEmail: string;
  headQuarterAddress: string;
  discountFloat: number;
  discountAmount: number;
  description: string;

  createDate?: Date;
  updateDate?: Date;
}

export interface PassengerCar {
  id?: string;
  branchName: string;
  hotlineNumber: string;
  supportEmail: string;
  headQuarterAddress: string;
  discountFloat: number;
  discountAmount: number;
  description: string;

  createDate?: Date;
  updateDate?: Date;
}

export interface AirPlane {
  id?: string;
  branchName: string;
  hotlineNumber: string;
  supportEmail: string;
  headQuarterAddress: string;
  discountFloat: number;
  discountAmount: number;
  description: string;

  createDate?: Date;
  updateDate?: Date;
}

export interface EatSchedule {
  id?: string;
  tourishPlanId: string;
  placeName: string;
  address: string;
  supportNumber: string;

  RestaurantId: string;

  discountFloat: number;
  discountAmount: number;
  description: string;

  startDate?: Date;
  endDate?: Date;

  createDate?: Date;
  updateDate?: Date;
}

export interface MovingSchedule {
  id?: string;
  tourishPlanId: string;
  driverName: string;
  vehiclePlate: string;
  phoneNumber: string;

  vehicleType: number;
  transportId: string;

  startingPlace: string;
  headingPlace: string;

  description: string;

  startDate?: Date;
  endDate?: Date;

  createDate?: Date;
  updateDate?: Date;
}

export interface StayingSchedule {
  id?: string;
  tourishPlanId: string;
  placeName: string;
  address: string;
  supportNumber: string;

  restHouseType: number;
  restHouseBranchId: string;

  description: string;

  startDate?: Date;
  endDate?: Date;

  createDate?: Date;
  updateDate?: Date;
}

export interface Author {
  id?: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  description: string;
  createDate: string;
  updateDate: string;
}


