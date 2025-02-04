
export function convertRoleToRoute (role: string) {
  switch (role) {
    case 'admin':
      return 'admin';
    case 'cliente':
      return 'client';
    case 'prestador':
      return 'supplier';
    default:
      return '';
  }
}