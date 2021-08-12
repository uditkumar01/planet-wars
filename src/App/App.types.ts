export interface PlanetDetails {
  imageURL: string;
  planetName: string;
  properties: Array<
    {
      name: string;
      value: string;
      unit: string;
    }
  >;
}

export interface AccountState {
  accountAddress: string;
  balance: number;
}

export interface AccountAddressAction {
  type: 'SET_ACCOUNT_ADDRESS';
  payload: {
    accountAddress: string;
  };
}

export interface BalanceAction {
  type: 'SET_BALANCE';
  payload: {
    balance: number;
  };
}

export type ActionParam = AccountAddressAction | BalanceAction;