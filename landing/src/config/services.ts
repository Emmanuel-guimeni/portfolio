/**
 * Services. `formValue` MUST match one of the options in the contact form
 * (see leads.ts SERVICE_OPTIONS) so that "Request this service" pre-selects
 * the right choice and the lead lands in the database correctly tagged.
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  formValue: string;
  icon: string;
}

export const SERVICES: Service[] = [
  {
    id: 'digital-marketing-audit',
    title: 'Digital Marketing Audit',
    description:
      'A full read of your digital presence and performance: channels, funnel, content, tracking and where the leaks are.',
    deliverables: ['Channel audit', 'Funnel analysis', 'Tracking review', 'Priority actions'],
    formValue: 'Digital Marketing Audit',
    icon: 'audit',
  },
  {
    id: 'ai-marketing-audit',
    title: 'AI Marketing Audit',
    description:
      'Where AI genuinely creates value in your marketing — and, just as important, where it would only add noise.',
    deliverables: ['Use-case mapping', 'Effort/impact matrix', 'Tooling shortlist', 'Roadmap'],
    formValue: 'AI Marketing Audit',
    icon: 'ai',
  },
  {
    id: 'marketing-automation-audit',
    title: 'Marketing Automation Audit',
    description:
      'Every repetitive process in your marketing, mapped, timed and ranked by how much automating it would return.',
    deliverables: ['Process inventory', 'Time-cost model', 'Automation backlog', 'Quick wins'],
    formValue: 'Marketing Automation Audit',
    icon: 'automation',
  },
  {
    id: 'ai-automation-consulting',
    title: 'AI Automation Consulting',
    description:
      'Design of the actual system: agents, workflows, data flows, approval gates and the humans who own each decision.',
    deliverables: ['System architecture', 'Workflow specs', 'Prompt library', 'Governance rules'],
    formValue: 'AI Automation Consulting',
    icon: 'system',
  },
  {
    id: 'crm-lead-automation',
    title: 'CRM & Lead Automation',
    description:
      'The prospect journey, structured and automated end to end: capture, scoring, segmentation, nurturing, handover.',
    deliverables: ['CRM structure', 'Lead scoring model', 'Nurturing sequences', 'Sales alerts'],
    formValue: 'CRM Consulting',
    icon: 'crm',
  },
  {
    id: 'digital-marketing-strategy',
    title: 'Digital Marketing Strategy',
    description:
      'Positioning, audiences, channel mix, content plan and budget — a strategy your team can run without a translator.',
    deliverables: ['Positioning', 'Channel plan', 'Content strategy', 'Budget model'],
    formValue: 'Digital Marketing Strategy',
    icon: 'strategy',
  },
  {
    id: 'data-analytics',
    title: 'Data & Marketing Analytics',
    description:
      'A measurement plan that survives contact with reality: KPIs, clean tracking, dashboards and a reporting rhythm.',
    deliverables: ['KPI framework', 'Tracking plan', 'Dashboards', 'Monthly reporting'],
    formValue: 'Data & Analytics',
    icon: 'analytics',
  },
  {
    id: 'ai-marketing-transformation',
    title: 'AI Marketing Transformation',
    description:
      'Progressive integration of AI into how your marketing actually works — with the team, not around it.',
    deliverables: ['Maturity assessment', 'Phased roadmap', 'Team enablement', 'Change management'],
    formValue: 'AI Automation Consulting',
    icon: 'transform',
  },
];

/** How I work — the engagement sequence shown under the services. */
export const PROCESS = [
  {
    step: '01',
    title: 'Discovery',
    body: 'A structured conversation about your business, your funnel and what is actually slowing it down.',
  },
  {
    step: '02',
    title: 'Audit',
    body: 'I map the current stack, the processes, the data and the gaps — no recommendation without evidence.',
  },
  {
    step: '03',
    title: 'System design',
    body: 'Architecture: which agent does what, which workflow runs when, and where a human must stay in the loop.',
  },
  {
    step: '04',
    title: 'Build & connect',
    body: 'Automations, CRM, forms, sequences and tracking are implemented and connected to each other.',
  },
  {
    step: '05',
    title: 'Measure & optimise',
    body: 'Dashboards go live, the system produces data, and the data drives the next iteration.',
  },
];
