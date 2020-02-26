export interface ISession {
  createdAt?: string;
  createdBy?: string;
  description: string;
  emailFirstPresenter: string;
  emailSecondPresenter?: string;
  id: string;
  subTitle?: string;
  title: string;
  xpFactor?: number;
}

export interface ISessionForm {
  description: string;
  emailFirstPresenter: string;
  emailSecondPresenter?: string;
  subTitle?: string;
  title: string;
  xpFactor?: number;
}
