interface Representative {
    name: string;
    image: string;
  }
  
  interface Country {
    name: string;
    code: string;
  }
  
  interface Customer {
    id: number;
    name: string;
    country: Country;
    company: string;
    date: string;
    status: string;
    verified: boolean;
    activity: number;
    representative: Representative;
    balance: number;
  }
  
  export class CustomerService {
    getCustomersMedium(): Promise<Customer[]> {
      return new Promise((resolve) => {
        const customers: Customer[] = [
          {
            id: 1,
            name: 'John Doe',
            country: { name: 'United States', code: 'US' },
            company: 'Acme Corp',
            date: '2023-01-01',
            status: 'qualified',
            verified: true,
            activity: 65,
            representative: { name: 'Amy Elsner', image: 'amyelsner.png' },
            balance: 3000
          }
          // Adicione mais clientes aqui...
        ];
  
        setTimeout(() => resolve(customers), 1000); // Simula um atraso na API
      });
    }
  }
  