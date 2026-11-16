// Public files resolve against the deploy base (vite `base`).
export const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const profile = {
  first: 'Shashank',
  last: 'Gowda',
  role: 'DevOps engineer',
  line: 'I build and run cloud infrastructure.',
  availability: 'Open to DevOps and platform roles.',
  location: 'Bengaluru, India',
  email: 'shashanknakshatra@gmail.com',
  linkedin: 'https://linkedin.com/in/sgn2202',
  github: 'https://github.com/shashank2202',
  resume: asset('Shashank_Gowda_Resume.pdf'),
  portrait: asset('portrait.jpg'),
}

// Bold spans render at full strength, the rest muted (reference style).
export const approach = [
  ['I manage '],
  ['infrastructure as code', true],
  [' with OpenTofu and Terraform, using shared modules and per-client configs. I build '],
  ['CI/CD', true],
  [' on GitHub Actions and Azure DevOps, watch production with '],
  ['CloudWatch and PagerDuty', true],
  [', and '],
  ['automate the routine', true],
  [' — SSO logins, fleet health scans, module upgrades — so the team spends its time on what matters.'],
]

export const work = [
  {
    name: 'Xytech Platform',
    kind: 'Infrastructure / operations',
    stat: ['81', 'manual Route 53 alarms traced to misrouted SNS targets'],
    stack: ['AWS', 'OpenTofu', 'MSSQL / RDS', 'CloudWatch', 'PagerDuty', 'Transfer Family'],
    desc: 'A multi-tenant SaaS product on AWS across dev, staging and production. I run its infrastructure as code, built Data Access Services on MSSQL replicas, and traced 81 manual Route 53 alarms to misrouted SNS targets.',
    year: '2025 —',
    role: 'DevOps Engineer, Wipro DTS',
    colors: ['#1c0b06', '#ff5a1a', '#7a1508', '#ffc067'],
    screen: 'alarms',
  },
  {
    name: 'AWS on Terraform',
    kind: 'Infrastructure as code / CI',
    stat: ['0', 'long-lived IAM keys — the pipeline deploys through OIDC'],
    stack: ['Terraform', 'VPC', 'ALB + ASG', 'RDS PostgreSQL', 'GitHub Actions', 'Checkov'],
    desc: 'A production-style stack: multi-AZ VPC, ALB, Auto Scaling and RDS PostgreSQL from reusable modules, shipped by a GitHub Actions pipeline that plans on PR and applies on merge through OIDC.',
    year: '2026',
    role: 'Personal project',
    colors: ['#0b1a12', '#9be15d', '#1f6f4a', '#e8ffb0'],
    screen: 'pipeline',
  },
  {
    name: 'GitOps on Kubernetes',
    kind: 'Containers / delivery',
    stat: ['1', 'git revert to roll back a release'],
    stack: ['Docker', 'Kubernetes', 'Helm', 'ArgoCD', 'Amazon ECR'],
    desc: 'A containerised service built, scanned and pushed to ECR, then deployed with Helm and ArgoCD auto-sync and self-heal, so releases and rollbacks happen through Git.',
    year: '2026',
    role: 'Personal project',
    colors: ['#0a0f24', '#5b7cff', '#1b2a6b', '#b9c8ff'],
    screen: 'kube',
  },
  {
    name: 'DevOps Internship',
    kind: 'Monitoring / pipelines',
    stat: ['5 mo', 'on a production multi-tenant AWS platform'],
    stack: ['Terraform', 'EC2 / RDS', 'CloudWatch', 'GitHub Actions', 'Python'],
    desc: 'Peer-reviewed Terraform changes on a multi-tenant AWS platform, CloudWatch and RDS/EC2 monitoring, and fixing failing CI/CD builds with small Python checks.',
    year: '2025',
    role: 'DevOps Intern, Wipro DTS',
    colors: ['#1a0b1f', '#c86bff', '#4d1f6b', '#ffd1f5'],
    screen: 'build',
  },
]

export const process = [
  {
    step: 'Code',
    tools: ['OpenTofu', 'Terraform', 'Shared modules', 'S3 state + locking'],
    text: [
      ['Everything starts as '],
      ['code', true],
      [': OpenTofu or Terraform with shared modules, per-client configs, and remote state with locking. No click-ops, so any environment can be '],
      ['rebuilt from the repo', true],
      ['.'],
    ],
  },
  {
    step: 'Review',
    tools: ['tflint', 'Checkov', 'Plan on PR', 'Repo risk reviews'],
    text: [
      ['Every change opens a PR that runs fmt, validate, '],
      ['tflint and Checkov', true],
      [' and posts a '],
      ['plan', true],
      ['. I also review repos for risk — hardcoded secrets, long-lived IAM keys, production pinned to branches instead of version tags.'],
    ],
  },
  {
    step: 'Ship',
    tools: ['GitHub Actions', 'Azure DevOps', 'OIDC', 'ArgoCD'],
    text: [
      ['Merges apply through GitHub Actions or Azure DevOps using '],
      ['OIDC', true],
      [' instead of long-lived keys. For apps, '],
      ['ArgoCD', true],
      [' syncs from Git, so a rollback is just a revert.'],
    ],
  },
  {
    step: 'Watch',
    tools: ['CloudWatch', 'PagerDuty', 'SNS', 'RDS / EC2'],
    text: [
      ['Alarms live in code too. I triage '],
      ['CloudWatch and PagerDuty', true],
      [', track RDS memory and storage headroom, and '],
      ['root-cause', true],
      [' issues across RDS and EC2 before they become incidents.'],
    ],
  },
]
