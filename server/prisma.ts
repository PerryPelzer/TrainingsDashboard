import { PrismaClient } from '@prisma/client';

// Erstellen einer Singleton-Instanz des PrismaClient
// Das Singleton-Pattern verhindert, dass bei Hot-Reloading im Entwicklungsmodus
// zu viele Verbindungen zur Datenbank geöffnet werden

// Deklarieren einer globalen Variable für PrismaClient in der globalen NodeJS-Namespace
declare global {
  var prisma: PrismaClient | undefined;
}

// Verwenden der globalen Variable, wenn sie existiert, oder Erstellen einer neuen Instanz
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// Speichern des Clients in der globalen Variable im Entwicklungsmodus
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;