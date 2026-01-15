export type Team = 'medical' | 'visual' | 'qa';
export type Status = 'draft' | 'visuals' | 'audit' | 'approved';

export interface Task {
  id: string;
  title: string;
  description: string;
  team: Team;
  status: Status;
  assignee?: string;
  hoursWorked?: number;
  revisionCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Metrics {
  piecesCreated: number;
  hoursWorked: number;
  designsCompleted: number;
  auditCompletion: number;
  avgTimeToApproval: number;
  contentStuck: number;
  revisionRounds: number;
  targetAchievement: number;
}