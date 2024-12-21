```mermaid
sequenceDiagram
    participant Cliente
    participant Sistema
    participant Josmar
    
    Cliente->>Sistema: Mandar documentação
    Cliente->>Sistema: Solicitar serviços
    Sistema->>Josmar: Requisição
    Josmar->>Sistema: Aprova
    Sistema->>Cliente: Retorna a aprovação
    
