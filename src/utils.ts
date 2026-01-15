import type { Task, Metrics, Status } from './types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialTasks: Task[] = [
  {
    id: generateId(),
    title: 'New Campaign Email Series',
    description: 'Create medical content for Q1 email campaign',
    team: 'medical',
    status: 'draft',
    assignee: 'Dr. Smith',
    hoursWorked: 4,
    revisionCount: 0,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: generateId(),
    title: 'Product Infographic',
    description: 'Visual assets for new product launch',
    team: 'visual',
    status: 'visuals',
    assignee: 'Jane Doe',
    hoursWorked: 6,
    revisionCount: 1,
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-11'),
  },
  {
    id: generateId(),
    title: 'Social Media Content Pack',
    description: 'Weekly social media posts',
    team: 'medical',
    status: 'audit',
    assignee: 'Dr. Johnson',
    hoursWorked: 3,
    revisionCount: 0,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
  },
];

export const calculateMetrics = (tasks: Task[]): Metrics => {
  const medicalTasks = tasks.filter(t => t.team === 'medical');
  const visualTasks = tasks.filter(t => t.team === 'visual');
  const qaTasks = tasks.filter(t => t.team === 'qa');
  const approvedTasks = tasks.filter(t => t.status === 'approved');
  const auditTasks = tasks.filter(t => t.status === 'audit');

  const totalHours = tasks.reduce((sum, t) => sum + (t.hoursWorked || 0), 0);
  const totalRevisions = tasks.reduce((sum, t) => sum + (t.revisionCount || 0), 0);

  const avgTimeToApproval = approvedTasks.length > 0
    ? approvedTasks.reduce((sum, t) => {
        const days = Math.floor((t.updatedAt.getTime() - t.createdAt.getTime()) / (1000 * 60 * 60 * 24));
        return sum + days;
      }, 0) / approvedTasks.length
    : 0;

  const targetAchievement = tasks.length > 0
    ? (approvedTasks.length / tasks.length) * 100
    : 0;

  return {
    piecesCreated: medicalTasks.length,
    hoursWorked: totalHours,
    designsCompleted: visualTasks.length,
    auditCompletion: qaTasks.length,
    avgTimeToApproval: Math.round(avgTimeToApproval),
    contentStuck: auditTasks.length,
    revisionRounds: totalRevisions,
    targetAchievement: Math.round(targetAchievement),
  };
};

export const teamColors = {
  medical: 'bg-blue-100 border-blue-400',
  visual: 'bg-orange-100 border-orange-400',
  qa: 'bg-green-100 border-green-400',
};

export const statusLabels: Record<Status, string> = {
  draft: 'Draft',
  visuals: 'Visuals',
  audit: 'Audit',
  approved: 'Approved',
};