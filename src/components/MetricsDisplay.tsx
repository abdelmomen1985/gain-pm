import type { Metrics } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { BarChart3, Clock, Target, Users, FileText, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react'

interface MetricsDisplayProps {
  metrics: Metrics
}

const metricCards = [
  {
    key: 'piecesCreated' as keyof Metrics,
    label: 'Pieces Created',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    key: 'hoursWorked' as keyof Metrics,
    label: 'Hours Worked',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    key: 'designsCompleted' as keyof Metrics,
    label: 'Designs Completed',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    key: 'auditCompletion' as keyof Metrics,
    label: 'Audit Completion',
    icon: BarChart3,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    key: 'avgTimeToApproval' as keyof Metrics,
    label: 'Avg Time to Approval',
    icon: Target,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    suffix: ' days',
  },
  {
    key: 'contentStuck' as keyof Metrics,
    label: 'Content Stuck',
    icon: AlertCircle,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    key: 'revisionRounds' as keyof Metrics,
    label: 'Revision Rounds',
    icon: RefreshCw,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    key: 'targetAchievement' as keyof Metrics,
    label: 'Target Achievement',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    suffix: '%',
  },
]

export default function MetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <Card className="mb-6 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-800">Workflow Metrics</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {metricCards.map((metric) => {
            const Icon = metric.icon
            const value = metrics[metric.key]
            return (
              <div
                key={metric.key}
                className={`${metric.bgColor} border border-gray-200 rounded-lg p-4 transition-all hover:shadow-md`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-4 h-4 ${metric.color}`} />
                  <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {metric.label}
                  </p>
                </div>
                <p className={`text-2xl font-bold ${metric.color}`}>
                  {value}{metric.suffix || ''}
                </p>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
