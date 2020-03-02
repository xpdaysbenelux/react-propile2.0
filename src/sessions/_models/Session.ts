export interface ISession {
  createdAt?: string;
  createdBy?: string;
  description: string;
  duration?: SessionDuration;
  expierenceLevel?: SessionExpierenceLevel;
  firstPresenter: {
    email: string;
  };
  goal?: string;
  id: string;
  intendedAudience?: {
    description: string;
    id: string;
    imageUrl: string;
    name: string;
  }[];
  laptopsRequired?: boolean;
  materialDescription?: string;
  materialUrl?: string;
  maxParticipants?: number;
  neededMaterials?: string;
  otherLimitations?: string;
  outline?: string;
  roomSetup?: string;
  secondPresenter?: {
    email: string;
  };
  sessionState?: SessionState;
  shortDescription?: string;
  subTitle?: string;
  title: string;
  topic?: SessionTopic;
  type?: SessionType;
  xpFactor?: number;
}

export interface ICreateSessionForm {
  description: string;
  emailFirstPresenter: string;
  emailSecondPresenter?: string;
  subTitle?: string;
  title: string;
  xpFactor?: number;
}

export interface IUpdateSessionForm {
  description: string;
  duration?: SessionDuration;
  emailFirstPresenter: string;
  emailSecondPresenter?: string;
  expierenceLevel?: SessionExpierenceLevel;
  goal?: string;
  intendedAudience?: {
    description: string;
    id: string;
    imageUrl: string;
    name: string;
  }[];
  laptopsRequired?: boolean;
  materialDescription?: string;
  materialUrl?: string;
  maxParticipants?: number;
  neededMaterials?: string;
  otherLimitations?: string;
  outline?: string;
  roomSetup?: string;
  sessionState?: SessionState;
  shortDescription?: string;
  subTitle?: string;
  title: string;
  topic?: SessionTopic;
  type?: SessionType;
  xpFactor?: number;
}

export enum SessionState {
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Draft = 'DRAFT',
}

export enum SessionType {
  Discovery = 'DISCOVERY',
  ExperientialLearning = 'EXPERIENTIAL_LEARNING',
  HandsOn = 'HANDS_ON',
  Other = 'OTHER',
  ShortExperience = 'SHORT_EXPRIENCE',
}

export enum SessionTopic {
  CasesAndIntros = 'CASES_AND_INTROS',
  CustomerAndPlanning = 'CUSTOMER_AND_PLANNING',
  ProcessAndImprovement = 'PROCESS_AND_IMPROVEMENT',
  TeamAndIndividual = 'TEAM_AND_INDIVIDUAL',
  TechnologyAndTechnique = 'TECHNOLOGY_AND_TECHNIQUE',
}

export enum SessionDuration {
  HalfHour = '30',
  OneAndHalfHour = '90',
  OneHour = '60',
  TwoAndHalfHour = '150',
}

export enum SessionExpierenceLevel {
  Expert = 'EXPERT',
  Medium = 'MEDIUM',
  Novice = 'NOVICE',
}
