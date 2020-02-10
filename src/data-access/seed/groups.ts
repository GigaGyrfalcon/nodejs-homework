export const GROUPS = [
  { name: 'Employee', permissions: ['READ', 'SHARE'] },
  { name: 'Manager', permissions: ['READ', 'WRITE', 'SHARE', 'UPLOAD_FILE'] },
  {
    name: 'Administator',
    permissions: [
      'READ',
      'WRITE',
      'SHARE',
      'UPLOAD_FILE',
      'DELETE',
      'UPLOAD_FILE'
    ]
  }
];
